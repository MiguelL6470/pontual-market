'use client'

import Link from 'next/link'
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs'

export function HeaderAuth() {
  const { user } = useUser()

  return (
    <>
      <SignedIn>
        <Link
          href="/account"
          className="flex flex-col items-start px-3 py-2 hover:bg-opacity-20 hover:bg-white rounded-lg transition-colors"
        >
          <span className="text-xs text-gray-300">Olá, {user?.firstName || 'Usuário'}</span>
          <span className="text-sm font-semibold whitespace-nowrap">Conta</span>
        </Link>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <Link
          href="/login"
          className="flex items-center gap-1 px-3 py-2 hover:bg-opacity-20 hover:bg-white rounded-lg transition-colors"
        >
          <span className="text-sm font-semibold whitespace-nowrap">Entrar</span>
        </Link>
      </SignedOut>
    </>
  )
}

