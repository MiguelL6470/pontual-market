'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save } from 'lucide-react'
import { ImageUploader } from '@/components/ImageUploader'

type Category = {
  id: string
  name: string
}

type Product = {
  id: string
  title: string
  description: string
  priceCents: number
  stock: number
  status: 'DRAFT' | 'ACTIVE' | 'ARCHIVED'
  categoryId: string
  images: Array<{ id: string; url: string; alt: string | null }>
}

export default function EditProductPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [product, setProduct] = useState<Product | null>(null)
  const [uploadedImages, setUploadedImages] = useState<Array<{ url: string; alt?: string; position: number }>>([])
  const router = useRouter()

  useEffect(() => {
    // Carregar categorias
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data.categories))

    // Carregar produto
    fetch(`/api/products/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.product) {
          setProduct(data.product)
          setUploadedImages(
            data.product.images.map((img: { id: string; url: string; alt: string | null }) => ({ url: img.url, alt: img.alt || undefined }))
          )
        }
      })
      .catch((error) => {
        console.error('Erro ao carregar produto:', error)
        setMessage('Erro ao carregar produto')
      })
      .finally(() => setLoading(false))
  }, [params.id])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    const formData = new FormData(e.currentTarget)
    const payload: any = {
      title: formData.get('title'),
      description: formData.get('description'),
      priceCents: Math.round(Number(formData.get('priceCents')) * 100),
      stock: Number(formData.get('stock') || 0),
      status: formData.get('status'),
    }

    const res = await fetch(`/api/products/${params.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const json = await res.json()
    setSaving(false)

    if (res.ok) {
      setMessage('Produto atualizado com sucesso!')
      setTimeout(() => {
        router.push('/dashboard/products')
      }, 1500)
    } else {
      setMessage(json.error || 'Erro ao atualizar produto')
    }
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-64" />
          <div className="h-96 bg-gray-200 rounded" />
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Produto não encontrado</h1>
          <p className="text-gray-600 mb-8">O produto que você está procurando não existe ou não pertence a você.</p>
          <Link
            href="/dashboard/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar aos Produtos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link
        href="/dashboard/products"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar aos Produtos</span>
      </Link>

      <div className="bg-white border border-gray-200 rounded-xl p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Editar Produto</h1>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título do Produto
            </label>
            <input
              name="title"
              required
              defaultValue={product.title}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: Smartphone Samsung Galaxy"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição
            </label>
            <textarea
              name="description"
              required
              rows={6}
              defaultValue={product.description}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Descreva detalhadamente o produto..."
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preço (R$)
              </label>
              <input
                name="priceCents"
                type="number"
                step="0.01"
                min="0"
                required
                defaultValue={(product.priceCents / 100).toFixed(2)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="99.99"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estoque
              </label>
              <input
                name="stock"
                type="number"
                min="0"
                required
                defaultValue={product.stock}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <select
                name="categoryId"
                required
                defaultValue={product.categoryId}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">A categoria não pode ser alterada</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                required
                defaultValue={product.status}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="DRAFT">Rascunho</option>
                <option value="ACTIVE">Ativo</option>
                <option value="ARCHIVED">Arquivado</option>
              </select>
            </div>
          </div>

          <ImageUploader
            maxImages={8}
            onImagesChange={setUploadedImages}
            initialImages={uploadedImages}
          />

          <div className="pt-6 border-t">
            <button
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </button>

            {message && (
              <div
                className={`mt-4 px-4 py-3 rounded-lg ${
                  message.includes('sucesso')
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-700'
                }`}
              >
                {message}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

