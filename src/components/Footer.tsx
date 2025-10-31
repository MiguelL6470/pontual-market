'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Shield, Truck, Undo2, Lock } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-gradient-to-b from-white to-neutral-50 text-neutral-700">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Barra de benefícios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="flex items-start gap-3 p-4 rounded-lg bg-white shadow-sm ring-1 ring-neutral-200/60">
            <Shield className="w-5 h-5 text-neutral-700 mt-0.5" aria-hidden />
            <div>
              <h3 className="font-semibold text-neutral-900">Compra Protegida</h3>
              <p className="text-sm text-neutral-600">Receba o que espera ou devolvemos seu dinheiro.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-white shadow-sm ring-1 ring-neutral-200/60">
            <Truck className="w-5 h-5 text-neutral-700 mt-0.5" aria-hidden />
            <div>
              <h3 className="font-semibold text-neutral-900">Frete Grátis</h3>
              <p className="text-sm text-neutral-600">A partir de R$ 19 em milhares de produtos.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-white shadow-sm ring-1 ring-neutral-200/60">
            <Undo2 className="w-5 h-5 text-neutral-700 mt-0.5" aria-hidden />
            <div>
              <h3 className="font-semibold text-neutral-900">Devolução Fácil</h3>
              <p className="text-sm text-neutral-600">Até 30 dias para devolver o que comprou.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-white shadow-sm ring-1 ring-neutral-200/60">
            <Lock className="w-5 h-5 text-neutral-700 mt-0.5" aria-hidden />
            <div>
              <h3 className="font-semibold text-neutral-900">Pagamento Seguro</h3>
              <p className="text-sm text-neutral-600">Cartão, Pix e segurança de ponta.</p>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-6 mb-10 p-6 rounded-xl bg-white ring-1 ring-neutral-200/60">
           <div>
             <h3 className="text-lg font-semibold">Fique por dentro das ofertas do Pontual Market</h3>
            <p className="text-sm text-neutral-600">Receba novidades e cupons exclusivos no seu e-mail.</p>
           </div>
          <form className="w-full max-w-md flex items-center gap-2">
            <label htmlFor="newsletter-email" className="sr-only">E-mail</label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="seu@email.com"
              className="w-full rounded-md px-3 py-2 bg-white text-neutral-900 placeholder-neutral-500 ring-1 ring-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="button" className="shrink-0 rounded-md bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors">Assinar</button>
          </form>
          {/* Removidos ícones sociais para um visual mais limpo */}
        </div>

        {/* Navegação */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-neutral-900 mb-4">Sobre o Pontual Market</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="text-neutral-600 hover:text-blue-600">Sobre</Link></li>
                <li><Link href="#" className="text-neutral-600 hover:text-blue-600">Investidores</Link></li>
                <li><Link href="#" className="text-neutral-600 hover:text-blue-600">Tendências</Link></li>
                <li><Link href="#" className="text-neutral-600 hover:text-blue-600">Blog</Link></li>
              </ul>
            </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-4">Para você</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-neutral-600 hover:text-blue-600">Minha Conta</Link></li>
              <li><Link href="#" className="text-neutral-600 hover:text-blue-600">Favoritos</Link></li>
              <li><Link href="#" className="text-neutral-600 hover:text-blue-600">Pedidos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-4">Atendimento</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-neutral-600 hover:text-blue-600">Central de Ajuda</Link></li>
              <li><Link href="#" className="text-neutral-600 hover:text-blue-600">Fale Conosco</Link></li>
              <li><Link href="#" className="text-neutral-600 hover:text-blue-600">Segurança</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-neutral-600 hover:text-blue-600">Termos e Condições</Link></li>
              <li><Link href="#" className="text-neutral-600 hover:text-blue-600">Privacidade</Link></li>
              <li><Link href="#" className="text-neutral-600 hover:text-blue-600">Acessibilidade</Link></li>
            </ul>
          </div>
        </div>

         {/* Base */}
         <div className="mt-10 border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-600">
           <p>© {new Date().getFullYear()} Pontual Market — Todos os direitos reservados.</p>
           <div className="flex items-center gap-3">
             <Image src="/visa.png" alt="Visa" width={64} height={40} className="object-contain" />
             <Image src="/mastercard_circles_92px_2x.png" alt="Mastercard" width={64} height={40} className="object-contain" />
             <Image src="/pix.svg" alt="Pix" width={56} height={36} className="object-contain" />
           </div>
         </div>
      </div>
    </footer>
  )
}
