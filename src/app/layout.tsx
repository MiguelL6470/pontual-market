import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/Providers'
import { LayoutChrome } from '@/components/LayoutChrome'

export const metadata: Metadata = {
  title: 'Pontual Market - Marketplace de Volta Redonda | Compre Online',
  description: 'O maior marketplace de Volta Redonda. Encontre produtos eletrônicos, roupas, casa e muito mais com frete grátis e garantia. Compre de vendedores locais com segurança!',
  keywords: 'marketplace Volta Redonda, comprar online Volta Redonda, frete grátis, eletrônicos, roupas, casa, decoração, vendedores locais, e-commerce Volta Redonda',
  openGraph: {
    title: 'Pontual Market - Marketplace de Volta Redonda',
    description: 'Compre online com segurança em Volta Redonda. Milhares de produtos com frete grátis e entrega rápida.',
    type: 'website',
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pontual Market - Marketplace de Volta Redonda',
    description: 'Compre online com segurança em Volta Redonda.',
  },
  alternates: {
    canonical: 'https://pontualmarket.com.br',
  },
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


