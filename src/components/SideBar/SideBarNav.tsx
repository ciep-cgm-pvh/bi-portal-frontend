import getNavLinks from '../../data/NavLinksData';
import { NavLinkItem } from "../NavLinkItem/NavLinkItem";

const navLinksData = getNavLinks();
export function SideBarNav({isOpen}: {isOpen: boolean}) {
  return (<>
    {/* NavLinks */}
    <nav className={`flex flex-col flex-grow gap-2 p-4 ${isOpen ? "text-white" : ""}`}>
        {navLinksData.map((link) => (
          <NavLinkItem key={link.path} {...link} isMenuOpen={isOpen} />
        ))}
    </nav>
  </>)
}
