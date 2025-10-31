import { NextResponse } from 'next/server'
import { getServerAuth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { MerchantSchema } from '@/lib/validators'

export async function POST(req: Request) {
  const session = await getServerAuth()
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const body = await req.json().catch(() => null)
  const parsed = MerchantSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_body', details: parsed.error.format() }, { status: 400 })
  }

  const data = parsed.data

  try {
    const merchant = await prisma.merchant.upsert({
      where: { userId: session.user.id },
      create: { userId: session.user.id, ...data },
      update: { ...data },
    })
    return NextResponse.json({ merchant })
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  }
}

export async function GET() {
  const session = await getServerAuth()
  if (!session?.user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const merchant = await prisma.merchant.findUnique({ where: { userId: session.user.id } })
  if (!merchant) return NextResponse.json({ error: 'not_found' }, { status: 404 })
  return NextResponse.json({ merchant })
}


