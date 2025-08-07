import { Link } from 'react-router-dom';
import type { ActionLink, HomePanelTemplateProps } from '../types/home';

// Função auxiliar para estilizar os botões de acordo com a variante
const getButtonStyles = (variant: ActionLink['variant']) => {
  const baseStyles = 'flex items-center justify-center gap-2 font-medium px-5 py-2.5 rounded-lg shadow-md transition-transform transform hover:scale-105';
  
  const variants = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
  };

  return `${baseStyles} ${variants[variant]}`;
};

export const HomePanelTemplate = ({
  icon,
  title,
  subtitle,
  description,
  actionLinks,
}: HomePanelTemplateProps) => {
  return (
    // Container principal para centralizar o conteúdo na tela
    <div className="flex w-full items-center justify-center p-4">
      <div className="bg-white text-gray-800 rounded-xl shadow-2xl p-8 max-w-4xl w-full flex flex-col items-center gap-5 text-center">
        
        {/* Ícone Principal */}
        <div className="text-blue-600">
          {icon}
        </div>

        {/* Título e Subtítulo */}
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
        </div>

        {/* Descrição */}
        <div className="w-full max-w-3xl bg-gray-50 border border-gray-200 rounded-lg p-4 mt-2">
          <p className="text-base md:text-lg text-gray-700">{description}</p>
        </div>
        
        {/* Links de Ação */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 w-full">
          {actionLinks.map((link) => (
            <Link key={link.path} to={link.path} className={getButtonStyles(link.variant)}>
              {link.icon}
              {link.text}
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};