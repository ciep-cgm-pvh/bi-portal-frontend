import { Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import getNavLinks from "../../data/NavLinksData";
import type { NavLinkInterface } from "../../interfaces/navLinksInterface";
// 1. Importe o componente NavLinkItem
import { getPanelInfo } from '../../utils/getPanelTitle';
import { NavLinkItem } from "../NavLinkItem/NavLinkItem";

export default function NavBarMobile({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const location = useLocation();
  const navLinksData: NavLinkInterface[] = getNavLinks();

  const match = location.pathname.match(/^\/painel\/([^/]+)/);
  const currentGroup = match?.[1] || null;
  const { title, icon } = getPanelInfo(currentGroup);

  const filteredLinks = currentGroup
    ? navLinksData.filter(link => link.group === currentGroup)
    : navLinksData.filter(link => !link.group);

  return (
    // A estilização do contêiner principal permanece a mesma
    <nav className="fixed-top-0 left-0 z-50 bg-official-blue text-white p-3 w-full shadow-lg">
      <div className="flex justify-between items-center">
      <h1 className="flex items-center gap-3 text-2xl font-bold text-white">
        {icon} {/* O ícone será renderizado aqui */}
        <span>{title}</span> {/* O texto do título aqui */}
      </h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-2xl transition-all duration-500 ease-in-out"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <ul className="mt-4 space-y-2">
          {filteredLinks.map((link: NavLinkInterface) => (
            // 2. Substitua o <li> e <NavLink> pelo NavLinkItem
            <NavLinkItem
              key={link.path}
              path={link.path}
              title={link.title}
              icon={link.icon}
              published={link.published}
              // 3. Passe `isMenuOpen` como true para garantir que a opacidade seja 1
              isMenuOpen={true} 
            />
          ))}
        </ul>
      </div>
    </nav>
  );
}