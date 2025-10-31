import Link from 'next/link'
import Image from 'next/image'
import { Search, ShoppingCart, Heart, Menu } from 'lucide-react'
import { HeaderAuth } from './HeaderAuth'

export function Header() {
  return (
    <header className="bg-blue-600 text-white">
      {/* Top bar */}
      <div className="bg-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-xs">
            <div className="flex items-center gap-4">
              <Link href="#" className="hover:underline">Frete grátis em compras acima de R$ 19</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="hover:underline hidden sm:inline">
                Vender no Pontual Market
              </Link>
              <Link href="#" className="hover:underline hidden sm:inline">
                Central de Ajuda
              </Link>
              <Link href="#" className="hover:underline">
                Seja Premium
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-20 lg:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 h-full">
          <Image
              src="/logo2.png"
              alt="Pontual Market"
              width={240}
              height={80}
              sizes="(min-width: 1024px) 220px, 180px"
              className="object-contain h-full w-auto"
              priority
            />
          </Link>

          {/* Search bar - larga e centralizada */}
          <form className="flex-1 max-w-3xl hidden md:block" action="/search" method="GET">
            <div className="flex">
              <input
                name="q"
                type="text"
                placeholder="Buscar produtos, marcas e muito mais..."
                className="flex-1 px-4 py-2 text-gray-900 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-r-lg transition-colors"
              >
                <Search className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Mobile search button */}
            <Link
              href="/search"
              className="md:hidden p-2 hover:bg-blue-700 rounded-lg transition-colors"
              aria-label="Buscar"
            >
              <Search className="w-6 h-6" />
            </Link>
            
            <Link
              href="/favorites"
              className="flex items-center gap-1 px-3 py-2 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <Heart className="w-5 h-5" />
              <span className="hidden lg:inline text-sm">Favoritos</span>
            </Link>
            
            <Link
              href="/cart"
              className="flex items-center gap-1 px-3 py-2 hover:bg-blue-700 rounded-lg transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden lg:inline text-sm">Carrinho</span>
            </Link>
            
            <HeaderAuth />
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="bg-blue-700 border-t border-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-6 h-12 overflow-x-auto">
            <button className="flex items-center gap-2 px-3 py-2 hover:bg-blue-700 rounded-md transition-colors flex-shrink-0">
              <Menu className="w-4 h-4" />
              <span className="text-sm">Categorias</span>
            </button>
            <Link href="/deals" className="px-3 py-2 hover:bg-blue-700 rounded-md transition-colors text-sm whitespace-nowrap">
              Ofertas do Dia
            </Link>
            <Link href="/search" className="px-3 py-2 hover:bg-blue-700 rounded-md transition-colors text-sm whitespace-nowrap">
              Mais Vendidos
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
