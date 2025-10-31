'use client'

import { useState } from 'react'
import { ArrowLeft, Save, Store } from 'lucide-react'
import Link from 'next/link'

export default function OnboardingPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    
    const formData = new FormData(e.currentTarget)
    const payload = Object.fromEntries(formData.entries())
    
    const res = await fetch('/api/merchants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const json = await res.json()
    setLoading(false)
    
    if (res.ok) {
      setMessage('Perfil de lojista criado com sucesso!')
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 2000)
    } else {
      setMessage(json.error || 'Erro ao criar perfil')
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar ao Dashboard</span>
      </Link>

      <div className="bg-white border border-gray-200 rounded-xl p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Store className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Configurar Loja</h1>
            <p className="text-gray-600">Configure as informações da sua loja</p>
          </div>
        </div>
        
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nome da Loja *
            </label>
            <input
              name="storeName"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: Minha Loja Incrível"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição da Loja
            </label>
            <textarea
              name="description"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Conte um pouco sobre sua loja..."
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefone
              </label>
              <input
                name="phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="(11) 99999-9999"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Endereço
              </label>
              <input
                name="address"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Rua, número, cidade"
              />
            </div>
          </div>

          <div className="pt-6 border-t">
            <button
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              {loading ? 'Salvando...' : 'Salvar Configurações'}
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


