"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

type CartItem = {
  productId: string
  slug: string
  title: string
  priceCents: number
  image?: string
  quantity: number
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Carregar carrinho do localStorage
    const stored = localStorage.getItem('cart')
    if (stored) {
      try {
        setCartItems(JSON.parse(stored))
      } catch (e) {
        console.error('Erro ao carregar carrinho:', e)
      }
    }
    setLoading(false)
  }, [])

  const saveCart = (items: CartItem[]) => {
    localStorage.setItem('cart', JSON.stringify(items))
    setCartItems(items)
  }

  const updateQuantity = (productId: string, delta: number) => {
    const updated = cartItems.map((item) =>
      item.productId === productId
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    )
    saveCart(updated)
  }

  const removeItem = (productId: string) => {
    const updated = cartItems.filter((item) => item.productId !== productId)
    saveCart(updated)
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.priceCents * item.quantity,
    0
  )
  const shipping = subtotal >= 1900 ? 0 : 500 // Frete grátis acima de R$ 19
  const total = subtotal + shipping

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-64" />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded" />
              ))}
            </div>
            <div className="h-64 bg-gray-200 rounded" />
          </div>
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
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Carrinho de Compras</h1>
              <p className="text-gray-600 mt-1">
                {cartItems.length === 0
                  ? 'Seu carrinho está vazio'
                  : `${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} no carrinho`
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-white border border-gray-200 rounded-xl">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-12 h-12 text-blue-300" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Seu carrinho está vazio
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Adicione produtos ao seu carrinho para começar a comprar!
          </p>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Explorar Produtos
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4"
              >
                {/* Image */}
                <Link href={`/products/${item.slug}`} className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400 text-2xl">📦</span>
                      </div>
                    )}
                  </div>
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${item.slug}`}>
                    <h3 className="font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                      {item.title}
                    </h3>
                  </Link>
                  <div className="text-lg font-bold text-blue-600 mb-4">
                    {(item.priceCents / 100).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.productId, -1)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        aria-label="Diminuir quantidade"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-1 min-w-[3rem] text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, 1)}
                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.productId)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remover
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-1">Subtotal</div>
                  <div className="text-xl font-bold text-gray-900">
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
          <div className="md:col-span-1">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-20">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Resumo do Pedido</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>
                    {(subtotal / 100).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Frete</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600 font-medium">Grátis</span>
                    ) : (
                      (shipping / 100).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })
                    )}
                  </span>
                </div>

                {subtotal < 1900 && (
                  <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                    💡 Adicione mais{' '}
                    {((1900 - subtotal) / 100).toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL',
                    })}{' '}
                    e ganhe frete grátis!
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {(total / 100).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => router.push('/checkout')}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg"
              >
                Finalizar Compra
                <ArrowRight className="w-5 h-5" />
              </button>

              <Link
                href="/search"
                className="block text-center text-sm text-gray-600 hover:text-gray-900 mt-4"
              >
                Continuar comprando
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

