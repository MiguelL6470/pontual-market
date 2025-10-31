'use client'

import { useState, useTransition } from 'react'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function RemoveFavoriteButton({ productId }: { productId: string }) {
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  async function handleRemove() {
    startTransition(async () => {
      try {
        const res = await fetch(`/api/favorites/${productId}`, { method: 'DELETE' })
        if (res.ok) {
          router.refresh()
        }
      } catch (error) {
        console.error('Erro ao remover favorito:', error)
      }
    })
  }

  return (
    <button
      onClick={handleRemove}
      disabled={pending}
      className="p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 disabled:opacity-50"
      aria-label="Remover dos favoritos"
    >
      <Trash2 className={`w-4 h-4 text-gray-600 ${pending ? 'animate-pulse' : ''}`} />
    </button>
  )
}

