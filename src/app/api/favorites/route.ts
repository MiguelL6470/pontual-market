import { NextResponse } from 'next/server'
import { getServerAuth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const bodySchema = z.object({ productId: z.string().cuid() })

export async function GET() {
  const session = await getServerAuth()
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  
  const favorites = await prisma.favorite.findMany({
    where: { userId: session.user.id },
    include: {
      product: {
        include: {
          images: { orderBy: { position: 'asc' }, take: 1 },
          category: true,
          merchant: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })
  
  return NextResponse.json({ favorites })
}

export async function POST(req: Request) {
  const session = await getServerAuth()
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const json = await req.json().catch(() => null)
  const parsed = bodySchema.safeParse(json)
  if (!parsed.success) return NextResponse.json({ error: 'invalid_body' }, { status: 400 })
  const { productId } = parsed.data
  const favorite = await prisma.favorite.upsert({
    where: { userId_productId: { userId: session.user.id, productId } },
    create: { userId: session.user.id, productId },
    update: {},
  })
  return NextResponse.json({ favorite })
}

