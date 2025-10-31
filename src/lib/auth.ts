import NextAuth, { NextAuthOptions, getServerSession } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './db'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { accounts: true },
        })

        if (!user) {
          return null
        }

        // Buscar conta de credenciais (provider = 'credentials')
        const account = user.accounts.find((acc) => acc.provider === 'credentials')
        if (!account || !account.providerAccountId) {
          // Se não tem conta de credenciais, a senha está armazenada no providerAccountId
          return null
        }

        // providerAccountId armazena o hash da senha
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          account.providerAccountId
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      },
    }),
    // Opcional: GitHub OAuth; pode ser removido se não usar
    ...(process.env.GITHUB_ID && process.env.GITHUB_SECRET
      ? [GithubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET,
        })]
      : []),
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    signOut: '/',
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
      }
      return token
    },
  },
}

// v4 compat: NextAuth(authOptions) retorna um handler para GET/POST
export const authHandlers = NextAuth(authOptions)

// Helper para obter a sessão no servidor (App Router)
export async function getServerAuth() {
  return getServerSession(authOptions)
}


