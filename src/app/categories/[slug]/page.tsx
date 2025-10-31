import Link from 'next/link'
import { ProductCard } from '@/components/ProductCard'
import { getBaseUrl } from '@/lib/api'
import { prisma } from '@/lib/db'
import { Package, ArrowLeft } from 'lucide-react'

async function getCategory(slug: string) {
  return await prisma.category.findUnique({
    where: { slug },
  })
}

async function fetchCategoryProducts(categorySlug: string) {
  const baseUrl = await getBaseUrl()
  const res = await fetch(`${baseUrl}/api/products?category=${categorySlug}&page=1&pageSize=24`, {
    cache: 'no-store',
  })
  if (!res.ok) return { items: [], total: 0 }
  return res.json()
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await getCategory(params.slug)
  const { items, total } = await fetchCategoryProducts(params.slug)

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Categoria não encontrada</h1>
          <p className="text-gray-600 mb-8">A categoria que você está procurando não existe.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao início
          </Link>
        </div>
      </div>
    )
  }

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
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
              <p className="text-gray-600 mt-1">
                {total === 0
                  ? 'Nenhum produto nesta categoria'
                  : `${total} produto${total !== 1 ? 's' : ''} encontrado${total !== 1 ? 's' : ''}`
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {items.length === 0 ? (
        <div className="text-center py-20 bg-white border border-gray-200 rounded-xl">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-blue-300" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Nenhum produto encontrado
          </h2>
          <p className="text-gray-600 mb-8">
            Não há produtos disponíveis nesta categoria no momento.
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Explorar Outras Categorias
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

