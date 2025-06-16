import { navLinks as navLinksData } from "../../data/NavLinksData";
import { NavLinkItem } from "../NavLinkItem/NavLinkItem";


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
