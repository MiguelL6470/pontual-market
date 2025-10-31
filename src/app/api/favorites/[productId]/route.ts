import { NextResponse } from 'next/server'
import { getServerAuth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function DELETE(_req: Request, { params }: { params: { productId: string } }) {
  const session = await getServerAuth()
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  await prisma.favorite.deleteMany({ where: { userId: session.user.id, productId: params.productId } })
  return NextResponse.json({ ok: true })
}


