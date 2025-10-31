'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export function LayoutChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuth = pathname === '/login' || pathname === '/register'

  if (isAuth) {
    return (
      <>
        <main className="flex-1">{children}</main>
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  )
}


