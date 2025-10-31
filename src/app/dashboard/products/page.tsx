import { getServerAuth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Plus, Edit, Trash2, Package, ArrowLeft } from 'lucide-react'
import { ProductStatusBadge } from './ProductStatusBadge'
import { DeleteProductButton } from './DeleteProductButton'

export default async function ProductsPage() {
  const session = await getServerAuth()
  
  if (!session?.user) {
    redirect('/api/auth/signin')
  }

  // Verificar se é merchant
  const merchant = await prisma.merchant.findUnique({
    where: { userId: session.user.id },
  })

  if (!merchant) {
    redirect('/dashboard/onboarding')
  }

  const products = await prisma.product.findMany({
    where: { merchantId: merchant.id },
    include: {
      images: { orderBy: { position: 'asc' }, take: 1 },
      category: true,
      _count: {
        select: { favorites: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
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
                <h1 className="text-3xl font-bold text-gray-900">Meus Produtos</h1>
                <p className="text-gray-600 mt-1">
                  {products.length === 0
                    ? 'Nenhum produto cadastrado'
                    : `${products.length} produto${products.length !== 1 ? 's' : ''} cadastrado${products.length !== 1 ? 's' : ''}`
                  }
                </p>
              </div>
            </div>
          </div>
          <Link
            href="/dashboard/products/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Novo Produto
          </Link>
        </div>
      </div>

      {/* Products List */}
      {products.length === 0 ? (
        <div className="text-center py-20 bg-white border border-gray-200 rounded-xl">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-blue-300" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Nenhum produto cadastrado
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Comece a vender adicionando seus primeiros produtos ao marketplace!
          </p>
          <Link
            href="/dashboard/products/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus className="w-5 h-5" />
            Adicionar Primeiro Produto
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preço
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estoque
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Favoritos
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          {product.images[0] ? (
                            <img
                              src={product.images[0].url}
                              alt={product.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-gray-400">📦</span>
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <Link
                            href={`/products/${product.slug}`}
                            className="font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
                          >
                            {product.title}
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">
                        {product.category.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-gray-900">
                        {(product.priceCents / 100).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${
                        product.stock > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ProductStatusBadge status={product.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">
                        {product._count.favorites} ❤️
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/dashboard/products/${product.id}/edit`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          aria-label="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <DeleteProductButton productId={product.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

