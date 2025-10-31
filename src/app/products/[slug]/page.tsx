import { Heart, Store, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { FavoriteButton } from './FavoriteButton'
import { AddToCartButton } from './AddToCartButton'
import { getBaseUrl } from '@/lib/api'

async function getProduct(slug: string) {
  const baseUrl = await getBaseUrl()
  const res = await fetch(`${baseUrl}/api/products/slug/${slug}`, { cache: 'no-store' })
  if (!res.ok) return null
  const data = await res.json()
  return data.product
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug)
  
  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Produto não encontrado</h1>
        <p className="text-gray-600 mb-8">O produto que você está procurando não existe.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao início
        </Link>
      </div>
    )
  }
  
  const price = (product.priceCents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  const mainImage = product.images?.[0]?.url
  const otherImages = product.images?.slice(1) || []

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar</span>
      </Link>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Images */}
        <div className="space-y-4">
          {mainImage && (
            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={mainImage}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {otherImages.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {otherImages.slice(0, 4).map((img: any) => (
                <div key={img.id} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.alt ?? product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Category */}
          {product.category && (
            <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
              {product.category.name}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
            {product.title}
          </h1>

          {/* Price */}
          <div className="text-4xl font-bold text-blue-600">
            {price}
          </div>

          {/* Description */}
          <div className="prose max-w-none">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Descrição</h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Merchant */}
          {product.merchant && (
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Store className="w-5 h-5 text-gray-600" />
              <div>
                <div className="text-sm text-gray-600">Vendido por</div>
                <div className="font-semibold text-gray-900">{product.merchant.storeName}</div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3 pt-6 border-t">
            <AddToCartButton
              productId={product.id}
              slug={product.slug}
              title={product.title}
              priceCents={product.priceCents}
              image={product.images?.[0]?.url}
            />
            <FavoriteButton productId={product.id} />
          </div>
        </div>
      </div>
    </div>
  )
}


