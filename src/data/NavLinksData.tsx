// src/data/navLinks.tsx
import { BarChart2, Database, House, LayoutGrid } from "lucide-react";
import type { NavLinkInterface } from "../interfaces/navLinksInterface";
import Dashboard from '../pages/Dashboard/Dashboard';
import DataSource from '../pages/DataSource/DataSource';
import Home from '../pages/Home/Home';
import HubPage from '../pages/Hub/Hub';

const navLinks: NavLinkInterface[] = [
  {
    title: "Início",
    path: "/home",
    icon: <House size={18} />,
    element: <Home />,
  },
  {
    title: "Painel (BI)",
    path: "/dashboard",
    icon: <BarChart2 size={18} />,
    element: <Dashboard />,
  },
  {
    title: "Acesso a Dados",
    path: "/datasource",
    icon: <Database size={18} />,
    element: <DataSource />,
  },
  {
    title: "Hub",
    path: "/hub",
    icon: <LayoutGrid size={18} />,
    element: <HubPage />,
  },
];
export default function getNavLinks() {
  return navLinks;
}
