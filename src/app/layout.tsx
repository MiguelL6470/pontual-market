import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/Providers'
import { LayoutChrome } from '@/components/LayoutChrome'

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
          <LayoutChrome>{children}</LayoutChrome>
        </Providers>
      </body>
    </html>
  )
}


