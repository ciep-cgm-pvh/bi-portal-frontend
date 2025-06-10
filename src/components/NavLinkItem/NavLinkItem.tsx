import { NavLink } from 'react-router-dom';

interface NavLinkItemProps {
  path: string;
  title: string;
  icon: React.ReactNode;
  isMenuOpen: boolean;
}
export const NavLinkItem = ({path, title, icon, isMenuOpen}:NavLinkItemProps) => {

  const isActive = window.location.pathname === path;
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-left transition-all 
        ${isMenuOpen ? 'opacity-100' : 'opacity-0'} 
        ${isActive ? "scale-y-110 bg-official-blue-active text-official-yellow-active" : ""}
        hover:bg-official-yellow 
        hover:text-official-black`
      }
    >
      <span className="text-xl">{icon}</span>
      <span className={`transition-transform ${isActive ? "scale-105" : "scale-100"}`}>
              {title}
            </span>
    </NavLink>
  );
}