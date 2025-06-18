import { useLocation } from 'react-router-dom';
import getNavLinks from '../../data/NavLinksData';
import { NavLinkItem } from "../NavLinkItem/NavLinkItem";

export function SideBarNav({ isOpen }: { isOpen: boolean }) {
  const location = useLocation();
  const navLinksData = getNavLinks();

  // Extrair o grupo do pathname
  const match = location.pathname.match(/^\/painel\/([^/]+)/);
  const currentGroup = match?.[1] || null;

  // Filtrar links por grupo, se aplicável
  const filteredLinks = currentGroup
    ? navLinksData.filter(link => link.group === currentGroup)
    : navLinksData.filter(link => !link.group); // ex: links como "Hub" ou "Início" global

  return (
    <nav className={`flex flex-col flex-grow gap-2 p-4 ${isOpen ? "text-white" : ""}`}>
      {filteredLinks.map((link) => (
        <NavLinkItem key={link.path} {...link} isMenuOpen={isOpen} />
      ))}
    </nav>
  );
}