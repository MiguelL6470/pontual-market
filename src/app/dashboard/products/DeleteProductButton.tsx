'use client'

import { useState, useTransition } from 'react'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function DeleteProductButton({ productId }: { productId: string }) {
  const [pending, startTransition] = useTransition()
  const [confirming, setConfirming] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    if (!confirming) {
      setConfirming(true)
      return
    }

    startTransition(async () => {
      try {
        const res = await fetch(`/api/products/${productId}`, { method: 'DELETE' })
        if (res.ok) {
          router.refresh()
        }
      } catch (error) {
        console.error('Erro ao deletar produto:', error)
      } finally {
        setConfirming(false)
      }
    })
  }

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className={`p-2 rounded-lg transition-colors ${
        confirming
          ? 'text-red-600 bg-red-50 hover:bg-red-100'
          : 'text-red-600 hover:bg-red-50'
      } disabled:opacity-50`}
      aria-label={confirming ? 'Confirmar exclusão' : 'Deletar'}
    >
      <Trash2 className={`w-4 h-4 ${pending ? 'animate-pulse' : ''}`} />
    </button>
  )
}

