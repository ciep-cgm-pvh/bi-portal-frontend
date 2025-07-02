import { Menu, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import getNavLinks from "../../data/NavLinksData";
import type { NavLinkInterface } from "../../interfaces/navLinksInterface";

export default function NavBarMobile({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const location = useLocation();
  const navLinksData: NavLinkInterface[] = getNavLinks();

  // Extrair o grupo do pathname
  const match = location.pathname.match(/^\/painel\/([^/]+)/);
  const currentGroup = match?.[1] || null;

  // Filtrar links por grupo, se aplicável
  const filteredLinks = currentGroup
    ? navLinksData.filter(link => link.group === currentGroup)
    : navLinksData.filter(link => !link.group); // ex: links como "Hub" ou "Início" global
  return (
    <nav className="fixed-top-0 left-0 z-50 bg-official-blue text-white p-3 w-full shadow-lg">
      {/* Topo com título e botão */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Menu</h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl transition-all duration-500 ease-in-out"
        >
          {isOpen ? <X /> : <Menu />}{" "}
        </button>
      </div>

      {/* Menu suspenso */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <ul className="mt-4 space-y-2">
          {filteredLinks.map((link: NavLinkInterface) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 transition duration-500 ease-in-out rounded
                  ${
                    isActive
                      ? "bg-official-blue-active text-white font-bold"
                      : "hover:bg-official-yellow hover:text-black font-bold"
                  }`
                }
              >
                {link.icon}
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
