import { NavLink } from 'react-router-dom';

interface NavLinkItemProps {
  path: string;
  title: string;
  icon: React.ReactNode;
  isMenuOpen: boolean; // Esta prop é para a animação do sidebar, não afetará a navbar
  published?: boolean;
}
export const NavLinkItem = ({path, title, icon, isMenuOpen, published}:NavLinkItemProps) => {

  if (!published) {
    // Nenhuma alteração necessária na lógica de "Em breve"
    return (
      <div
        className={`flex items-center justify-between gap-3 px-3 py-2 rounded-lg font-medium text-left
                    text-gray-400 cursor-not-allowed
                    ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
        title={`${title} (Em breve)`}
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{icon}</span>
          <span>{title}</span>
        </div>
        <span className={'text-sm text-black bg-yellow-400 rounded-xl p-1'}>Em breve</span>
      </div>
    );
  }
  
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all 
        ${isMenuOpen ? 'opacity-100' : 'opacity-0'} 
        ${
          isActive
            // CORREÇÃO: Usar text-white para o estado ativo para funcionar em ambos os fundos
            ? "bg-official-blue-active text-white font-bold" 
            : "font-medium"
        }
        hover:bg-official-yellow 
        hover:text-official-black`
      }
    >
      <span className="text-xl">{icon}</span>
      {/* Remove a animação de scale do texto que não é mais necessária */}
      <span>{title}</span>
    </NavLink>
  );
}