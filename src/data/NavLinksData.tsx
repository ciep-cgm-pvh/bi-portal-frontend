// src/data/navLinks.tsx
import { BarChart2, Database, FileText } from "lucide-react";
import type { NavLinkInterface } from "../interfaces/navLinksInterface";
import Dashboard from "../pages/Dashboard";
import DataSource from "../pages/DataSource";
import Reports from "../pages/Reports";
import Home from "../pages/Home";
export const navLinks: NavLinkInterface[] = [
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
  {
    title: "Home",
    path: "/home",
    icon: <FileText size={18} />,
    element: <Home />,
  },
];
export default function getNavLinks() {
  return navLinks;
}
