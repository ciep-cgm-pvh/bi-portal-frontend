import { cacheExchange, createClient, fetchExchange, Provider } from 'urql';
import Router from './routes/Router';

const urls = {
  local: 'http://localhost:3000/graphql',
  localNetwork: 'http://10.148.2.210:3000/graphql',
  production: 'https://bi-portal-api.vercel.app/graphql',
  // Corrigido: Adicionado '/graphql' ao final da URL
  developer: 'https://bi-portal-api-clara.vercel.app/graphql', 
};

const urls = {
  local: 'http://localhost:3000/graphql',
  localNetwork: 'http://10.148.2.210:3000/graphql',
  production: 'https://bi-portal-api.vercel.app/graphql',
  // Corrigido: Adicionado '/graphql' ao final da URL
  developer: 'https://bi-portal-api-clara.vercel.app/graphql', 
};

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
