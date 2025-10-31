'use client'

import { useState, useTransition } from 'react'
import { Heart } from 'lucide-react'

export function FavoriteButton({ productId }: { productId: string }) {
  const [pending, startTransition] = useTransition()
  const [fav, setFav] = useState(false)

  async function toggle() {
    startTransition(async () => {
      if (!fav) {
        await fetch('/api/favorites', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ productId }) })
        setFav(true)
      } else {
        await fetch(`/api/favorites/${productId}`, { method: 'DELETE' })
        setFav(false)
      }
    })
  }

  return (
    <button
      onClick={toggle}
      disabled={pending}
      className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg border transition-colors font-medium ${
        fav
          ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
      }`}
    >
      <Heart className={`w-5 h-5 ${fav ? 'fill-red-600' : ''}`} />
      {fav ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
    </button>
  )
}


