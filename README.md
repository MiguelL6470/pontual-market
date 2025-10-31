# Marketplace MVP (Neon + Supabase Storage)

## Requisitos
- Node 18+
- Conta no Neon (Postgres)
- Projeto no Supabase (somente Storage)

## Variáveis de ambiente
Crie um arquivo `.env` com as chaves:

- NEXTAUTH_URL=http://localhost:3000
- NEXTAUTH_SECRET=uma_chave_segura
- DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
- SUPABASE_URL=...
- SUPABASE_ANON_KEY=...
- SUPABASE_SERVICE_ROLE=...
- NEXT_PUBLIC_BASE_URL=http://localhost:3000

Opcional OAuth:
- GITHUB_ID=...
- GITHUB_SECRET=...

## Instalação
```bash
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
# Aplique o SQL de FTS no Neon (via console) com o conteúdo de prisma/fts.sql
npm run db:seed
npm run dev
```

## Notas
- Uploads: `POST /api/uploads/signed-url` retorna URL assinada (Supabase Storage).
- Autorização: rotas de lojista exigem sessão (NextAuth).
- Busca: FTS com `plainto_tsquery` e índice GIN (veja `prisma/fts.sql`).
