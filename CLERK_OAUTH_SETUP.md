# Configuração de OAuth Customizado no Clerk

Para que apareça "Pontual Market" ao invés de "Clerk" na tela de consentimento do Google/Apple/Facebook, você precisa configurar credenciais OAuth customizadas no Clerk Dashboard.

## Configuração no Google Cloud Console

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Vá em **APIs & Services** > **Credentials**
4. Clique em **Create Credentials** > **OAuth client ID**
5. Se for a primeira vez, configure o **OAuth consent screen**:
   - Tipo: **External** (ou Internal se for organização)
   - Nome do app: **Pontual Market**
   - Email de suporte
   - Logo: Faça upload do logo (`/logo2.png`)
   - Domínio autorizado: Seu domínio (ex: `pontualmarket.com`)
   - Scopes: `email`, `profile`, `openid`
6. Crie as credenciais OAuth:
   - Tipo: **Web application**
   - Nome: "Pontual Market Web Client"
   - Authorized redirect URIs: Você vai pegar isso no Clerk Dashboard

## Configuração no Clerk Dashboard

1. Acesse [Clerk Dashboard](https://dashboard.clerk.com/)
2. Vá em **User & Authentication** > **Social Connections**
3. Para cada provider (Google, Apple, Facebook):

### Google:
1. Clique em **Google**
2. Clique em **Manage** > **Use custom credentials**
3. Cole o **Client ID** e **Client Secret** do Google Cloud Console
4. No campo **Redirect URI**, copie a URL que o Clerk fornecer
5. Volte no Google Cloud Console e adicione essa URL em **Authorized redirect URIs**
6. Salve no Clerk

### Apple:
1. Acesse [Apple Developer](https://developer.apple.com/)
2. Vá em **Certificates, Identifiers & Profiles**
3. Crie um **Service ID** e configure o OAuth
4. Configure no Clerk com as credenciais da Apple

### Facebook:
1. Acesse [Facebook Developers](https://developers.facebook.com/)
2. Crie um novo app
3. Configure o OAuth e pegue **App ID** e **App Secret**
4. Configure no Clerk com essas credenciais

## Após a Configuração

Depois de configurar as credenciais customizadas:
- A tela de consentimento do Google mostrará **"Prosseguir para Pontual Market"**
- A experiência de login será completamente personalizada com seu branding
- Você terá controle total sobre as configurações OAuth

## Nota Importante

Enquanto não configurar as credenciais customizadas, o Clerk usará suas credenciais gerenciadas, o que sempre mostrará "Clerk" na tela de consentimento. Isso é uma limitação do uso de credenciais gerenciadas.

