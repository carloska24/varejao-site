# Varejão (Clean)

App single-page minimalista com UX de nível profissional para produtos e Ofertas Relâmpago.

## Rodando

1. Instale dependências na raiz do projeto (se ainda não):
   ```powershell
   npm install
   npm start
   ```
2. Acesse no navegador:
   - Início: http://localhost:3000/clean/
   - Ofertas: http://localhost:3000/clean/#ofertas
   - Reset de estado (carrinho + ofertas): http://localhost:3000/clean/?reset=1

## Recursos

- Navegação SPA leve (Início, Categorias, Ofertas, Receitas, Perfil)
- Cards de produto com:
  - Badge de desconto quando houver oferta ativa
  - Preços De/Por quando em promoção
  - Controle de quantidade e botão “Adicionar” direto no card
  - Modal com ajuste de quantidade e add ao carrinho
- Carrinho persistente (localStorage) com painel lateral, quantidades e totalização
- Ofertas Relâmpago premium:
  - Estoque real e persistência das ofertas (localStorage)
  - CTA “Garantir agora” com preço promocional e decremento de estoque
  - Estados URGENTE/ACELERE/ATIVO/ENCERRADA e barra de estoque
  - Contador em tempo real sincronizado
- Métricas locais (demo): views de ofertas, cliques no CTA, adições promo/regular, clique no sino
- Toasts e microfeedbacks

## Dicas

- Use `?reset=1` para restaurar ofertas e carrinho ao estado inicial.
- Itens adicionados por oferta têm sufixo `:deal` no id e rótulo “(Oferta)”.
- Quando o estoque zera ou o tempo acaba, o CTA é desabilitado automaticamente.

## Próximos passos (sugestões)

- Persistir métricas em backend/analytics
- Página de receitas real (conteúdo + SEO)
- Busca e filtros avançados
- Autenticação e histórico de pedidos
