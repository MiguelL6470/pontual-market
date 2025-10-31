import { getServerAuth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Package, Clock, CheckCircle, XCircle, ArrowLeft } from 'lucide-react'

export default async function DashboardOrdersPage() {
  const session = await getServerAuth()
  
  if (!session?.user) {
    redirect('/api/auth/signin')
  }

  const merchant = await prisma.merchant.findUnique({
    where: { userId: session.user.id },
  })

  if (!merchant) {
    redirect('/dashboard/onboarding')
  }

  // Por enquanto, não temos modelo de Order no banco
  // Esta página serve como placeholder para quando o sistema de pedidos for implementado

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
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
              <h1 className="text-3xl font-bold text-gray-900">Pedidos da Loja</h1>
              <p className="text-gray-600 mt-1">
                Gerencie os pedidos recebidos para seus produtos
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Empty State */}
      <div className="text-center py-20 bg-white border border-gray-200 rounded-xl">
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Package className="w-12 h-12 text-blue-300" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Sistema de Pedidos em Desenvolvimento
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          O sistema completo de gerenciamento de pedidos será implementado em breve.
          Quando seus clientes fizerem pedidos, eles aparecerão aqui para que você possa
          acompanhar, processar e enviar.
        </p>
        
        {/* Stats Cards - Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium text-gray-600">Pendentes</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">0</div>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-600">Em Processamento</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">0</div>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-600">Enviados</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">0</div>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-600">Entregues</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">0</div>
          </div>
        </div>

        <Link
          href="/dashboard/products"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Gerenciar Produtos
        </Link>
      </div>
    </div>
  )
}

