# v2.0.0 — Nova versão do Varejão

Principais mudanças:

- Categorias em duas linhas sincronizadas: ícone isolado em cima e nome abaixo, alinhados por coluna.
- Botão “Adicionar” virou ícone de carrinho dentro do card, sem overflow.
- Seletor de tipo de fruta ao lado do título do card, com visual profissional.
- Responsividade corrigida: grid minmax + contenção de overflow; app com overflow hidden.
- Imagens com aspect-ratio (1:1 produtos, 4:3 ofertas), lazy-loading, dimensões e fallback inteligente de extensão (png→jpg→jpeg).
- Safe-area e bottom-nav recuada; ajustes de header/padding.

Como publicar (GitHub Pages):

1. Vá em Settings → Pages e selecione “Deploy from a branch” → “GitHub Actions”.
2. O workflow `.github/workflows/pages.yml` já envia `public/` com `clean/` e `img/` sempre que fizer um push no `main`.
3. A URL final aparecerá na aba “Actions” ou em Settings → Pages.

Como rodar localmente:

- `npm start` (servidor Express) e acesse `http://localhost:3000/clean/`.
- Para evitar cache: `http://localhost:3000/clean/?reset=1&v=<timestamp>`.

Dicas de imagens:

- Produtos (cards 1:1): 800x800 px, PNG recomendado.
- Ofertas (4:3): 1200x900 px.
- Nomes de arquivos esperados: `morango.png`, `maca-gala.png`, `banana-nanica.png`, `banana-prata.png`, `tomate-italiano.png` (ou jpg/jpeg), `cenoura.jpg`, `brocolis-ninja.jpg`.
