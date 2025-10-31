import { getServerAuth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { User, ShoppingBag, Heart, Package, Settings, ArrowLeft } from 'lucide-react'
import { prisma } from '@/lib/db'

export default async function AccountPage() {
  const session = await getServerAuth()
  
  if (!session?.user) {
    redirect('/api/auth/signin')
  }

  const merchant = await prisma.merchant.findUnique({
    where: { userId: session.user.id },
  })

  const favoritesCount = await prisma.favorite.count({
    where: { userId: session.user.id },
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
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Minha Conta</h1>
              <p className="text-gray-600 mt-1">
                Olá, {session.user.name || session.user.email}!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Profile Info */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Informações do Perfil</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome
                </label>
                <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                  {session.user.name || 'Não informado'}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg">
                  {session.user.email}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Ações Rápidas</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/orders"
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Meus Pedidos</div>
                  <div className="text-sm text-gray-600">Ver histórico de compras</div>
                </div>
              </Link>

              <Link
                href="/favorites"
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Favoritos</div>
                  <div className="text-sm text-gray-600">
                    {favoritesCount} produto{favoritesCount !== 1 ? 's' : ''} favoritado{favoritesCount !== 1 ? 's' : ''}
                  </div>
                </div>
              </Link>

              {merchant ? (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <ShoppingBag className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Dashboard</div>
                    <div className="text-sm text-gray-600">Gerenciar minha loja</div>
                  </div>
                </Link>
              ) : (
                <Link
                  href="/dashboard/onboarding"
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <ShoppingBag className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Vender no Marketplace</div>
                    <div className="text-sm text-gray-600">Configure sua loja</div>
                  </div>
                </Link>
              )}

              <Link
                href="/api/auth/signout"
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                  <Settings className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Sair</div>
                  <div className="text-sm text-gray-600">Fazer logout da conta</div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-20">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Estatísticas</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Favoritos</span>
                <span className="font-semibold text-gray-900">{favoritesCount}</span>
              </div>
              {merchant && (
                <>
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600">Loja</span>
                      <span className="font-semibold text-blue-600">{merchant.storeName}</span>
                    </div>
                    <Link
                      href="/dashboard"
                      className="block text-center text-sm text-blue-600 hover:text-blue-700 mt-2"
                    >
                      Gerenciar →
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

