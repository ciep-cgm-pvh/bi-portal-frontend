import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import getNavLinks from './data/NavLinksData';

function App() {
  const navLinks = getNavLinks();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />

        {/* Rotas geradas dinamicamente */}
        {navLinks.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        {/* Leva o usuário a página not found caso a rota não exista */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
