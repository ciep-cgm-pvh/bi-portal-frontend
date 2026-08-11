import { cacheExchange, createClient, fetchExchange, Provider } from 'urql';
import Router from './routes/Router';

const urls = {
  local: 'http://localhost:3333/graphql',
  localNetwork: 'http://10.148.2.210:3000/graphql',
  production: 'https://bi-portal-api.vercel.app/graphql',
  developer: 'https://bi-portal-api-clara.vercel.app/graphql',
};

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
