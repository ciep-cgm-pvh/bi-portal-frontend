import Router from './routes/Router';
import { cacheExchange, createClient, fetchExchange, Provider } from 'urql';

const urls = {
  local: 'http://localhost:3000/graphql',
  localNetwork: 'http://10.148.2.210:3000/graphql',
  production: 'https://bi-portal-api.vercel.app/graphql',
  // Corrigido: Adicionado '/graphql' ao final da URL
  developer: 'https://bi-portal-api-clara.vercel.app/graphql', 
};

// Crie o cliente, apontando para a URL do seu backend GraphQL
const client = createClient({
  url: import.meta.env.VITE_ENV === 'PRODUCTION' ? urls.production : urls.local,
  exchanges: [
    cacheExchange, // Primeiro, tenta responder do cache
    fetchExchange, // Depois, envia a requisição pela rede
  ],
});

function App() {
  return (
    <>
      <Provider value={client}>
        <Router />
      </Provider>
    </>
  );
}

export default App;
