'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Search, ShoppingCart, Heart, Menu } from 'lucide-react'
import { HeaderAuth } from './HeaderAuth'
import { CategoryDropdown } from './CategoryDropdown'
import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const router = useRouter()
  const { user } = useUser()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery) params.set('q', searchQuery)
    if (selectedCategory) params.set('category', selectedCategory)
    router.push(`/search?${params.toString()}`)
  }

  return (
    <header className="bg-header-dark text-white">
      {/* Top Header Bar - Logo, Search, Login, Cart */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 h-full">
            <Image
              src="/logo.png"
              alt="Pontual Market"
              width={320}
              height={106}
              sizes="(min-width: 1024px) 300px, 240px"
              className="object-contain h-full w-auto"
              priority
            />
          </Link>

          {/* Search bar with category dropdown */}
          <form 
            className="flex-1 max-w-3xl hidden md:flex" 
            onSubmit={handleSearch}
          >
            <div className="flex w-full h-11">
              <CategoryDropdown
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
              <input
                name="q"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar produtos, marcas e muito mais..."
                className="flex-1 h-full px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-banner/60"
              />
              <button
                type="submit"
                className="h-full px-3 bg-white/10 hover:bg-white/20 rounded-r-md transition-colors flex items-center justify-center border-l border-white/10"
              >
                <Search className="w-6 h-6 text-white" />
              </button>
            </div>
          </form>

          {/* Right side actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Mobile search button */}
            <Link
              href="/search"
              className="md:hidden p-2 hover:bg-opacity-20 hover:bg-white rounded-lg transition-colors"
              aria-label="Buscar"
            >
              <Search className="w-6 h-6" />
            </Link>
            
            <Link
              href="/favorites"
              className="hidden lg:flex items-center gap-1 px-3 py-2 hover:bg-opacity-20 hover:bg-white rounded-lg transition-colors"
            >
              <Heart className="w-5 h-5" />
              <span className="text-sm">Favoritos</span>
            </Link>
            
            <Link
              href="/cart"
              className="flex items-center gap-1 px-3 py-2 hover:bg-opacity-20 hover:bg-white rounded-lg transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden lg:inline text-sm">Carrinho</span>
            </Link>
            {/* Devoluções e Pedidos */}
            <Link
              href={user ? '/orders' : '/login?from=orders'}
              className="hidden md:flex flex-col items-start px-3 py-2 hover:bg-opacity-20 hover:bg-white rounded-lg transition-colors"
            >
              <span className="text-xs text-gray-300">Devoluções</span>
              <span className="text-sm font-semibold whitespace-nowrap">e Pedidos</span>
            </Link>
            
            <HeaderAuth />
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="bg-header-700 border-t border-header-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-6 h-11 overflow-x-auto">
            <button className="flex items-center gap-2 px-3 py-2 hover:bg-opacity-20 hover:bg-white rounded-md transition-colors flex-shrink-0">
              <Menu className="w-4 h-4" />
              <span className="text-sm whitespace-nowrap">Todos</span>
            </button>
            <Link 
              href="/deals" 
              className="px-3 py-2 hover:bg-opacity-20 hover:bg-white rounded-md transition-colors text-sm whitespace-nowrap"
            >
              Ofertas do Dia
            </Link>
            <Link 
              href="/search" 
              className="px-3 py-2 hover:bg-opacity-20 hover:bg-white rounded-md transition-colors text-sm whitespace-nowrap"
            >
              Mais Vendidos
            </Link>
            <Link 
              href="/dashboard" 
              className="px-3 py-2 hover:bg-opacity-20 hover:bg-white rounded-md transition-colors text-sm whitespace-nowrap hidden sm:inline"
            >
              Vender no Pontual Market
            </Link>
            <Link 
              href="#" 
              className="px-3 py-2 hover:bg-opacity-20 hover:bg-white rounded-md transition-colors text-sm whitespace-nowrap"
            >
              Central de Ajuda
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
