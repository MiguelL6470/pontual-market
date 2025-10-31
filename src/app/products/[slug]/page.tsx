import { Heart, Store, ArrowLeft, ShieldCheck, Truck, RotateCcw, Star } from 'lucide-react'
import Link from 'next/link'
import { FavoriteButton } from './FavoriteButton'
import { AddToCartButton } from './AddToCartButton'
import { BuyNowButton } from './BuyNowButton'
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

  const baseUrl = await getBaseUrl()
  const productUrl = `${baseUrl}/products/${product.slug}`
  
  // Schema markup para SEO
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.images?.map(img => img.url) || [],
    brand: product.merchant?.storeName ? {
      '@type': 'Brand',
      name: product.merchant.storeName
    } : undefined,
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'BRL',
      price: (product.priceCents / 100).toFixed(2),
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: product.merchant?.storeName || 'Pontual Market'
      }
    },
    category: product.category?.name
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:underline">Início</Link>
        {product.category && (
          <>
            <span className="mx-2">/</span>
            <Link href={`/categories/${product.category.slug}`} className="hover:underline">
              {product.category.name}
            </Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span className="text-gray-700">{product.title}</span>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
        {/* Images */}
        <div className="lg:col-span-7">
          <div className="grid grid-cols-5 gap-3">
            <div className="col-span-1 flex flex-col gap-3 max-h-[560px] overflow-y-auto">
              {[mainImage, ...otherImages.map((i:any)=>i.url)].filter(Boolean).slice(0,6).map((url:any, idx:number)=>(
                <div key={String(url)+idx} className="aspect-square bg-gray-50 rounded-md overflow-hidden border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url as string} alt={product.title} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="col-span-4">
              {mainImage && (
                <div className="aspect-square bg-white rounded-xl overflow-hidden border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={mainImage} alt={product.title} className="w-full h-full object-contain" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Title + details */}
        <div className="lg:col-span-3 space-y-4">
          {product.category && (
            <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
              {product.category.name}
            </div>
          )}
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{product.title}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Star className="w-4 h-4 text-amber-500" />
            <span>Avaliações em breve</span>
          </div>
          <div className="prose max-w-none">
            <h2 className="text-base font-semibold text-gray-900 mb-2">Descrição</h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">{product.description}</p>
          </div>
          {product.merchant && (
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border">
              <Store className="w-5 h-5 text-gray-600" />
              <div>
                <div className="text-xs text-gray-600">Vendido por</div>
                <div className="font-semibold text-gray-900">{product.merchant.storeName}</div>
              </div>
            </div>
          )}
        </div>

        {/* Sticky Buy Box */
        }
        <aside className="lg:col-span-2">
          <div className="lg:sticky lg:top-20 border rounded-xl p-5 bg-white flex flex-col gap-3">
            <div>
              <div className="text-3xl font-bold text-blue-600">{price}</div>
              <div className="text-sm text-gray-600">12x sem juros • Receba entre 2 e 5 dias</div>
            </div>

            {/* Favoritos acima dos botões de compra */}
            <FavoriteButton productId={product.id} />

            {/* Comprar agora e adicionar ao carrinho */}
            <BuyNowButton
              productId={product.id}
              slug={product.slug}
              title={product.title}
              priceCents={product.priceCents}
              image={product.images?.[0]?.url}
            />
            <AddToCartButton
              productId={product.id}
              slug={product.slug}
              title={product.title}
              priceCents={product.priceCents}
              image={product.images?.[0]?.url}
            />
            <div className="flex items-center gap-2 text-sm text-gray-700 pt-2 border-t">
              <Truck className="w-4 h-4 text-blue-600" />
              <span>Entrega rápida disponível</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <RotateCcw className="w-4 h-4 text-blue-600" />
              <span>Devolução em até 7 dias</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Compra protegida Pontual</span>
            </div>
          </div>
        </aside>
      </div>

      {/* Related products */}
      {product.category?.slug && (
        <RelatedByCategory slug={product.category.slug} currentId={product.id} />
      )}
    </div>
    </>
  )
}


async function fetchRelated(categorySlug: string) {
  const baseUrl = await getBaseUrl()
  const res = await fetch(`${baseUrl}/api/products?category=${encodeURIComponent(categorySlug)}&page=1&pageSize=8`, { cache: 'no-store' })
  if (!res.ok) return { items: [] }
  return res.json()
}

async function RelatedByCategory({ slug, currentId }: { slug: string, currentId: string }) {
  const { items } = await fetchRelated(slug)
  const others = (items || []).filter((p: any) => p.id !== currentId).slice(0, 6)
  if (others.length === 0) return null
  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Produtos relacionados</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {others.map((p: any) => (
          <Link key={p.id} href={`/products/${p.slug}`} className="block group">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-50 border mb-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.images?.[0]?.url || '/placeholder.png'} alt={p.title} className="w-full h-full object-cover group-hover:opacity-90" />
            </div>
            <div className="text-sm text-gray-900 line-clamp-2">{p.title}</div>
          </Link>
        ))}
      </div>
    </section>
  )
}


