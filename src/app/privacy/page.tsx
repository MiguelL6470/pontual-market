import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade | Pontual Market - Marketplace de Volta Redonda',
  description: 'Conheça nossa política de privacidade e como protegemos seus dados pessoais no Pontual Market.',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Privacidade</h1>
      
      <div className="prose prose-gray max-w-none space-y-8">
        <section>
          <p className="text-sm text-gray-600 mb-6">
            <strong>Última atualização:</strong> {new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <p className="text-gray-700 leading-relaxed">
            A Pontual Market está comprometida em proteger sua privacidade. Esta Política de Privacidade descreve como coletamos,
            usamos, armazenamos e protegemos suas informações pessoais quando você utiliza nossa plataforma.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Informações que Coletamos</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Coletamos os seguintes tipos de informações:
          </p>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">1.1 Informações Fornecidas por Você</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Nome completo e informações de contato</li>
            <li>Endereço de e-mail</li>
            <li>Senha (criptografada)</li>
            <li>Endereços de entrega e cobrança</li>
            <li>Informações de pagamento (processadas por terceiros seguros)</li>
            <li>Número de telefone</li>
            <li>Informações da loja (para vendedores)</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">1.2 Informações Coletadas Automaticamente</h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Endereço IP e informações do navegador</li>
            <li>Histórico de navegação na plataforma</li>
            <li>Produtos visualizados e pesquisados</li>
            <li>Dados de dispositivos e sistema operacional</li>
            <li>Cookies e tecnologias de rastreamento</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">1.3 Informações de Terceiros</h3>
          <p className="text-gray-700 leading-relaxed">
            Podemos receber informações sobre você de serviços de autenticação de terceiros (como Google ou Facebook) quando você
            opta por fazer login através desses serviços.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Como Usamos suas Informações</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Utilizamos suas informações pessoais para:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Processar e gerenciar suas compras e pedidos</li>
            <li>Facilitar a comunicação entre compradores e vendedores</li>
            <li>Enviar notificações sobre seu pedido e atualizações do serviço</li>
            <li>Melhorar e personalizar sua experiência na plataforma</li>
            <li>Prevenir fraudes e garantir a segurança da plataforma</li>
            <li>Cumprir obrigações legais e regulatórias</li>
            <li>Enviar marketing e comunicações promocionais (com seu consentimento)</li>
            <li>Realizar análises e pesquisas para melhorar nossos serviços</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Compartilhamento de Informações</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Não vendemos suas informações pessoais. Compartilhamos suas informações apenas nas seguintes circunstâncias:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Vendedores:</strong> Para completar uma transação, compartilhamos informações de contato e entrega com o vendedor</li>
            <li><strong>Prestadores de Serviços:</strong> Com empresas que nos ajudam a operar (pagamentos, envio, análise de dados)</li>
            <li><strong>Obrigações Legais:</strong> Quando exigido por lei ou para proteger nossos direitos</li>
            <li><strong>Consentimento:</strong> Quando você autoriza explicitamente o compartilhamento</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cookies e Tecnologias de Rastreamento</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Utilizamos cookies e tecnologias similares para:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Manter você logado na plataforma</li>
            <li>Lembrar suas preferências e configurações</li>
            <li>Analisar o uso da plataforma e melhorar nossos serviços</li>
            <li>Fornecer conteúdo personalizado e publicidade relevante</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            Você pode controlar o uso de cookies através das configurações do seu navegador, mas isso pode afetar a funcionalidade
            da plataforma.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Segurança dos Dados</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Implementamos medidas de segurança técnicas, administrativas e físicas para proteger suas informações pessoais:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Criptografia SSL/TLS para transmissão de dados</li>
            <li>Senhas criptografadas e armazenadas com segurança</li>
            <li>Controles de acesso rigorosos</li>
            <li>Monitoramento regular de segurança</li>
            <li>Processamento seguro de pagamentos via provedores certificados PCI DSS</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Seus Direitos (LGPD)</h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Acesso:</strong> Solicitar uma cópia de seus dados pessoais</li>
            <li><strong>Correção:</strong> Solicitar a correção de dados imprecisos ou desatualizados</li>
            <li><strong>Exclusão:</strong> Solicitar a exclusão de seus dados quando não forem mais necessários</li>
            <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
            <li><strong>Revogação de Consentimento:</strong> Retirar seu consentimento a qualquer momento</li>
            <li><strong>Oposição:</strong> Opor-se ao processamento de seus dados em certas circunstâncias</li>
          </ul>
          <p className="text-gray-700 leading-relaxed mt-4">
            Para exercer esses direitos, entre em contato conosco através de <strong>privacidade@pontualmarket.com.br</strong>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Retenção de Dados</h2>
          <p className="text-gray-700 leading-relaxed">
            Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos descritos nesta política,
            salvo quando exigido por lei. Dados de transações são mantidos por pelo menos 5 anos conforme exigências legais.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Privacidade de Menores</h2>
          <p className="text-gray-700 leading-relaxed">
            Nossos serviços são destinados a usuários com pelo menos 18 anos. Não coletamos intencionalmente informações pessoais
            de menores de idade sem o consentimento dos pais ou responsáveis.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Alterações nesta Política</h2>
          <p className="text-gray-700 leading-relaxed">
            Podemos atualizar esta Política de Privacidade ocasionalmente. Notificaremos sobre alterações significativas através
            da plataforma ou por e-mail. Recomendamos que revise periodicamente esta política.
          </p>
        </section>

        <section className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Contato sobre Privacidade</h2>
          <p className="text-gray-700 leading-relaxed mb-2">
            Se você tiver dúvidas sobre esta Política de Privacidade ou desejar exercer seus direitos, entre em contato conosco:
          </p>
          <ul className="list-none space-y-1 text-gray-700">
            <li><strong>E-mail:</strong> privacidade@pontualmarket.com.br</li>
            <li><strong>Telefone:</strong> (24) 99999-9999</li>
            <li><strong>Endereço:</strong> Volta Redonda, RJ, Brasil</li>
          </ul>
        </section>
      </div>
    </div>
  )
}

