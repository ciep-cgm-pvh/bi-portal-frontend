// routes/Router.tsx
import { Navigate, Route, Routes } from "react-router-dom";
import getNavLinks from "../data/NavLinksData";
import LayoutBase from '../layouts/LayoutBase';
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

function Router() {
  const navLinks = getNavLinks();

  return (
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />

        <Route element={<LayoutBase />}>
          {navLinks.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>

        <Route path="/*" element={<NotFound />} />
      </Routes>
  );
}

export default Router;