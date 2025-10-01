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

const getApiUrl = (): string => {
  const nodeEnv = process.env.NODE_ENV;

  switch (nodeEnv) {
    case 'PRODUCTION':
      console.log('Ambiente: Produção. Conectando à API principal.');
      return urls.production;
    
    case 'DEVELOPER':
      console.log('Ambiente: Desenvolvimento. Conectando à API de dev.');
      return urls.developer;

    default:
      // Padrão para qualquer outro caso (ex: 'development' local)
      console.log('Ambiente: Local. Conectando à API local.');
      return urls.local; // Usar 'urls.localNetwork' se precisar testar em outros dispositivos na mesma rede
  }
};

// Crie o cliente, apontando para a URL correta do seu backend GraphQL
export const client = createClient({
  url: getApiUrl(),
  exchanges: [
    cacheExchange, // Primeiro, tenta responder do cache
    fetchExchange, // Depois, envia a requisição pela rede
  ],
});
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider value={client}>
      <App />
      <Analytics />
    </Provider>
  </BrowserRouter>,
)
