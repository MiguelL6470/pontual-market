import { getServerAuth } from '@/lib/auth'
import { Plus, Package, TrendingUp, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await getServerAuth()
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          {session?.user ? `Olá, ${session.user.name ?? 'Lojista'}!` : 'Bem-vindo ao seu painel'}
        </p>
      </div>

      {session?.user ? (
        <div className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Produtos Ativos</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Vendas Totais</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Receita Total</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">R$ 0</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/dashboard/products/new"
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Plus className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Adicionar Produto</div>
                  <div className="text-sm text-gray-600">Crie e publique um novo produto</div>
                </div>
              </Link>
              
              <Link
                href="/dashboard/onboarding"
                className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
              >
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <ShoppingBag className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Configurar Loja</div>
                  <div className="text-sm text-gray-600">Atualize informações da sua loja</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Recent Products */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Produtos Recentes</h2>
              <Link
                href="/dashboard/products/new"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Ver todos
              </Link>
            </div>
            <div className="text-center py-12 text-gray-600">
              <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>Você ainda não tem produtos cadastrados</p>
              <Link
                href="/dashboard/products/new"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mt-4"
              >
                <Plus className="w-4 h-4" />
                Adicionar Primeiro Produto
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acesso Restrito</h2>
          <p className="text-gray-600 mb-8">Faça login para acessar o dashboard.</p>
          <Link
            href="/api/auth/signin"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Entrar
          </Link>
        </div>
      )}
    </div>
  )
}
