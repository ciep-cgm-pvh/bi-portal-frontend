// src/data/navLinks.tsx
import { BarChart2, Database, FileText, House } from "lucide-react";
import type { NavLinkInterface } from "../interfaces/navLinksInterface";
import Dashboard from '../pages/Dashboard/Dashboard';
import DataSource from '../pages/DataSource/DataSource';
import Home from '../pages/Home/Home';
import Reports from '../pages/Reports/Reports';

export const navLinks: NavLinkInterface[] = [
  {
    title: "Home",
    path: "/home",
    icon: <House size={18} />,
    element: <Home />,
  },
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <BarChart2 size={18} />,
    element: <Dashboard />,
  },
  {
    title: "Data Source",
    path: "/datasource",
    icon: <Database size={18} />,
    element: <DataSource />,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: <FileText size={18} />,
    element: <Reports />,
  },
];
export default function getNavLinks() {
  return navLinks;
}
