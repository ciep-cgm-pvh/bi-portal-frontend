import { ArrowLeftIcon } from 'lucide-react';

const Logo = ({ src, alt, className }: { src: string; alt: string; className?: string }) => (
  <img src={src} alt={alt} className={className} />
);

const Header = ({ title, description, lastUpdate, onBackToHub }: { title: string; description: string; lastUpdate?: string; onBackToHub: () => void }) => {
  return (
    <header className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4 mb-6">
      {/* Lado Esquerdo: Logos e Título */}
      <div className="flex items-center gap-4">
        <a href="http://cgm.portovelho.ro.gov.br/" className="shrink-0" target="_blank" rel="noopener noreferrer">
          {/* Logo Desktop */}
          <Logo
            src="/logo cgm - cidade de porto velho.svg"
            alt="Logo CGM - Cidade de Porto Velho"
            className="hidden md:block h-16 w-auto"
          />
          {/* Logo Mobile */}
          <Logo
            src="/logo - escudo - cidade de porto velho.svg"
            alt="Brasão Cidade de Porto Velho"
            className="block md:hidden h-14 w-auto"
          />
        </a>
        <div className="text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-500">
            {description}
            {lastUpdate && (
              <span className="block text-xs text-red-600 font-bold mt-1">
                (Última atualização: {lastUpdate})
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Lado Direito: Botão de Voltar */}
      <div className="w-full md:w-auto flex justify-end">
        <button
          onClick={onBackToHub}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 flex items-center shrink-0"
        >
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          <span>Voltar ao Hub</span>
        </button>
      </div>
    </header>
  );
};

export default Header;