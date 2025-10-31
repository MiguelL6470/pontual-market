'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { ArrowLeft, MapPin, CreditCard, CheckCircle } from 'lucide-react'

type CartItem = {
  productId: string
  slug: string
  title: string
  priceCents: number
  image?: string
  quantity: number
}

type ShippingAddress = {
  fullName: string
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
}

export default function CheckoutPage() {
  const { user } = useUser()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [step, setStep] = useState<'address' | 'payment' | 'success'>('address')
  const router = useRouter()

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
  })

  const [paymentMethod, setPaymentMethod] = useState<'credit' | 'debit' | 'pix'>('credit')
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCVV, setCardCVV] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('cart')
    if (stored) {
      try {
        setCartItems(JSON.parse(stored))
      } catch (e) {
        console.error('Erro ao carregar carrinho:', e)
      }
    }
    setLoading(false)

    // Carregar endereço salvo se existir
    const savedAddress = localStorage.getItem('shippingAddress')
    if (savedAddress) {
      try {
        setAddress(JSON.parse(savedAddress))
      } catch (e) {
        // Ignorar erro
      }
    }
  }, [])

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.priceCents * item.quantity,
    0
  )
  const shipping = subtotal >= 1900 ? 0 : 500
  const total = subtotal + shipping

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('shippingAddress', JSON.stringify(address))
    setStep('payment')
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // Simular processamento de pagamento
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Criar pedido
    const orderId = `ord_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const order = {
      id: orderId,
      items: cartItems,
      subtotal,
      shipping,
      total,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
      address,
    }

    // Salvar pedido no localStorage (com ID do usuário se disponível)
    const storageKey = user?.id ? `orders_${user.id}` : 'orders'
    const existingOrders = localStorage.getItem(storageKey)
    const orders = existingOrders ? JSON.parse(existingOrders) : []
    orders.push(order)
    localStorage.setItem(storageKey, JSON.stringify(orders))
    
    // Manter compatibilidade com pedidos antigos sem ID
    if (!user?.id) {
      const oldOrders = localStorage.getItem('orders')
      const oldOrdersArray = oldOrders ? JSON.parse(oldOrders) : []
      oldOrdersArray.push(order)
      localStorage.setItem('orders', JSON.stringify(oldOrdersArray))
    }

    // Limpar carrinho
    localStorage.removeItem('cart')
    
    setStep('success')

    // Redirecionar após alguns segundos
    setTimeout(() => {
      router.push('/orders')
    }, 5000)
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-64" />
          <div className="h-96 bg-gray-200 rounded" />
        </div>
      </div>
    )
  }

  if (cartItems.length === 0 && step !== 'success') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Carrinho vazio</h1>
          <p className="text-gray-600 mb-8">Adicione produtos ao carrinho antes de finalizar a compra.</p>
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Carrinho
          </Link>
        </div>
      </div>
    )
  }

  if (step === 'success') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Pedido Confirmado!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Seu pedido foi recebido e está sendo processado.
            <br />
            Você receberá um email de confirmação em breve.
          </p>
          <div className="space-y-4">
            <Link
              href="/orders"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Ver Meus Pedidos
            </Link>
            <br />
            <Link
              href="/"
              className="inline-block text-sm text-gray-600 hover:text-gray-900"
            >
              Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Carrinho
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Finalizar Compra</h1>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className={`flex items-center gap-2 ${step === 'address' ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 'address' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}>
              1
            </div>
            <span className="font-medium">Endereço</span>
          </div>
          <div className="flex-1 h-0.5 bg-gray-200 mx-4" />
          <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-blue-600' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 'payment' ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}>
              2
            </div>
            <span className="font-medium">Pagamento</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2">
          {step === 'address' ? (
            <form onSubmit={handleAddressSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Endereço de Entrega</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rua *
                  </label>
                  <input
                    type="text"
                    required
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Número *
                  </label>
                  <input
                    type="text"
                    required
                    value={address.number}
                    onChange={(e) => setAddress({ ...address, number: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Complemento
                </label>
                <input
                  type="text"
                  value={address.complement}
                  onChange={(e) => setAddress({ ...address, complement: e.target.value })}
                  placeholder="Apartamento, bloco, etc."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bairro *
                </label>
                <input
                  type="text"
                  required
                  value={address.neighborhood}
                  onChange={(e) => setAddress({ ...address, neighborhood: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cidade *
                  </label>
                  <input
                    type="text"
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={2}
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value.toUpperCase() })}
                    placeholder="SP"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CEP *
                </label>
                <input
                  type="text"
                  required
                  maxLength={9}
                  value={address.zipCode}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '')
                    const formatted = value.replace(/(\d{5})(\d{3})/, '$1-$2')
                    setAddress({ ...address, zipCode: formatted })
                  }}
                  placeholder="00000-000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Continuar para Pagamento
              </button>
            </form>
          ) : (
            <form onSubmit={handlePaymentSubmit} className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Pagamento</h2>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Método de Pagamento *
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {(['credit', 'debit', 'pix'] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`p-4 border-2 rounded-lg transition-colors ${
                        paymentMethod === method
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium text-gray-900 capitalize">
                        {method === 'credit' ? 'Crédito' : method === 'debit' ? 'Débito' : 'PIX'}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {paymentMethod !== 'pix' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número do Cartão *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '')
                        const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ')
                        setCardNumber(formatted)
                      }}
                      placeholder="0000 0000 0000 0000"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome no Cartão *
                    </label>
                    <input
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                      placeholder="NOME COMO NO CARTÃO"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Validade *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '')
                          const formatted = value.replace(/(\d{2})(\d{2})/, '$1/$2')
                          setCardExpiry(formatted)
                        }}
                        placeholder="MM/AA"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={4}
                        value={cardCVV}
                        onChange={(e) => setCardCVV(e.target.value.replace(/\D/g, ''))}
                        placeholder="000"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </>
              )}

              {paymentMethod === 'pix' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-4">📱</div>
                  <p className="text-gray-700">
                    Após confirmar o pedido, você receberá o código PIX para pagamento.
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep('address')}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Processando...' : 'Confirmar Pedido'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-20">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Resumo do Pedido</h2>

            <div className="space-y-3 mb-4">
              {cartItems.map((item) => (
                <div key={item.productId} className="flex gap-3">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400">📦</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-gray-900 line-clamp-2">
                      {item.title}
                    </div>
                    <div className="text-sm text-gray-600">
                      Qtd: {item.quantity} ×{' '}
                      {(item.priceCents / 100).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>
                  {(subtotal / 100).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
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
              <div className="flex justify-between text-lg font-bold text-gray-900 pt-2">
                <span>Total</span>
                <span className="text-blue-600">
                  {(total / 100).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

