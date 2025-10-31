import { NextResponse } from 'next/server'
import { getServerAuth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const patchSchema = z.object({
  title: z.string().min(2).max(120).optional(),
  description: z.string().min(1).max(2000).optional(),
  priceCents: z.number().int().min(0).optional(),
  stock: z.number().int().min(0).optional(),
  status: z.enum(['DRAFT', 'ACTIVE', 'ARCHIVED']).optional(),
})

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerAuth()
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const merchant = await prisma.merchant.findUnique({ where: { userId: session.user.id } })
  if (!merchant) return NextResponse.json({ error: 'merchant_required' }, { status: 403 })

  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: {
      images: { orderBy: { position: 'asc' } },
      category: true,
    },
  })

  if (!product || product.merchantId !== merchant.id) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }

  return NextResponse.json({ product })
}

export async function PATCH(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerAuth()
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const body = await _req.json().catch(() => null)
  const parsed = patchSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'invalid_body' }, { status: 400 })

  const merchant = await prisma.merchant.findUnique({ where: { userId: session.user.id } })
  if (!merchant) return NextResponse.json({ error: 'merchant_required' }, { status: 403 })

  const product = await prisma.product.findUnique({ where: { id: params.id } })
  if (!product || product.merchantId !== merchant.id) return NextResponse.json({ error: 'not_found' }, { status: 404 })

  const updated = await prisma.product.update({ where: { id: params.id }, data: parsed.data })
  return NextResponse.json({ product: updated })
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const session = await getServerAuth()
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const merchant = await prisma.merchant.findUnique({ where: { userId: session.user.id } })
  if (!merchant) return NextResponse.json({ error: 'merchant_required' }, { status: 403 })

  const product = await prisma.product.findUnique({ where: { id: params.id } })
  if (!product || product.merchantId !== merchant.id) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }

  await prisma.product.delete({ where: { id: params.id } })
  return NextResponse.json({ ok: true })
}


