import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Providers } from '@/components/Providers'

export const metadata: Metadata = {
  title: 'Pontual Market - Encontre os melhores produtos',
  description: 'Sua plataforma completa de compras online',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen antialiased bg-white text-neutral-900 flex flex-col">
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}


