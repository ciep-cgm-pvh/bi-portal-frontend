// pages/NotFound.tsx
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const logoEscudo = '../../../logo - escudo - cidade de porto velho.svg';

export default function NotFound() {
  return (
    // Fundo com um gradiente suave
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-4">
      
      {/* Card principal com animação de entrada */}
      <div 
        className="
          w-full max-w-lg bg-white/70 backdrop-blur-sm 
          p-8 sm:p-12 rounded-2xl shadow-2xl border border-gray-200
          transform transition-all duration-500 ease-in-out
          hover:scale-[1.02] hover:shadow-3xl
        "
      >
        <div className="text-center">
          
          {/* Ícone animado */}
          <img src={logoEscudo} className="mx-auto h-32 w-48 text-official-blue animate-pulse-slow mb-6" />

          {/* Título "404" com gradiente */}
          <h1 className="
            text-7xl sm:text-9xl font-black 
            bg-gradient-to-r from-official-blue to-blue-400 
            bg-clip-text text-transparent mb-4
          ">
            404
          </h1>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Oops! Parece que você se perdeu.
          </h2>
          
          <p className="text-gray-600 mb-10 text-base sm:text-lg">
            A página que você procura não foi encontrada. Mas não se preocupe, podemos te guiar de volta ao caminho certo.
          </p>

          <Link
            to="/hub"
            className="
              inline-flex items-center gap-3 px-8 py-4 
              bg-official-blue text-white font-bold rounded-xl 
              shadow-lg hover:shadow-xl 
              transform hover:-translate-y-1 hover:scale-105
              transition-all duration-300 ease-in-out
              focus:outline-none focus:ring-4 focus:ring-blue-300
            "
          >
            <Home size={22} />
            Me Leve de Volta ao Hub
          </Link>

        </div>
      </div>
    </div>
  );
}