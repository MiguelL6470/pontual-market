import Link from 'next/link'
import Image from 'next/image'
import { ProductCard } from '@/components/ProductCard'
import { ShoppingBag, Star, Zap, Flame, Percent, Trophy } from 'lucide-react'
import { getBaseUrl } from '@/lib/api'

async function fetchLatest() {
  const baseUrl = await getBaseUrl()
  const res = await fetch(`${baseUrl}/api/products?page=1&pageSize=12`, {
    cache: 'no-store',
  })
  if (!res.ok) return { items: [], total: 0 }
  return res.json()
}

async function fetchCategories() {
  const baseUrl = await getBaseUrl()
  const res = await fetch(`${baseUrl}/api/categories`, { next: { revalidate: 600 } })
  if (!res.ok) return { categories: [] }
  return res.json()
}

async function fetchByCategory(slug: string, take: number = 8) {
  const baseUrl = await getBaseUrl()
  const res = await fetch(`${baseUrl}/api/products?category=${encodeURIComponent(slug)}&page=1&pageSize=${take}`, {
    cache: 'no-store',
  })
  if (!res.ok) return { items: [] }
  return res.json()
}

export default async function HomePage() {
  const [latest, cats] = await Promise.all([fetchLatest(), fetchCategories()])
  // Seções adicionais: mais vendidos (mock com últimos), ofertas do dia (mock com primeiros), por categoria
  const topSellers = latest.items.slice(0, 8)
  const dealsOfDay = latest.items.slice(4, 12)
  const catSlugs: string[] = (cats.categories || []).map((c: any) => c.slug as string)
  const takePerCat = 6
  const firstTwoCats: string[] = catSlugs.slice(0, 2)
  const [catA, catB] = await Promise.all(
    firstTwoCats.map((slug: string) => fetchByCategory(slug, takePerCat))
  )
  const { items } = latest
  const { categories } = cats

  return (
    <div>
      {/* Hero Banner - responsivo */}
      <section className="relative bg-white">
        <div className="relative w-full overflow-hidden">
          <Image
            src="/banner.jpg"
            alt="Frete grátis para todo o Brasil"
            width={1024}
            height={297}
            className="w-full h-auto block object-cover"
            priority
            sizes="100vw"
          />
        </div>
      </section>

      {/* Quick Categories */}
      {categories.length > 0 && (
        <section className="py-6 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {categories.slice(0, 8).map((category: any) => (
                <Link
                  key={category.id}
                  href={`/search?category=${category.slug}`}
                  className="flex-shrink-0 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all whitespace-nowrap"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Produtos em Destaque</h2>
            <Link href="/search" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Ver todos →
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {items.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <ShoppingBag className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">Nenhum produto encontrado</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Em breve você encontrará aqui os melhores produtos com os melhores preços.
                </p>
              </div>
            ) : (
              items.slice(0, 5).map((p: any) => (
                <ProductCard key={p.id} product={p} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Mais vendidos (rankeado por popularidade futura — por enquanto últimos criados) */}
      {topSellers.length > 0 && (
        <section className="py-10 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                <Trophy className="w-5 h-5 text-amber-500" /> Mais vendidos
              </h2>
              <Link href="/search" className="text-blue-600 hover:text-blue-700 text-sm font-medium">Ver todos →</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {topSellers.slice(0, 5).map((p: any) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ofertas do dia (seleção editorial temporária) */}
      {dealsOfDay.length > 0 && (
        <section className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
                <Percent className="w-5 h-5 text-rose-500" /> Ofertas do dia
              </h2>
              <Link href="/search" className="text-blue-600 hover:text-blue-700 text-sm font-medium">Ver todas →</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {dealsOfDay.slice(0, 5).map((p: any) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categorias em destaque (primeiras duas categorias com carrosséis simples em grid) */}
      {(catA?.items?.length || catB?.items?.length) && (
        <section className="py-10 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 space-y-10">
            {catA?.items?.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <Flame className="w-5 h-5 text-orange-500" /> {cats.categories[0].name}
                  </h3>
                  <Link href={`/search?category=${cats.categories[0].slug}`} className="text-blue-600 hover:text-blue-700 text-sm font-medium">Ver categoria →</Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {catA.items.slice(0, 5).map((p: any) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}
            {catB?.items?.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                    <Flame className="w-5 h-5 text-orange-500" /> {cats.categories[1].name}
                  </h3>
                  <Link href={`/search?category=${cats.categories[1].slug}`} className="text-blue-600 hover:text-blue-700 text-sm font-medium">Ver categoria →</Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {catB.items.slice(0, 5).map((p: any) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Benefits Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Frete Grátis</h3>
              <p className="text-sm text-gray-600">
                Em compras a partir de R$ 19 em milhares de produtos selecionados
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Compra Garantida</h3>
              <p className="text-sm text-gray-600">
                Proteção total nas suas compras com garantia de qualidade e suporte
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Ofertas Imperdíveis</h3>
              <p className="text-sm text-gray-600">
                Descontos exclusivos e promoções especiais todos os dias
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
