# BI Portal – Frontend

Este repositório contém o frontend do projeto **BI Portal**, uma plataforma web de visualização de dados da Prefeitura de Porto Velho, com foco em transparência, cruzamento de informações e navegação intuitiva.

## 📌 Stack Principal

- [Vite](https://vitejs.dev/) + [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/) (UI components)
- [Recharts](https://recharts.org/) ou [D3.js](https://d3js.org/) (para gráficos)
- [Framer Motion](https://www.framer.com/motion/) (animações)

## 🚧 Estrutura Prevista

- `src/components`: Componentes reutilizáveis de UI
- `src/pages`: Cada painel ou rota individual (Ex: `/painel/diarias`)
- `src/layout`: Sidebar, Navbar e estrutura visual principal
- `src/services`: Conexão com API
- `src/assets`: Logos, ícones e imagens

## 🔗 Rotas Planejadas

- `/`: Home com cards dos painéis disponíveis
- `/painel/diarias`
- `/painel/emendas`
- `/painel/servidores`
- `/painel/licitacoes`
- Outros painéis conforme evolução

## 📦 Instalação

```bash

npm install
npm run dev
