import { NextResponse } from 'next/server'
import { getServerAuth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { ProductSchema, SearchQuerySchema } from '@/lib/validators'
import { z } from 'zod'

// Cache curto por URL (com query string) para aliviar cold starts do DB
export const revalidate = 15

// Listagem e busca
export async function GET(req: Request) {
  const url = new URL(req.url)
  const query = Object.fromEntries(url.searchParams.entries())
  const parsed = SearchQuerySchema.safeParse(query)
  if (!parsed.success) return NextResponse.json({ error: 'invalid_query' }, { status: 400 })
  const { q, category, minPrice, maxPrice, page, pageSize } = parsed.data

  // Filtro base
  const where: any = {
    status: 'ACTIVE',
    ...(category ? { category: { slug: category } } : {}),
    ...(minPrice !== undefined || maxPrice !== undefined
      ? { priceCents: { gte: minPrice ?? 0, lte: maxPrice ?? 2_147_483_647 } }
      : {}),
  }

  // Sem q: paginação normal
  if (!q) {
    const [items, total] = await Promise.all([
      prisma.product.findMany({
        where,
        select: { id: true, title: true, slug: true, priceCents: true, images: { orderBy: { position: 'asc' }, take: 1 } },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      prisma.product.count({ where }),
    ])
    return NextResponse.json({ items, total, page, pageSize })
  }

  // Com q: usar busca com text search simples (sem FTS por enquanto)
  // Busca baseada em título e descrição
  where.OR = [
    { title: { contains: q, mode: 'insensitive' as const } },
    { description: { contains: q, mode: 'insensitive' as const } },
  ]
  
  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      select: { id: true, title: true, slug: true, priceCents: true, images: { orderBy: { position: 'asc' }, take: 1 } },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.product.count({ where }),
  ])
  return NextResponse.json({ items, total, page, pageSize })
}

// Criação de produto
export async function POST(req: Request) {
  const session = await getServerAuth()
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const body = await req.json().catch(() => null)
  const parsed = ProductSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'invalid_body', details: parsed.error.format() }, { status: 400 })

  const merchant = await prisma.merchant.findUnique({ where: { userId: session.user.id } })
  if (!merchant) return NextResponse.json({ error: 'merchant_required' }, { status: 403 })

  const data = parsed.data
  const slugBase = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  const slug = `${slugBase}-${Math.random().toString(36).slice(2, 7)}`

  const product = await prisma.product.create({
    data: {
      merchantId: merchant.id,
      title: data.title,
      slug,
      description: data.description,
      priceCents: data.priceCents,
      stock: data.stock,
      status: 'ACTIVE',
      categoryId: data.categoryId,
      images: { create: data.images.map((i) => ({ url: i.url, alt: i.alt ?? null, position: i.position ?? 0 })) },
    },
    include: { images: true },
  })
  return NextResponse.json({ product })
}


