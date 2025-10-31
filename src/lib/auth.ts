import NextAuth, { NextAuthOptions, getServerSession } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from './db'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // Opcional: GitHub OAuth; pode ser removido se não usar
    ...(process.env.GITHUB_ID && process.env.GITHUB_SECRET
      ? [GithubProvider({
          clientId: process.env.GITHUB_ID,
          clientSecret: process.env.GITHUB_SECRET,
        })]
      : []),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub && session.user) {
        session.user.id = token.sub
      }
      return session
    },
  },
}

// v4 compat: NextAuth(authOptions) retorna um handler para GET/POST
export const authHandlers = NextAuth(authOptions)

// Helper para obter a sessão no servidor (App Router)
export async function getServerAuth() {
  return getServerSession(authOptions)
}


