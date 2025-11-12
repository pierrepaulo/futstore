# ⚽ FutStore

Plataforma full stack para uma loja digital de camisetas de futebol. O backend em Express + Prisma centraliza produtos, categorias, carrinho, pedidos e webhooks do Stripe. O frontend em Nextjs com App Router entrega vitrine responsiva, filtros, checkout e formulários de autenticação.

> Os produtos são obtidos do backend e exibidos em seções como **Produtos parecidos**, **Mais comprados** e **Mais visitados**, apoiadas por categoria, contadores de vendas e visualizações.

## Sumário

- [Visão Geral](#visão-geral)
- [Stack e Dependências Principais](#stack-e-dependências-principais)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Backend (Express + Prisma)](#-backend-express--prisma)
- [Frontend (Nextjs)](#-frontend-nextjs)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Execução e Scripts Úteis](#execução-e-scripts-úteis)
- [Pagamentos Stripe e Webhooks](#pagamentos-stripe-e-webhooks)
- [Credenciais e Dados Seed](#credenciais-e-dados-seed)

## Visão Geral

- Vitrine com banners, listas de produtos mais vistos e mais vendidos, filtros por metadados e página de produto com galeria.
- Carrinho persistido em cookie httpOnly, cálculo de frete simulado e fechamento via sessão de checkout do Stripe.
- Fluxo do usuário inclui cadastro, login e gerenciamento de endereços antes de liberar o checkout.
- Webhook do Stripe atualiza o status do pedido de acordo com eventos `checkout.session.*`.
- As seções de **Produtos parecidos**, **Mais comprados** e **Mais visitados** são abastecidas a partir do backend:

  - Parecidos por categoria do produto.
  - Mais comprados por contagem de vendas.
  - Mais visitados por contagem de visualizações.

## Stack e Dependências Principais

| Camada         | Tecnologias                                                                 | Destaques                                                                                                                                                                                               |
| -------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Backend        | Nodejs, Express, Prisma, Stripe, bcryptjs, cors, uuid, zod, tsx, TypeScript | Rotas em `routes/main.ts`, controllers finos chamando services, validação com Zod, acesso ao banco via Prisma Client em `src/libs/prisma.ts`, serviço de pagamento encapsulado em `src/libs/stripe.ts`. |
| Frontend       | Nextjs (App Router + Turbopack), React, Axios, Zustand, Zod, Tailwind CSS   | Dados carregados por server actions em `src/actions`, estado global com stores em `src/store`, hidratação via `StoreHydration`, componentes modulares em `src/components`.                              |
| Banco de dados | PostgreSQL + Prisma Migrate e Seed                                          | Esquema em `backend/prisma/schema.prisma` cobre usuários, endereços, categorias, metadados, produtos, pedidos e banners. Seeds criam catálogo base e pedido de exemplo.                                 |

## Estrutura do Projeto

```text
futstore-main/
|-- backend/
|   |-- src/
|   |   |-- server.ts              instancia Express, CORS, JSON e webhook Stripe raw
|   |   |-- routes/main.ts         define endpoints REST
|   |   |-- controllers/           validação + resposta HTTP
|   |   |-- services/              orquestração Prisma e Stripe
|   |   |-- schemas/               contratos Zod
|   |   |-- middleware/auth.ts     autentica token Bearer
|   |   |-- libs/                  helpers de Prisma e Stripe
|   |   |-- utils/                 composição de URLs e chaves
|   |-- prisma/                    schema, migrations e seed
|   |-- public/media/              imagens de banners e produtos
|-- frontend/
|   |-- src/
|   |   |-- app/(site)/            páginas (home, categorias, produto, carrinho, login, register)
|   |   |-- actions/               chamadas server-side para a API
|   |   |-- components/            UI reutilizável (home, layout, cart, product, auth)
|   |   |-- store/                 Zustand (auth, cart)
|   |   |-- libs/                  axios + utilitários de cookies
|   |   |-- hooks/                 helpers client-side (ex: querystring)
|   |   |-- providers/             StoreHydration
|   |-- public/                    assets estáticos usados no frontend
|-- README.md                      este guia
```

## 🧠 Backend (Express + Prisma)

### Fluxo e responsabilidades

1. `src/server.ts` aplica CORS, serve `public/`, ativa `express.raw` para `/webhook/stripe` e registra `routes`.
2. `routes/main.ts` roteia chamadas para controllers específicos (`banner`, `product`, `cart`, `user`, `order`, `webhook`).
3. Controllers:

   - fazem parsing com Zod (`src/schemas`);
   - chamam a camada de serviço (`src/services`);
   - enriquecem o payload com helpers (ex: `getAbsoluteImageUrl`) antes do `res.json`.

4. Services encapsulam Prisma (`src/libs/prisma.ts`) e Stripe (`src/libs/stripe.ts`), mantendo controllers finos.
5. `authMiddleware` valida tokens persistidos no campo `token` do usuário e injeta `req.userId`.

### Endpoints REST

| Método | Rota                       | Descrição                                                                           | Auth    |
| ------ | -------------------------- | ----------------------------------------------------------------------------------- | ------- |
| GET    | `/ping`                    | Verificação rápida da API.                                                          | Público |
| GET    | `/banners`                 | Lista banners com URL absoluto.                                                     | Público |
| GET    | `/products`                | Lista produtos com filtros `metadata`, `orderBy` (views, selling, price) e `limit`. | Público |
| GET    | `/product/:id`             | Detalhe do produto + categoria e incremento de views.                               | Público |
| GET    | `/product/:id/related`     | Produtos da mesma categoria (`limit`).                                              | Público |
| GET    | `/category/:slug/metadata` | Retorna categoria e metadados usados nos filtros do frontend.                       | Público |
| POST   | `/cart/mount`              | Recebe itens e devolve informações normalizadas.                                    | Público |
| GET    | `/cart/shipping`           | Calcula frete mockado (custo 7 e prazo 3 usando `zipcode`).                         | Público |
| POST   | `/user/register`           | Cria usuário com senha hasheada.                                                    | Público |
| POST   | `/user/login`              | Valida credenciais e devolve token UUID persistido.                                 | Público |
| POST   | `/user/addresses`          | Cadastra endereço vinculado ao usuário logado.                                      | Bearer  |
| GET    | `/user/addresses`          | Lista endereços cadastrados.                                                        | Bearer  |
| POST   | `/cart/finish`             | Cria pedido, abre checkout Stripe e devolve URL.                                    | Bearer  |
| GET    | `/orders/session`          | Recebe `session_id` e retorna `orderId`.                                            | Público |
| GET    | `/orders`                  | Lista pedidos do usuário.                                                           | Bearer  |
| GET    | `/orders/:id`              | Detalhe do pedido.                                                                  | Bearer  |
| POST   | `/webhook/stripe`          | Recebe eventos e atualiza status para `paid` ou `cancelled`.                        | Stripe  |

### Modelo de dados (Prisma)

- `User`, `UserAddress`: credenciais, token UUID para login sem JWT e endereços.
- `Banner`: imagem e link exibidos na home.
- `Category`, `CategoryMetadata`, `MetadataValue`: filtros dinâmicos por slug.
- `Product`, `ProductImage`, `ProductMetadata`: catálogo com imagens, descrição, metadados e contadores de visualização e venda.
- `Order`, `OrderProduct`: pedidos, itens, frete e endereço embarcado. Status inicia como `pending`.
- `ProductSize` enum: `P`, `M`, `G`, `GG`, compartilhado com o frontend.

Seed (`prisma/seed.ts`) cria:

- Categoria "Camisas de Futebol", metadado Time e valores para clubes brasileiros.
- Banners e produtos com imagens em `public/media`.
- Usuário `cliente@futstore.com` com senha `futstore123` e pedido pago de exemplo.

### Variáveis de ambiente (backend/.env)

- `PORT` padrão 4000.
- `BASE_URL` usado para montar URLs absolutas de mídia.
- `FRONT_END_URL` origem usada nos redirecionamentos do Stripe.
- `DATABASE_URL` string PostgreSQL.
- `STRIPE_SECRET_KEY` chave privada para criar sessões.
- `STRIPE_WEBHOOK_SECRET` segredo do webhook.

### Scripts NPM

- `npm run dev` `tsx watch --env-file=.env src/server.ts`
- `npm run db:seed` executa `prisma/seed.ts`
- Complementares via Prisma CLI:

  ```bash
  npx prisma generate
  npx prisma migrate dev
  ```

## 🖥️ Frontend (Nextjs)

### Estrutura e roteamento

- App Router com layout raiz (`src/app/layout.tsx`) carregando fonte Poppins e layout secundário `(site)` que aplica `Header`, `Footer` e `StoreHydration`.
- Páginas:

  - `/` home com banners e listas com carregamento preguiçoso de **Mais visitados** e **Mais comprados**.
  - `/categories/[slug]` listagem com filtros dinâmicos.
  - `/product/[id]` detalhes com galeria, descrição e **Produtos parecidos** por categoria.
  - `/cart` carrinho com frete e integração Stripe.
  - `/login`, `/register` formulários validados com Zod.

### Gestão de estado e dados

- Server actions em `src/actions` encapsulam chamadas Axios para a API (`src/libs/axios.ts` usa `NEXT_PUBLIC_API_BASE`).

  - Exemplos: `get-products`, `get-product-with-category`, `get-related-products`, `finish-cart`.

- Cookies httpOnly manipulados via helpers de servidor (`src/libs/server-cookies.ts`). `StoreHydration` lê tokens e itens e hidrata os stores.
- Zustand (`src/store/auth.ts`, `src/store/cart.ts`) guarda token, hidratação e estado do carrinho.
- `ShippingBox` alterna comportamento:

  - Não logado: CEP manual.
  - Logado: lista endereços e abre `AddressModal`.

- `FinishPurchaseButton` exige token e endereço para disparar `finishCart` e redirecionar para a URL do Stripe.

### UI e validação

- Componentes organizados por domínio em `src/components` (home, categories, product, cart, auth, layout).
- Formulários usam Zod e exibem mensagens de erro.
- Tailwind CSS define utilitários; `next.config.ts` libera imagens remotas `http://localhost`.

### Variáveis de ambiente (frontend/.env)

- `NEXT_PUBLIC_API_BASE` URL base do backend, ex: `http://localhost:4000`.

### Scripts NPM

- `npm run dev` `next dev --turbopack`
- `npm run build` `next build --turbopack`
- `npm run start` `next start`
- `npm run lint` executa ESLint

## Configuração do Ambiente

1. **Dependências locais**

   - Nodejs e npm.
   - PostgreSQL acessível via `DATABASE_URL`.
   - Stripe CLI e credenciais da dashboard.

2. **Clonar e preparar**

   ```bash
   git clone <repo>
   cd futstore-main
   ```

3. **Backend**

   ```bash
   cd backend
   cp .env.example .env
   # preencha DATABASE_URL, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, FRONT_END_URL, BASE_URL e PORT
   npm install
   npx prisma migrate dev
   npm run db:seed
   npm run dev
   ```

4. **Frontend**

   ```bash
   cd frontend
   cp .env.example .env
   # ajuste NEXT_PUBLIC_API_BASE para o endereço do backend, ex: http://localhost:4000
   npm install
   npm run dev
   ```

Durante o desenvolvimento mantenha ambos os servidores ativos (`backend:4000` e `frontend:3000`). O backend serve imagens pela pasta `public/media`, então mantenha `BASE_URL` apontando para a mesma origem configurada no proxy ou porta.

## Execução e Scripts Úteis

| Objetivo                        | Comando                          | Local       |
| ------------------------------- | -------------------------------- | ----------- |
| Iniciar API em modo dev         | `npm run dev`                    | `backend/`  |
| Aplicar migrações               | `npx prisma migrate dev`         | `backend/`  |
| Popular catálogo e usuário demo | `npm run db:seed`                | `backend/`  |
| Iniciar storefront em dev       | `npm run dev`                    | `frontend/` |
| Build de produção da storefront | `npm run build && npm run start` | `frontend/` |
| Análise estática                | `npm run lint`                   | `frontend/` |

## Pagamentos Stripe e Webhooks

1. `POST /cart/finish` cria o pedido, calcula subtotal e frete, gera a sessão do Stripe via `createStripeCheckoutSession` e devolve a `url`.
2. O frontend limpa o cookie do carrinho e redireciona o usuário para essa `url`.
3. Configure o webhook executando:

   ```bash
   stripe listen --forward-to localhost:4000/webhook/stripe
   ```

4. Copie o `Signing secret` exibido pelo Stripe CLI para `STRIPE_WEBHOOK_SECRET`.
5. Eventos tratados:

   - `checkout.session.completed` e `checkout.session.async_payment_succeeded` `updateOrderStatus(orderId, "paid")`.
   - `checkout.session.expired` e `checkout.session.async_payment_failed` status `cancelled`.

## Credenciais e Dados Seed

- **Usuário demo**: `cliente@futstore.com` senha `futstore123`.
- **Catálogo**: camisetas de clubes brasileiros com imagens em `backend/public/media/products`.
- **Pedidos**: seed cria um pedido `paid` que pode ser listado via `GET /orders` após login.
- **Frete**: `GET /cart/shipping` retorna valores mockados com custo 7 e prazo 3 dias. Ajuste `cartController.calculateShipping` ao integrar uma API real.
