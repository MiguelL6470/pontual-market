'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useUser, SignedIn, SignedOut } from '@clerk/nextjs'
import { Package, Clock, CheckCircle, XCircle, ArrowLeft } from 'lucide-react'

type OrderItem = {
  productId: string
  slug: string
  title: string
  priceCents: number
  image?: string
  quantity: number
}

type Order = {
  id: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  createdAt: string
  address?: {
    fullName: string
    street: string
    number: string
    complement: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
}

function getStatusInfo(status: Order['status']) {
  switch (status) {
    case 'pending':
      return { text: 'Pendente', icon: Clock, color: 'text-yellow-600 bg-yellow-50' }
    case 'processing':
      return { text: 'Em Processamento', icon: Package, color: 'text-blue-600 bg-blue-50' }
    case 'shipped':
      return { text: 'Enviado', icon: Package, color: 'text-purple-600 bg-purple-50' }
    case 'delivered':
      return { text: 'Entregue', icon: CheckCircle, color: 'text-green-600 bg-green-50' }
    case 'cancelled':
      return { text: 'Cancelado', icon: XCircle, color: 'text-red-600 bg-red-50' }
    default:
      return { text: 'Desconhecido', icon: Clock, color: 'text-gray-600 bg-gray-50' }
  }
}

export default function OrdersPage() {
  const { user, isLoaded } = useUser()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoaded) return
    
    if (!user) {
      setLoading(false)
      return
    }

    // Carregar pedidos do localStorage
    const stored = localStorage.getItem(`orders_${user.id}`) || localStorage.getItem('orders')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setOrders(parsed.sort((a: Order, b: Order) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ))
      } catch (e) {
        console.error('Erro ao carregar pedidos:', e)
      }
    }
    setLoading(false)
  }, [user, isLoaded])

  if (loading || !isLoaded) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-64" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 rounded" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <SignedOut>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Acesso necessário</h1>
            <p className="text-gray-600 mb-8">Faça login para ver seus pedidos.</p>
            <Link
              href="/login?from=orders"
              className="inline-flex items-center gap-2 px-6 py-3 bg-header-dark text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Fazer Login
            </Link>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
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
              <h1 className="text-3xl font-bold text-gray-900">Meus Pedidos</h1>
              <p className="text-gray-600 mt-1">
                {orders.length === 0
                  ? 'Nenhum pedido ainda'
                  : `${orders.length} pedido${orders.length !== 1 ? 's' : ''} encontrado${orders.length !== 1 ? 's' : ''}`
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white border border-gray-200 rounded-xl">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-blue-300" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Nenhum pedido encontrado
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Quando você fizer um pedido, ele aparecerá aqui.
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Explorar Produtos
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const statusInfo = getStatusInfo(order.status)
            const StatusIcon = statusInfo.icon
            
            return (
              <div
                key={order.id}
                className="bg-white border border-gray-200 rounded-xl p-6"
              >
                {/* Order Header */}
                <div className="flex items-center justify-between mb-6 pb-6 border-b">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">
                        Pedido #{order.id.slice(0, 8).toUpperCase()}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color} flex items-center gap-1`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusInfo.text}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Pedido realizado em{' '}
                      {new Date(order.createdAt).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">
                      {(order.total / 100).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </div>
                    <div className="text-sm text-gray-600">
                      {order.items.reduce((sum, item) => sum + item.quantity, 0)} item{order.items.length !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {order.items.map((item) => (
                    <div key={item.productId} className="flex gap-4">
                      <Link href={`/products/${item.slug}`} className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-gray-400 text-xl">📦</span>
                            </div>
                          )}
                        </div>
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link href={`/products/${item.slug}`}>
                          <h4 className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
                            {item.title}
                          </h4>
                        </Link>
                        <div className="text-sm text-gray-600 mt-1">
                          Quantidade: {item.quantity} ×{' '}
                          {(item.priceCents / 100).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">
                          {((item.priceCents * item.quantity) / 100).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="pt-6 border-t">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Subtotal</span>
                    <span className="text-sm text-gray-900">
                      {(order.subtotal / 100).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Frete</span>
                    <span className="text-sm text-gray-900">
                      {order.shipping === 0 ? (
                        <span className="text-green-600 font-medium">Grátis</span>
                      ) : (
                        (order.shipping / 100).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })
                      )}
                    </span>
                  </div>
                  {order.address && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="text-sm text-gray-600 mb-1">Endereço de Entrega</div>
                      <div className="text-sm text-gray-900">
                        {order.address.fullName}
                        <br />
                        {order.address.street}, {order.address.number}
                        {order.address.complement && ` - ${order.address.complement}`}
                        <br />
                        {order.address.neighborhood}, {order.address.city} - {order.address.state}
                        <br />
                        CEP: {order.address.zipCode}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
        </div>
      </SignedIn>
    </>
  )
}

