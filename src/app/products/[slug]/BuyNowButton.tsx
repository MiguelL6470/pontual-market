'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { CreditCard } from 'lucide-react'

type BuyNowButtonProps = {
  productId: string
  slug: string
  title: string
  priceCents: number
  image?: string
}

export function BuyNowButton({ productId, slug, title, priceCents, image }: BuyNowButtonProps) {
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  function handleBuyNow() {
    startTransition(() => {
      // Cria um carrinho temporário apenas com este item e segue para o checkout
      const singleItemCart = [
        {
          productId,
          slug,
          title,
          priceCents,
          image,
          quantity: 1,
        },
      ]

      localStorage.setItem('cart', JSON.stringify(singleItemCart))
      router.push('/checkout')
    })
  }

  return (
    <button
      onClick={handleBuyNow}
      disabled={pending}
      className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-lg transition-colors font-medium text-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <CreditCard className="w-5 h-5" />
      {pending ? 'Carregando...' : 'Comprar agora'}
    </button>
  )
}


