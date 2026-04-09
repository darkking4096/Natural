# 🌿 CuraNatura Store

Bem-vindo à **CuraNatura**, uma loja online premium de produtos naturais e bem-estar orgânico. Este projeto foi desenvolvido para oferecer uma experiência de compra fluida, visualmente deslumbrante e otimizada para performance.

## 🚀 Tecnologias (The Stack)

Este projeto utiliza tecnologias de ponta, configuradas especificamente para garantir compatibilidade e velocidade:

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 5.4.15](https://vitejs.dev/) (Versão otimizada para compatibilidade com Node 20.12+)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **PostCSS:** Integrado com `@tailwindcss/postcss` para processamento de estilos.
- **Ícones:** SVG nativo e herança visual do `visual-design-squad`.

---

## 🎨 Sistema de Design (Design System)

Diferente de versões anteriores, o **Tailwind CSS v4** neste projeto é configurado no modo **CSS-native**.

### Como atualizar o Tema (Cores, Fontes, Sombras)
Todos os tokens de design (cores customizadas, espaçamentos, bordas) estão definidos no arquivo:
`src/index.css`

Eles residem dentro do bloco `@theme`. Para adicionar uma nova cor corporativa, basta incluir uma variável CSS lá:
```css
@theme {
  --color-brand-new: #ff0000; /* Exemplo: bg-brand-new ou text-brand-new */
}
```

### Paleta de Cores Atual
- `primary`: Verde Esmeralda (Saúde e Natureza)
- `secondary`: Terracota/Argila (Botões de Ação)
- `surface-secondary`: Off-white Quente (Fundo da página)
- `glass`: Utilitário de efeito vidro (blur) para Navbar e Cart.

---

## 🛠️ Arquitetura e Funcionalidades

### 🛒 Sistema de Carrinho
A lógica do carrinho está centralizada no `App.jsx` usando o hook `useState`. 
- **Estado:** O array `cart` armazena objetos de produto com ID, nome, preço e quantidade.
- **Interação:** O componente **Cart Drawer** abre automaticamente ao adicionar itens, permitindo gerenciamento rápido.

### 📦 Estrutura de Pastas
- `/src/App.jsx`: Componente principal contendo a interface e lógica de estado.
- `/src/index.css`: Arquivo central de estilos e definições do Tailwind v4.
- `/public`: Repositório de imagens e ativos estáticos (Hero, Produtos, About).

---

## ✍️ Guia de Expansão (Como adicionar novas features)

### 1. Adicionando um Novo Produto
Abra o arquivo `src/App.jsx` e localize o array `products`. Adicione um novo objeto seguindo este padrão:
```javascript
{
  id: 4,
  name: 'Novo Produto',
  description: 'Descrição elegante do produto.',
  price: 59.90,
  image: '/caminho_da_imagem.png'
}
```

### 2. Criando uma Nova Seção
Recomenda-se criar um novo componente funcional ou adicionar um bloco semântico `<section>` no `App.jsx`. Use as classes utilitárias do Tailwind para manter a consistência visual.

### 3. Alterando Animações
As animações estão definidas via classes utilitárias (ex: `animate-fade-in`, `transition-all`). Se precisar de animações complexas, o projeto está pronto para receber bibliotecas como `framer-motion`.

---

## 💻 Comandos Úteis

### Iniciar Ambiente de Desenvolvimento
```bash
npm run dev
```
*(Opcional: O servidor geralmente roda em http://localhost:5173 ou 5174)*

### Build para Produção
```bash
npm run build
```

### Enviar Alterações para o GitHub
```bash
git add .
git commit -m "feat: descrição da sua nova feature"
git push origin main
```

---

## 📝 Observações Técnicas Importantes
- **Node Version:** O projeto foi testado na versão `20.12.2`. 
- **Tailwind Config:** Não utilize o arquivo `tailwind.config.js` para temas v4; prefira sempre o `index.css` no bloco `@theme`. O arquivo `.bak` é apenas para referência histórica de tokens.

---
*Desenvolvido com carinho para CuraNatura.* 🍀
