// src/data/navLinks.tsx
import { BarChart2, Cloudy, Database, House } from "lucide-react";
import type { NavLinkInterface } from "../interfaces/navLinksInterface";

import DashboardAbastecimento from '../pages/panels/Combustivel/Dashboard';
import DataSourceAbastecimento from '../pages/panels/Combustivel/DataSoruce';
import HomeAbastecimento from '../pages/panels/Combustivel/Home';

import DashboardDiarias from '../pages/panels/Diarias/Dashboard';
import DataSourceDiarias from '../pages/panels/Diarias/DataSoruce';
import HomeDiarias from '../pages/panels/Diarias/Home';

import DashboardManutencao from '../pages/panels/Manutencao/Dashboard';
import DataSourceManutencao from '../pages/panels/Manutencao/DataSoruce';
import HomeManutencao from '../pages/panels/Manutencao/Home';

const navLinks: NavLinkInterface[] = [
  // Painel de Manutenção
  {
    title: "Início",
    path: "/painel/manutencao/home",
    icon: <House size={18} />,
    element: <HomeManutencao />,
    published: true,
    group: "manutencao",
  },
  {
    title: "Painel",
    path: "/painel/manutencao/dashboard",
    icon: <BarChart2 size={18} />,
    element: <DashboardManutencao />,
    published: true,
    group: "manutencao",
  },
  {
    title: "Fonte de Dados",
    path: "/painel/manutencao/datasource",
    icon: <Database size={18} />,
    element: <DataSourceManutencao />,
    published: false,
    group: "manutencao",
  },


  //Painel de Diarias
  {
    title: "Início",
    path: "/painel/diarias/home",
    icon: <House size={18} />,
    element: <HomeDiarias />,
    published: true,
    group: "diarias",
  },
  {
    title: "Painel",
    path: "/painel/diarias/dashboard",
    icon: <BarChart2 size={18} />,
    element: <DashboardDiarias />,
    published: true,
    group: "diarias",
  },
  {
    title: "Fonte de Dados",
    path: "/painel/diarias/datasource",
    icon: <Database size={18} />,
    element: <DataSourceDiarias />,
    published: false,
    group: "diarias",
  },

  //  Painel de Abastecimento
  {
    title: "Início",
    path: "/painel/abastecimento/home",
    icon: <House size={18} />,
    element: <HomeAbastecimento />,
    published: true,
    group: "abastecimento",
  },
  {
    title: "Painel",
    path: "/painel/abastecimento/dashboard",
    icon: <BarChart2 size={18} />,
    element: <DashboardAbastecimento />,
    published: true,
    group: "abastecimento",
  },
  {
    title: "Fonte de Dados",
    path: "/painel/abastecimento/datasource",
    icon: <Database size={18} />,
    element: <DataSourceAbastecimento />,
    published: true,
    group: "abastecimento",
  },
  {
    title: "API Pública",
    path: "/api",
    icon: <Cloudy size={18} />,
    published: false,
    group: "abastecimento",
  }

];
export default function getNavLinks() {
  return navLinks;
}
