import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/index.css'
import { BrowserRouter } from 'react-router-dom'
import { createClient, Provider } from 'urql';



// Crie o cliente, apontando para a URL do seu backend GraphQL
const client = createClient({
  url: 'http://localhost:3000/graphql',
  exchanges: []
});

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider value={client}>
      <App />
    </Provider>
  </BrowserRouter>,
)
