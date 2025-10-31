import type { Metadata } from 'next'
import { ShoppingBag, Users, Heart, Shield, Zap, MapPin } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sobre Nós | Pontual Market - Marketplace de Volta Redonda',
  description: 'Conheça o Pontual Market, o marketplace que conecta compradores e vendedores em Volta Redonda e região.',
}

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Sobre o Pontual Market</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Conectando compradores e vendedores em Volta Redonda com confiança, qualidade e praticidade
        </p>
      </div>

      <div className="prose prose-gray max-w-none space-y-12">
        {/* Missão */}
        <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossa Missão</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            O Pontual Market nasceu com o objetivo de facilitar o comércio eletrônico em Volta Redonda, oferecendo uma
            plataforma moderna, segura e acessível tanto para compradores quanto para vendedores locais. Acreditamos no
            poder do comércio local e no potencial de crescimento da economia regional através da tecnologia.
          </p>
        </section>

        {/* História */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Nossa História</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Fundado em 2024, o Pontual Market foi idealizado para atender às necessidades específicas de Volta Redonda.
              Identificamos que a região precisava de uma solução de marketplace que valorizasse o comércio local, oferecesse
              suporte personalizado e priorizasse a experiência do cliente.
            </p>
            <p>
              Começamos focando em estabelecer parcerias com comerciantes locais, entendendo suas necessidades e criando
              ferramentas que facilitassem o processo de venda online. Nosso compromisso sempre foi oferecer uma plataforma
              intuitiva, segura e confiável.
            </p>
            <p>
              Embora tenhamos iniciado em Volta Redonda, nossa visão é expandir gradualmente para toda a região Sul Fluminense
              e, eventualmente, para todo o Brasil, sempre mantendo nossos valores fundamentais de qualidade, confiança e
              compromisso com o cliente.
            </p>
          </div>
        </section>

        {/* Valores */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Nossos Valores</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Confiança</h3>
              <p className="text-gray-700">
                Priorizamos a segurança e a proteção dos dados dos nossos usuários, garantindo transações seguras e confiáveis.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Qualidade</h3>
              <p className="text-gray-700">
                Buscamos constantemente melhorar nossos serviços, oferecendo a melhor experiência possível para todos.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Inovação</h3>
              <p className="text-gray-700">
                Estamos sempre investindo em tecnologia e soluções inovadoras para facilitar o comércio eletrônico.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Comunidade</h3>
              <p className="text-gray-700">
                Valorizamos o comércio local e acreditamos no poder de fortalecer a economia regional.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Compromisso</h3>
              <p className="text-gray-700">
                Nos comprometemos em entregar o melhor atendimento e suporte para compradores e vendedores.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Local</h3>
              <p className="text-gray-700">
                Conhecemos e valorizamos Volta Redonda, priorizando o atendimento de qualidade para a região.
              </p>
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">O Que Nos Diferencia</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 text-2xl">✓</span>
              <div>
                <strong className="text-gray-900">Foco no Comércio Local:</strong>
                <span className="text-gray-700"> Priorizamos e valorizamos estabelecimentos e vendedores locais da região de Volta Redonda.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 text-2xl">✓</span>
              <div>
                <strong className="text-gray-900">Atendimento Personalizado:</strong>
                <span className="text-gray-700"> Oferecemos suporte dedicado e humanizado para resolver qualquer dúvida ou problema.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 text-2xl">✓</span>
              <div>
                <strong className="text-gray-900">Segurança:</strong>
                <span className="text-gray-700"> Utilizamos as melhores práticas de segurança e criptografia para proteger transações e dados.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 text-2xl">✓</span>
              <div>
                <strong className="text-gray-900">Facilidade de Uso:</strong>
                <span className="text-gray-700"> Plataforma intuitiva e fácil de navegar, tanto para compradores quanto para vendedores.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 text-2xl">✓</span>
              <div>
                <strong className="text-gray-900">Transparência:</strong>
                <span className="text-gray-700"> Cobranças claras e sem taxas ocultas para vendedores, preços transparentes para compradores.</span>
              </div>
            </li>
          </ul>
        </section>

        {/* Visão Futura */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Nossa Visão</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Nosso objetivo é nos tornarmos a principal plataforma de marketplace de Volta Redonda e região, reconhecidos pela
            qualidade do serviço, confiança e compromisso com nossos usuários. Queremos facilitar o crescimento de pequenos e
            médios comerciantes enquanto oferecemos aos compradores a melhor experiência de compra online possível.
          </p>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Faça Parte do Pontual Market</h2>
          <p className="text-lg mb-6 opacity-90">
            Seja você um comprador em busca de produtos ou um vendedor querendo expandir seu negócio, estamos prontos para
            recebê-lo!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Criar Conta Gratuita
            </Link>
            <Link
              href="/contact"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors border border-white/20"
            >
              Entrar em Contato
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

