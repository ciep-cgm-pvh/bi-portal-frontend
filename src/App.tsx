import Router from './routes/Router';
import { cacheExchange, createClient, fetchExchange, Provider } from 'urql';


// Crie o cliente, apontando para a URL do seu backend GraphQL
const client = createClient({
  url: 'http://localhost:3000/graphql',
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
