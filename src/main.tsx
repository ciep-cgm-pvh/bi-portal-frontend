import { Analytics } from '@vercel/analytics/react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { cacheExchange, createClient, fetchExchange, Provider } from 'urql';
import App from './App.tsx';
import './styles/index.css';

const urls = {
  local: 'http://localhost:3000/graphql',
  localNetwork: 'http://10.148.2.210:3000/graphql',
  production: 'https://bi-portal-api.vercel.app/graphql',
  // Corrigido: Adicionado '/graphql' ao final da URL
  developer: 'https://bi-portal-api-clara.vercel.app/graphql', 
};

if (import.meta.env.MODE === "production") {
  document.title = "Painéis CGM";
} else {
  document.title = "Developer - Painéis CGM";
}

// Crie o cliente, apontando para a URL do seu backend GraphQL
const client = createClient({
  url: process.env.NODE_ENV === 'PRODUCTION' ? urls.production : urls.developer,
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
