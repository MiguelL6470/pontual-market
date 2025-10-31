import { getServerAuth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { ProductCard } from '@/components/ProductCard'
import { Heart, Trash2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { RemoveFavoriteButton } from './RemoveFavoriteButton'

export default async function FavoritesPage() {
  const session = await getServerAuth()
  
  if (!session?.user) {
    redirect('/api/auth/signin')
  }

  const favorites = await prisma.favorite.findMany({
    where: { userId: session.user.id },
    include: {
      product: {
        include: {
          images: { orderBy: { position: 'asc' }, take: 1 },
          category: true,
          merchant: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

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
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-red-600 fill-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Meus Favoritos</h1>
              <p className="text-gray-600 mt-1">
                {favorites.length === 0
                  ? 'Nenhum produto favoritado ainda'
                  : `${favorites.length} produto${favorites.length !== 1 ? 's' : ''} favoritado${favorites.length !== 1 ? 's' : ''}`
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {favorites.length === 0 ? (
        <div className="text-center py-20 bg-white border border-gray-200 rounded-xl">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-red-300" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Nenhum favorito ainda
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Comece a explorar nossos produtos e salve seus favoritos para comprar depois!
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Explorar Produtos
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="relative group">
              <ProductCard product={favorite.product} />
              <div className="absolute top-2 right-2">
                <RemoveFavoriteButton productId={favorite.productId} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

