import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Termos de Uso | Pontual Market - Marketplace de Volta Redonda',
  description: 'Leia os termos e condições de uso do Pontual Market, o marketplace mais confiável de Volta Redonda.',
}

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Termos de Uso</h1>
      
      <div className="prose prose-gray max-w-none space-y-8">
        <section>
          <p className="text-sm text-gray-600 mb-6">
            <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <p className="text-gray-700 leading-relaxed">
            Bem-vindo ao Pontual Market! Ao acessar e utilizar nossa plataforma, você concorda com os seguintes termos e condições.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Aceitação dos Termos</h2>
          <p className="text-gray-700 leading-relaxed">
            Ao criar uma conta, fazer uma compra ou usar qualquer funcionalidade do Pontual Market, você concorda em cumprir estes Termos de Uso.
            Se você não concorda com qualquer parte destes termos, não deverá utilizar nossos serviços.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Descrição do Serviço</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            O Pontual Market é uma plataforma de marketplace que conecta compradores e vendedores, inicialmente focada em Volta Redonda.
            Nossos serviços incluem:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Intermediação de compras e vendas entre usuários</li>
            <li>Processamento de pagamentos</li>
            <li>Gestão de estoque e entregas</li>
            <li>Suporte ao cliente</li>
            <li>Ferramentas para vendedores gerenciarem suas lojas</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cadastro e Conta de Usuário</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Para utilizar nossos serviços, você precisará criar uma conta. Você é responsável por:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Fornecer informações precisas e atualizadas</li>
            <li>Manter a segurança de sua conta e senha</li>
            <li>Notificar-nos imediatamente sobre qualquer uso não autorizado de sua conta</li>
            <li>Ter pelo menos 18 anos de idade ou ter consentimento parental</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Compras e Pagamentos</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            As compras realizadas através do Pontual Market estão sujeitas aos seguintes termos:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Os preços dos produtos são definidos pelos vendedores</li>
            <li>As informações sobre disponibilidade e envio são fornecidas pelos vendedores</li>
            <li>O Pontual Market atua como intermediador e não é o vendedor direto dos produtos</li>
            <li>Taxas de entrega são calculadas no momento da compra</li>
            <li>Todas as transações devem ser realizadas através da plataforma</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Devoluções e Reembolsos</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Nossa política de devoluções segue as diretrizes abaixo:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Produtos podem ser devolvidos em até 7 dias após o recebimento</li>
            <li>Produtos devem estar em condições originais e não utilizados</li>
            <li>O custo de envio da devolução será definido pelo vendedor</li>
            <li>Reembolsos serão processados após o recebimento e verificação do produto</li>
            <li>Produtos personalizados ou sob medida podem não ser elegíveis para devolução</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Vendedores</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Se você é um vendedor no Pontual Market, você concorda em:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Fornecer informações precisas sobre seus produtos</li>
            <li>Manter estoque atualizado e cumprir com os prazos de entrega</li>
            <li>Responder a questões de clientes em tempo hábil</li>
            <li>Processar devoluções e reembolsos conforme nossa política</li>
            <li>Pagar as taxas de comissão estabelecidas</li>
            <li>Não vender produtos proibidos, ilegais ou falsificados</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Propriedade Intelectual</h2>
          <p className="text-gray-700 leading-relaxed">
            Todo o conteúdo da plataforma Pontual Market, incluindo textos, gráficos, logotipos, ícones, imagens, downloads digitais
            e compilações de dados, é propriedade da Pontual Market ou de seus fornecedores de conteúdo e está protegido por leis
            de direitos autorais e marcas registradas.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitação de Responsabilidade</h2>
          <p className="text-gray-700 leading-relaxed">
            O Pontual Market atua como intermediador entre compradores e vendedores. Não somos responsáveis pela qualidade, segurança
            ou legitimidade dos produtos vendidos, nem pelas informações fornecidas pelos vendedores. Nossa responsabilidade limita-se
            à intermediação da transação e ao processamento de pagamentos.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Modificações dos Termos</h2>
          <p className="text-gray-700 leading-relaxed">
            Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. Alterações significativas serão comunicadas
            aos usuários através da plataforma ou por e-mail. O uso continuado de nossos serviços após tais modificações constitui
            aceitação dos novos termos.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Lei Aplicável</h2>
          <p className="text-gray-700 leading-relaxed">
            Estes Termos de Uso são regidos pelas leis do Brasil. Qualquer disputa relacionada a estes termos será resolvida
            nos tribunais competentes de Volta Redonda, RJ.
          </p>
        </section>

        <section className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Dúvidas?</h2>
          <p className="text-gray-700 leading-relaxed">
            Se você tiver alguma dúvida sobre estes Termos de Uso, entre em contato conosco através da nossa página de contato
            ou envie um e-mail para <strong>suporte@pontualmarket.com.br</strong>.
          </p>
        </section>
      </div>
    </div>
  )
}

