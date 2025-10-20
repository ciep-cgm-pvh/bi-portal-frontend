import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { cacheExchange, createClient, fetchExchange, Provider } from 'urql';
import App from './App.tsx';
import './styles/index.css';

const urls ={
  local: 'http://localhost:3000/graphql',
  localNetwork: 'http://10.148.2.210:3000/graphql',
  production: 'https://bi-portal-api.vercel.app/graphql' 
}

// Crie o cliente, apontando para a URL do seu backend GraphQL
const client = createClient({
  url: process.env.NODE_ENV === 'PRODUCTION' ? urls.production : urls.local,
  exchanges: [
    cacheExchange, // Primeiro, tenta responder do cache
    fetchExchange, // Depois, envia a requisição pela rede
  ],
});

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider value={client}>
      <App />
    </Provider>
  </BrowserRouter>,
)
