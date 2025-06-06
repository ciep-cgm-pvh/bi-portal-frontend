import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import DataSource from './pages/DataSource';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/datasource" element={<DataSource />} />
        <Route path="/reports" element={<Reports />} />
        {/* Leva o usuário a página not found caso a rota não exista */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
