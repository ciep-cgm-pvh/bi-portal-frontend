// src/data/navLinks.tsx
import { BarChart2, Database, House } from "lucide-react";
import type { NavLinkInterface } from "../interfaces/navLinksInterface";

import Dashboard from '../pages/panels/Manutencao/Dashboard/Dashboard';
import DataSource from '../pages/panels/Manutencao/DataSource/DataSource';
import Home from '../pages/panels/Manutencao/Home/Home';

import DashboardAbastecimento from '../pages/panels/Combustivel/Dashboard';
import HomeAbastecimento from '../pages/panels/Combustivel/Home/Home';

import DataSourceCombustivel from '../pages/panels/Combustivel/DataSoruce';
import DashboardDiarias from '../pages/panels/Diarias/Dashboard';
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
  {
    title: "Início",
    path: "/painel/abastecimento/home",
    icon: <House size={18} />,
    element: <HomeAbastecimento />,
    group: "abastecimento",
  },
  {
    title: "Painel",
    path: "/painel/abastecimento/dashboard",
    icon: <BarChart2 size={18} />,
    element: <DashboardAbastecimento />,
    group: "abastecimento",
  },
  {
    title: "Fonte de Dados",
    path: "/painel/abastecimento/datasource",
    icon: <Database size={18} />,
    element: <DataSourceCombustivel />,
    group: "abastecimento",
  }

];
export default function getNavLinks() {
  return navLinks;
}
