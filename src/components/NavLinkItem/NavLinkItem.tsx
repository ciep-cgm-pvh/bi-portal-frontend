import { NavLink } from 'react-router-dom';

interface NavLinkItemProps {
  path: string;
  title: string;
  icon: React.ReactNode;
  isMenuOpen: boolean;
  published?: boolean;
}
export const NavLinkItem = ({path, title, icon, isMenuOpen, published}:NavLinkItemProps) => {

  const isActive = window.location.pathname === path;
  console.log(published);
  
  if (!published) {
    return (
      <div
        className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg font-medium text-left
                    text-gray-400 cursor-not-allowed  // Estilos de desabilitado
                    ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
        title={`${title} (Em breve)`} // Tooltip para acessibilidade
      >
      <>
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <span>{title}</span>
          
        </div>
        {/* Ícone indicando que está em construção */}
        {/* <Wrench size={16} className="text-yellow-500" /> */}
        <span className={'text-sm text-black bg-yellow-400 rounded-xl p-1'}>Em breve</span>
      </>
      </div>
    );
  }
  
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all 
        ${isMenuOpen ? 'opacity-100' : 'opacity-0'} 
        ${isActive ? "scale-y-110 bg-official-blue-active text-official-yellow font-bold" : "font-medium"}
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