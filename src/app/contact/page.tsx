'use client'

import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react'
import { useState } from 'react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Aqui você enviaria os dados para seu backend
    console.log('Form submitted:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Entre em Contato</h1>
        <p className="text-xl text-gray-600">
          Estamos aqui para ajudar! Entre em contato conosco e responderemos o mais rápido possível.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Informações de Contato */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Informações de Contato</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">E-mail</h3>
                <a href="mailto:contato@pontualmarket.com.br" className="text-blue-600 hover:underline">
                  contato@pontualmarket.com.br
                </a>
                <a href="mailto:suporte@pontualmarket.com.br" className="block text-blue-600 hover:underline">
                  suporte@pontualmarket.com.br
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Telefone</h3>
                <a href="tel:24999999999" className="text-gray-700">
                  (24) 99999-9999
                </a>
                <p className="text-sm text-gray-600 mt-1">Segunda a Sexta, 9h às 18h</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Endereço</h3>
                <p className="text-gray-700">
                  Volta Redonda, RJ
                  <br />
                  Brasil
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Horário de Atendimento</h3>
                <p className="text-gray-700">
                  Segunda a Sexta: 9h - 18h
                  <br />
                  Sábado: 9h - 13h
                  <br />
                  Domingo: Fechado
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Rápido */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Precisa de Ajuda Rápida?
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  → Como faço um pedido?
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  → Quero me tornar um vendedor
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  → Preciso devolver um produto
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline">
                  → Dúvidas sobre pagamento
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Formulário */}
        <div className="bg-white border border-gray-200 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Envie sua Mensagem</h2>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="text-green-600 text-4xl mb-3">✓</div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Mensagem Enviada!</h3>
              <p className="text-gray-700">
                Obrigado pelo contato. Responderemos em breve!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Seu nome"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="(24) 99999-9999"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Assunto *
                </label>
                <select
                  id="subject"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="">Selecione um assunto</option>
                  <option value="pedido">Dúvida sobre Pedido</option>
                  <option value="produto">Dúvida sobre Produto</option>
                  <option value="vendedor">Quero me tornar um Vendedor</option>
                  <option value="devolucao">Devolução/Reembolso</option>
                  <option value="pagamento">Dúvida sobre Pagamento</option>
                  <option value="tecnico">Problema Técnico</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Mensagem *
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                  placeholder="Descreva sua dúvida ou solicitação..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Enviar Mensagem
              </button>

              <p className="text-xs text-gray-500 text-center">
                Ao enviar, você concorda com nossos Termos de Uso e Política de Privacidade.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

