# Delícias da Gaby

Site institucional e cardápio digital da **Delícias da Gaby**, confeitaria artesanal em Santa Inês, BA ([@deliciaasdagaby](https://instagram.com/deliciaasdagaby)).

O site apresenta os produtos e envia o pedido pronto pro WhatsApp, sem necessidade de checkout ou backend próprio.

## Stack

- [Next.js 14](https://nextjs.org) (App Router)
- React 18
- CSS Modules (sem framework de UI)

## Funcionalidades

- **Home**: Hero com vídeo de fundo, seção "Os queridinhos da casa" (carrossel) e Sobre.
- **Cardápio (`/pedido`)**: lista de produtos por categoria com carrinho.
- **Produto (`/produto/[id]`)**: página individual de cada item.
- **Carrinho**: adiciona múltiplos produtos e monta uma única mensagem de pedido.
- **Envio via WhatsApp**: todo pedido (avulso ou carrinho) é enviado como mensagem pronta pro WhatsApp da Gaby — sem gateway de pagamento.
- **Open Graph**: preview configurado para WhatsApp, Facebook e Twitter/X (`public/opengraph-image.jpg`).

## Estrutura de pastas

```
src/
  app/            # rotas (App Router): home, /pedido, /produto/[id]
  components/     # componentes de UI (Hero, Header, Footer, Carrinho, etc.)
  context/        # CartContext — estado global do carrinho
  hooks/          # useCart
  data/           # produtos.js — catálogo, categorias e link de WhatsApp
  lib/            # funções utilitárias
public/
  img/            # imagens dos produtos e do site
  videos/         # vídeo de fundo do Hero
  opengraph-image.jpg  # imagem de preview de link
```

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Build de produção

```bash
npm run build
npm run start
```

## Editando o catálogo

Produtos, categorias, preços e o número de WhatsApp ficam centralizados em `src/data/produtos.js`. Não é necessário mexer em nenhum componente para adicionar, remover ou editar um produto.

## Deploy

Hospedado na [Vercel](https://vercel.com). Push na branch principal já dispara o deploy automático — não requer variáveis de ambiente.

Domínio: `daliciasdagaby.vercel.app`
