'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'

type AddToCartButtonProps = {
  productId: string
  slug: string
  title: string
  priceCents: number
  image?: string
}

export function AddToCartButton({ productId, slug, title, priceCents, image }: AddToCartButtonProps) {
  const [pending, startTransition] = useTransition()
  const [added, setAdded] = useState(false)
  const router = useRouter()

  function handleAddToCart() {
    startTransition(() => {
      // Carregar carrinho atual
      const stored = localStorage.getItem('cart')
      const cartItems = stored ? JSON.parse(stored) : []

      // Verificar se o produto já está no carrinho
      const existingIndex = cartItems.findIndex((item: any) => item.productId === productId)

      if (existingIndex >= 0) {
        // Incrementar quantidade
        cartItems[existingIndex].quantity += 1
      } else {
        // Adicionar novo item
        cartItems.push({
          productId,
          slug,
          title,
          priceCents,
          image,
          quantity: 1,
        })
      }

      // Salvar no localStorage
      localStorage.setItem('cart', JSON.stringify(cartItems))

      setAdded(true)
      setTimeout(() => setAdded(false), 2000)

      // Opcional: redirecionar para o carrinho após adicionar
      // router.push('/cart')
    })
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={pending}
      className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-lg transition-colors font-medium text-lg ${
        added
          ? 'bg-green-600 text-white hover:bg-green-700'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <ShoppingCart className="w-5 h-5" />
      {added ? 'Adicionado!' : pending ? 'Adicionando...' : 'Adicionar ao Carrinho'}
    </button>
  )
}

