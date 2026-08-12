import { Analytics } from '@vercel/analytics/react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { cacheExchange, createClient, fetchExchange, Provider } from 'urql';
import App from './App.tsx';
import './styles/index.css';

const urls = {
  local: 'http://localhost:3333/graphql',
  localNetwork: 'http://10.148.2.210:3000/graphql',
  production: 'https://bi-portal-api.vercel.app/graphql',
  // Corrigido: Adicionado '/graphql' ao final da URL
  developer: 'https://bi-portal-api-clara.vercel.app/graphql',
};

if (import.meta.env.VITE_ENV === "PRODUCTION") {
  document.title = "Painéis CGM";
} else {
  document.title = "Developer - Painéis CGM";
}

// VITE_API_URL sobrescreve a escolha por ambiente — usado para apontar
// o front para uma API rodando localmente. Sem ela, nada muda.
const apiUrl =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.VITE_ENV === 'PRODUCTION' ? urls.production : urls.developer);

// Crie o cliente, apontando para a URL do seu backend GraphQL
const client = createClient({
  url: apiUrl,
  exchanges: [
    cacheExchange,
    fetchExchange,
  ],
  // ADICIONE ESTA OPÇÃO ABAIXO
  fetchOptions: {
    credentials: 'include', // ou 'same-origin' se preferir
  },
});
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider value={client}>
      <App />
      <Analytics />
    </Provider>
  </BrowserRouter>,
)
