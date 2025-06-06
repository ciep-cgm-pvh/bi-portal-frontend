// src/data/navLinks.tsx
import { BarChart2, Database, FileText } from "lucide-react";
import type { NavLinkInterface } from "../interfaces/navLinksInterface";
export const navLinks: NavLinkInterface[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <BarChart2 size={18} />,
  },
  {
    title: "Data Source",
    path: "/datasource",
    icon: <Database size={18} />,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: <FileText size={18} />,
  },
];
export default function getNavLinks() {
  return navLinks;
}
