// components/EmConstrucao.tsx

import { Wrench } from 'lucide-react';

export const InDevelopment = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <div className={`flex flex-col items-center justify-center h-full w-full ${isMobile ? 'p-4' : 'p-12'}`}>
      <div className="bg-yellow-400 text-slate-900 p-6 rounded-xl shadow-lg flex flex-col items-center gap-4 max-w-xl w-full text-center">
        <Wrench size={isMobile ? 48 : 64} className="animate-pulse" />
        <h1 className="text-2xl font-bold">Página em Construção</h1>
        <p className="text-base font-medium">
          Estamos trabalhando para disponibilizar este conteúdo em breve. Por favor, volte mais tarde!
        </p>
      </div>
    </div>
  );
};
