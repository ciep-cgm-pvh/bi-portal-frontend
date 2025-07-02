// src/data/navLinks.tsx
import { BarChart2, Database, House } from "lucide-react";
import type { NavLinkInterface } from "../interfaces/navLinksInterface";
import Dashboard from '../pages/panels/Manutencao/Dashboard/Dashboard';
import DataSource from '../pages/panels/Manutencao/DataSource/DataSource';
import Home from '../pages/panels/Manutencao/Home/Home';

import DashboardDiarias from '../pages/panels/Diarias/Dashboard/Dashboard';
import DataSourceDiarias from '../pages/panels/Diarias/DataSource/DataSource';
import HomeDiarias from '../pages/panels/Diarias/Home/Home';

const navLinks: NavLinkInterface[] = [

  // Agrupamento dos painéis
  {
    title: "Início",
    path: "/painel/manutencao/home",
    icon: <House size={18} />,
    element: <Home />,
    group: "manutencao",
  },
  {
    title: "Painel",
    path: "/painel/manutencao/dashboard",
    icon: <BarChart2 size={18} />,
    element: <Dashboard />,
    group: "manutencao",
  },
  {
    title: "Fonte de Dados",
    path: "/painel/manutencao/datasource",
    icon: <Database size={18} />,
    element: <DataSource />,
    group: "manutencao",
  },
  {
    title: "Início",
    path: "/painel/diarias/home",
    icon: <House size={18} />,
    element: <HomeDiarias />,
    group: "diarias",
  },
  {
    title: "Painel",
    path: "/painel/diarias/dashboard",
    icon: <BarChart2 size={18} />,
    element: <DashboardDiarias />,
    group: "diarias",
  },
  {
    title: "Fonte de Dados",
    path: "/painel/diarias/datasource",
    icon: <Database size={18} />,
    element: <DataSourceDiarias />,
    group: "diarias",
  },

];
export default function getNavLinks() {
  return navLinks;
}
