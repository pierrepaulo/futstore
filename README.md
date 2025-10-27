## FutStore ⚽🛒

E-commerce fullstack com backend em Node/Express + Prisma/Stripe e frontend em Next.js/React.

## 🖥️ FutStore Backend

### Descricao do Projeto

API REST em TypeScript com Express 5 que centraliza o catálogo, carrinho, pedidos e pagamentos do FutStore. O serviço usa Prisma para persistir dados em PostgreSQL, hospeda arquivos estáticos e integra o checkout da Stripe para finalizar compras.

### Funcionalidades Principais

- `GET /ping` para health check e publicação de arquivos estáticos via `public/` (banners e imagens dos produtos).
- Catálogo de produtos com ordenação por visualizações, vendas ou preço, detalhamento com imagens e sugestão de relacionados.
- Exposição de metadados de categoria (`/category/:slug/metadata`) para construir filtros dinâmicos no frontend.
- Carrinho com montagem validada por itens (`/cart/mount`), calculo de frete (`/cart/shipping`) e finalização autenticada que cria pedidos e retorna um link de checkout Stripe.
- Autenticação de usuários com registro/login via `bcryptjs`, geração de tokens `uuid` e gestão de endereços protegidos por middleware
- APIs de pedidos para recuperar pedidos pela sessão Stripe, listar/detalhar compras do usuário e webhook da Stripe que atualiza o status para `paid` ou `cancelled`.

### Tecnologias Utilizadas

- Node.js + TypeScript executado com [`tsx`](futstore-backend/package.json).
- Express 5, `cors` e middleware `express.raw` para lidar com webhooks.
- Prisma ORM (`prisma/schema.prisma`, `prisma/migrations`, client em `src/generated/prisma`) conectado a PostgreSQL.
- Stripe SDK (`src/libs/stripe.ts`) para criação de sessões de checkout e verificação de webhooks.
- Zod para validação de requisições (`src/schemas`).
- `bcryptjs` para hashing de senhas e `uuid` para emissao de tokens.

### Configuracao do Ambiente

1. Pre-requisitos:
   - Node.js 18+ e npm.
   - Servidor PostgreSQL acessivel e database `futstore` (ajuste o nome conforme desejar).
   - Conta Stripe com chave secreta e, se for usar webhooks localmente, um segredo de webhook.
2. Instale as dependencias na pasta `futstore-backend`:
   - `npm install`
3. Crie o arquivo `.env` na pasta `futstore-backend` (baseado no conteudo existente) com:
   - `PORT`: porta exposta pela API (padrao `4000`).
   - `BASE_URL`: URL base usada para construir links absolutos de imagens (ex.: `http://localhost:4000`).
   - `FRONT_END_URL`: URL do frontend para redirecionar sucesso/cancelamento do Stripe (ex.: `http://localhost:3000`).
   - `DATABASE_URL`: string de conexao PostgreSQL usada pelo Prisma (ex.: `postgresql://user:password@localhost:5432/futstore?schema=public`).
   - `STRIPE_SECRET_KEY`: chave secreta usada para criar sessoes de pagamento.
   - `STRIPE_WEBHOOK_SECRET`: chave usada para validar eventos recebidos em `/webhook/stripe`.
4. Garanta que o PostgreSQL esteja em execucao antes de aplicar as migracoes.

### Execucao do Projeto

1. Clone o repositorio e navegue ate `futstore-backend`.
2. Aplique as migracoes Prisma e, opcionalmente, rode a seed para dados iniciais (banners, produtos, usuario de teste):
   ```bash
   # macOS / Linux
   npm install
   npx prisma migrate dev
   npm run db:seed
   npm run dev
   ```
   ```powershell
   # Windows PowerShell
   npm install
   npx prisma migrate dev
   npm run db:seed
   npm run dev
   ```
3. A API ficara disponivel em `http://localhost:4000` e servira os arquivos estaticos em `http://localhost:4000/media/...`.
4. Se precisar refazer a carga de dados de demonstracao, execute `npm run db:seed` apos limpar as tabelas.
5. Configure o Stripe CLI (opcional) para encaminhar webhooks reais para `http://localhost:4000/webhook/stripe`, usando o segredo definido em `STRIPE_WEBHOOK_SECRET`.

## 🏠 FutStore Frontend

### Descricao do Projeto

Frontend em Next.js 15 (App Router) e React 19 que exibe o catalogo FutStore, permite autenticacao, gerenciamento de enderecos, carrinho persistido em cookies e integracao com o checkout do backend.

### Funcionalidades Principais

- Pagina inicial com carrossel de banners e listas dinamicas de produtos mais vistos e mais vendidos.
- Pagina de categoria (`/categories/[slug]`) com filtros de metadados gerados pela API.
- Pagina de produto com galeria, selecao de tamanho, adicao ao carrinho e sugestao de relacionados.
- Carrinho server-side com resgate de itens via API, calculo de frete, selecao de endereco e redirecionamento para o Stripe ao finalizar.
- Fluxos de login/registro validados com Zod, persistencia do token em cookie HTTPOnly e hidratacao do estado global via `StoreHydration`.
- Gestao de enderecos do usuario diretamente no modal do carrinho.

### Tecnologias Utilizadas

- Next.js 15.5 (App Router) com React 19 e TypeScript.
- Tailwind CSS 4 via `@tailwindcss/postcss` para estilizacao.
- Axios para chamadas a API (`src/libs/axios`).
- Zod nos formularios client-side.
- Zustand para estados globais de autenticacao e carrinho.
- Server Actions para integracao com cookies (`src/libs/server-cookies`) e comunicacao com o backend.

### Estrutura de Pastas

| Pasta              | Descricao                                                                                     |
| ------------------ | --------------------------------------------------------------------------------------------- |
| `src/app/(site)`   | Rotas publicas (home, categorias, produto, carrinho, login, cadastro) e composicao de layout. |
| `src/actions`      | Server Actions que consomem a API, manipulam cookies e orquestram fluxo de checkout.          |
| `src/components`   | Componentes reutilizaveis de layout, home, produto e carrinho.                                |
| `src/store`        | Estados globais com Zustand para autenticacao e carrinho.                                     |
| `src/libs`         | Clients utilitarios (Axios, helpers de cookies).                                              |
| `src/constants`    | Constantes compartilhadas como tamanhos de produto.                                           |
| `src/types`        | Tipagens TypeScript alinhadas ao backend.                                                     |
| `public/assets/ui` | Icones e imagens usados no layout.                                                            |

### Configuracao do Ambiente

1. Pre-requisitos:
   - Node.js 18.18+ (versao minima suportada pelo Next.js 15) e npm.
   - Backend FutStore acessivel (por padrao em `http://localhost:4000`).
2. Instale as dependencias na pasta `futstore-frontend`:
   - `npm install`
3. Crie o arquivo `.env` na pasta `futstore-frontend` contendo:
   - `NEXT_PUBLIC_API_BASE`: URL base das APIs (ex.: `http://localhost:4000`).
4. Certifique-se de que o backend esteja ativo antes de rodar o frontend para evitar erros de requisicao.

### Execucao do Projeto

1. Apos concluir os passos do backend, execute o frontend:
   ```bash
   # macOS / Linux
   npm install
   npm run dev
   ```
   ```powershell
   # Windows PowerShell
   npm install
   npm run dev
   ```
2. A aplicacao ficara acessivel em `http://localhost:3000`.
3. Apos ajustes, gere a versao de producao com:
   ```bash
   npm run build
   npm start
   ```
   (os mesmos comandos funcionam em PowerShell).
4. Rode `npm run lint` para aplicar as regras do `eslint.config.mjs` antes de commitar.
5. Garanta que `NEXT_PUBLIC_API_BASE` aponte para o backend correto em qualquer ambiente (local, homologacao ou producao).
