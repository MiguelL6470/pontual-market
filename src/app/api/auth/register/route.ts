import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { RegisterSchema } from '@/lib/validators'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = RegisterSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: parsed.error.format() },
        { status: 400 }
      )
    }

    const { name, email, password } = parsed.data

    // Verificar se o email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Este email já está cadastrado' },
        { status: 400 }
      )
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10)

    // Criar usuário (conta única)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        role: 'CONSUMER',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })

    // Criar Account (credenciais) separadamente
    // @ts-expect-error prisma client pode estar desatualizado até executar prisma generate
    await (prisma as any).account.create({
      data: {
        userId: user.id,
        type: 'credentials',
        provider: 'credentials',
        providerAccountId: hashedPassword,
      },
    })

    return NextResponse.json(
      { message: 'Usuário criado com sucesso', user },
      { status: 201 }
    )
  } catch (error) {
    console.error('Erro ao criar usuário:', error)
    return NextResponse.json(
      { error: 'Erro ao criar usuário' },
      { status: 500 }
    )
  }
}

