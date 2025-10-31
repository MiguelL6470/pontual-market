'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { User } from 'lucide-react'

export function HeaderAuth() {
  const { data: session } = useSession()

  if (session?.user) {
    return (
      <Link
        href="/account"
        className="flex items-center gap-1 px-3 py-2 hover:bg-blue-700 rounded-lg transition-colors"
      >
        <User className="w-5 h-5" />
        <span className="hidden lg:inline text-sm">Minha Conta</span>
      </Link>
    )
  }

  return (
    <Link
      href="/api/auth/signin"
      className="flex items-center gap-1 px-3 py-2 hover:bg-blue-700 rounded-lg transition-colors"
    >
      <span className="text-sm">Entrar</span>
    </Link>
  )
}

