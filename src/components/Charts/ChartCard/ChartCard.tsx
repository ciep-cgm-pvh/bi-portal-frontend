import { BarChart, PieChart } from 'lucide-react'; // Ícones genéricos
import type { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  children: ReactNode;
  isLoading?: boolean;
  hasData: boolean;
}

export const ChartCard = ({ title, children, isLoading = false, hasData }: ChartCardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col h-[400px]">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">{title}</h3>
      <div className="flex-grow w-full h-full">
        {isLoading ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <BarChart className="animate-pulse h-8 w-8" />
            <span className="ml-2">Carregando dados...</span>
          </div>
        ) : hasData ? (
          children
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <PieChart className="h-8 w-8" />
            <span className="ml-2">Sem dados para exibir.</span>
          </div>
        )}
      </div>
    </div>
  );
};