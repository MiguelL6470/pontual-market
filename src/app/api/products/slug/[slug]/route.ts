import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      images: { orderBy: { position: 'asc' } },
      merchant: { select: { id: true, storeName: true, logoUrl: true } },
      category: { select: { id: true, name: true, slug: true } },
    },
  })
  if (!product) return NextResponse.json({ error: 'not_found' }, { status: 404 })
  return NextResponse.json({ product })
}


