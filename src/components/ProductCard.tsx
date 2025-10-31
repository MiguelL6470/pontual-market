"use client"

import Link from 'next/link'
import { useState, useTransition } from 'react'
import { Heart, Truck } from 'lucide-react'
import { useRouter } from 'next/navigation'

type ProductMinimal = {
  id: string
  title: string
  slug: string
  priceCents: number
  images?: { url: string }[]
  promoPriceCents?: number
  freeShipping?: boolean
}

type Props = { product: ProductMinimal }

export function ProductCard({ product }: Props) {
  const image = product.images?.[0]?.url

  const basePriceCents = product.priceCents
  const promoPriceCents = product.promoPriceCents ?? (basePriceCents >= 10000 ? Math.round(basePriceCents * 0.85) : undefined)
  const finalPriceCents = promoPriceCents ?? basePriceCents
  const hasPromo = typeof promoPriceCents === 'number' && promoPriceCents < basePriceCents
  const discountPct = hasPromo ? Math.round((1 - (promoPriceCents! / basePriceCents)) * 100) : 0
  const pixPriceCents = Math.round(finalPriceCents * 0.95)
  const freeShipping = product.freeShipping ?? finalPriceCents >= 1900

  const formatBRL = (cents: number) => (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  const [pending, startTransition] = useTransition()
  const [isFavorite, setIsFavorite] = useState(false)
  const router = useRouter()

  async function handleFavorite(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()

    startTransition(async () => {
      try {
        if (!isFavorite) {
          const res = await fetch('/api/favorites', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId: product.id }),
          })
          if (res.status === 401) {
            router.push('/api/auth/signin')
            return
          }
          setIsFavorite(true)
        } else {
          const res = await fetch(`/api/favorites/${product.id}`, { method: 'DELETE' })
          if (res.status === 401) {
            router.push('/api/auth/signin')
            return
          }
          setIsFavorite(false)
        }
      } catch (error) {
        console.error('Erro ao favoritar:', error)
      }
    })
  }

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden mb-3">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={image} 
            alt={product.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-gray-400 text-4xl">📦</span>
          </div>
        )}
        {hasPromo ? (
          <div className="absolute left-2 top-2 rounded-md bg-rose-600 text-white text-xs font-semibold px-2 py-1 shadow">
            {discountPct}% OFF
          </div>
        ) : null}

        <button
          onClick={handleFavorite}
          disabled={pending}
          className={`absolute top-2 right-2 p-2 bg-white/90 backdrop-blur rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white ${
            isFavorite ? 'opacity-100 bg-red-50' : ''
          } disabled:opacity-50`}
          aria-label="Favoritar"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'text-red-600 fill-red-600' : 'text-gray-700'}`} />
        </button>
      </div>
      <div className="space-y-1">
        <h3 className="text-sm md:text-base font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>
        <div className="flex items-center gap-2">
          <div className="text-xl md:text-2xl font-bold text-gray-900">{formatBRL(finalPriceCents)}</div>
          {hasPromo ? (
            <div className="text-sm text-gray-500 line-through">{formatBRL(basePriceCents)}</div>
          ) : null}
        </div>
        <div className="text-xs md:text-sm text-emerald-700">no Pix {formatBRL(pixPriceCents)}</div>
        {freeShipping ? (
          <div className="inline-flex items-center gap-1 text-xs md:text-sm text-emerald-700">
            <Truck className="w-3 h-3" /> Frete grátis
          </div>
        ) : null}
      </div>
    </Link>
  )
}


