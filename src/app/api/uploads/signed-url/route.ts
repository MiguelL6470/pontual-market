import { z } from 'zod'
import { getServerAuth } from '@/lib/auth'
import { getSupabaseServer, getSupabasePublicUrl } from '@/lib/supabaseServer'
import { rateLimit } from '@/lib/rateLimit'
import { successResponse, errorResponse, unauthorizedResponse, serverErrorResponse } from '@/lib/api-response'
import { NextResponse } from 'next/server'

const bodySchema = z.object({
  bucket: z.literal('products'),
  key: z.string().min(3).max(200), // ex: merchantId/productId/uuid.jpg
  expiresIn: z.number().min(60).max(60 * 60), // 1min a 1h
})

export async function POST(req: Request) {
  const ip = (req.headers.get('x-forwarded-for') ?? 'local').split(',')[0]
  if (!rateLimit(`uploads:${ip}`, 10, 60_000)) {
    return errorResponse('rate_limited', 429)
  }
  const session = await getServerAuth()
  if (!session?.user) {
    return unauthorizedResponse()
  }

  const json = await req.json().catch(() => null)
  const parsed = bodySchema.safeParse(json)
  if (!parsed.success) {
    return errorResponse('invalid_body', 400, parsed.error.format())
  }

  const { bucket, key, expiresIn } = parsed.data
  const supabaseServer = getSupabaseServer()
  const { data, error } = await supabaseServer.storage
    .from(bucket)
    .createSignedUploadUrl(key, { upsert: false })

  if (error || !data) {
    return serverErrorResponse(error?.message ?? 'cannot_create_url')
  }

  const supabaseUrl = getSupabasePublicUrl()
  const publicUrl = `${supabaseUrl}/storage/v1/object/public/products/${key}`

  return successResponse({
    url: data.signedUrl,
    token: data.token, // pode ser usado em upload direto
    path: key,
    publicUrl, // URL pública da imagem após o upload
  })
}


