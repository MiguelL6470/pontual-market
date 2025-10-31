import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// Cache de 10 minutos para lista de categorias
export const revalidate = 600

export async function GET() {
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  })
  return NextResponse.json({ categories })
}

