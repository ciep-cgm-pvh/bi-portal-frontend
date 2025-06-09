// routes/Router.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import getNavLinks from "../data/NavLinksData";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

function Router() {
  const navLinks = getNavLinks();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />

        {navLinks.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;