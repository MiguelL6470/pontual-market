export default async function DealsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Ofertas do Dia</h1>
      <p className="text-gray-600">Em breve você verá aqui as melhores ofertas do Pontual Market.</p>
    </div>
  )
}

import Link from 'next/link'
import { ProductCard } from '@/components/ProductCard'
import { getBaseUrl } from '@/lib/api'
import { TrendingDown, ArrowLeft } from 'lucide-react'

async function fetchDeals() {
  const baseUrl = await getBaseUrl()
  const res = await fetch(`${baseUrl}/api/products?page=1&pageSize=20`, {
    cache: 'no-store',
  })
  if (!res.ok) return { items: [] }
  const data = await res.json()
  // Em uma versão real, isso filtraria produtos em promoção
  // Por enquanto, apenas retorna os produtos mais recentes
  return data
}

export default async function DealsPage() {
  const { items } = await fetchDeals()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Link
            href="/"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Ofertas do Dia</h1>
              <p className="text-gray-600 mt-1">
                Os melhores preços em produtos selecionados
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl p-8 mb-8">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Aproveite as Ofertas!</h2>
          <p className="text-lg text-orange-100 mb-6">
            Descubra produtos incríveis com preços especiais. Ofertas por tempo limitado!
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-orange-600 rounded-lg hover:bg-orange-50 transition-colors font-medium"
          >
            Ver Todos os Produtos
          </Link>
        </div>
      </div>

      {/* Products Grid */}
      {items.length === 0 ? (
        <div className="text-center py-20 bg-white border border-gray-200 rounded-xl">
          <div className="text-6xl mb-4">🎁</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Nenhuma oferta disponível no momento
          </h2>
          <p className="text-gray-600 mb-8">
            Volte em breve para novas ofertas especiais!
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Explorar Produtos
          </Link>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-gray-600">
              Encontramos <strong>{items.length}</strong> produto{items.length !== 1 ? 's' : ''} em oferta
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {items.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

