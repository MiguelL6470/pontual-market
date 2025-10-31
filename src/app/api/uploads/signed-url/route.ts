import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getServerAuth } from '@/lib/auth'
import { supabaseServer } from '@/lib/supabaseServer'
import { rateLimit } from '@/lib/rateLimit'

const bodySchema = z.object({
  bucket: z.literal('products'),
  key: z.string().min(3).max(200), // ex: merchantId/productId/uuid.jpg
  expiresIn: z.number().min(60).max(60 * 60), // 1min a 1h
})

export async function POST(req: Request) {
  const ip = (req.headers.get('x-forwarded-for') ?? 'local').split(',')[0]
  if (!rateLimit(`uploads:${ip}`, 10, 60_000)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
  }
  const session = await getServerAuth()
  if (!session?.user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const json = await req.json().catch(() => null)
  const parsed = bodySchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_body', details: parsed.error.format() }, { status: 400 })
  }

  const { bucket, key, expiresIn } = parsed.data
  const { data, error } = await supabaseServer.storage
    .from(bucket)
    .createSignedUploadUrl(key, { upsert: false })

  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? 'cannot_create_url' }, { status: 500 })
  }

  return NextResponse.json({
    url: data.signedUrl,
    token: data.token, // pode ser usado em upload direto
    path: key,
  })
}


