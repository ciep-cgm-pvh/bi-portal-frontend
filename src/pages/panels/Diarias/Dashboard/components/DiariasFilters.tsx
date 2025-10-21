/* eslint-disable @typescript-eslint/no-explicit-any */
// Em src/pages/panels/Diarias/Dashboard/components/DiariasFilters.tsx

import { useEffect, useState } from 'react';
import FiltersSection from '../../../../../components/FiltersSection/FiltersSection';
import { useFiltersConfig } from '../hooks/useFilterConfig';

interface DiariasFiltersProps {
  initialValues: any;
  onApply: (filters: any) => void;
  onClear: () => void;
  isLoading: boolean; // Recebe o loading principal para desabilitar o botão de aplicar
}

export const DiariasFilters = ({
  initialValues,
  onApply,
  onClear,
  isLoading,
}: DiariasFiltersProps) => {
  const [draftFilters, setDraftFilters] = useState(initialValues);

  // --- MUDANÇAS PRINCIPAIS AQUI ---
  // 1. Chama o hook para buscar as opções dinâmicas com base nos filtros atuais
  const { filterConfig, isLoading: isLoadingConfig } = useFiltersConfig(draftFilters);

  // 2. Sincroniza o estado interno se os valores iniciais mudarem (ex: ao limpar no pai)
  useEffect(() => {
    setDraftFilters(initialValues);
  }, [initialValues]);

  const handleFilterChange = (id: string, value: any) => {
    setDraftFilters((prev: any) => ({ ...prev, [id]: value }));
  };

  const handleApply = () => {
    onApply(draftFilters);
  };

  // Combina o loading das opções com o loading principal
  const isComponentLoading = isLoading || isLoadingConfig;

  if (isComponentLoading && filterConfig.every(f => !f.options || f.options.length === 0)) {
    return (
      <div className='inline-flex items-center justify-center w-full bg-white p-4 md:p-6 rounded-lg shadow-md mb-6'>
        {/* Animação de Loading */}
        <svg className="mr-3 -ml-1 size-5 animate-spin text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        Carregando filtros...
      </div>
    );
  }

  return (
    <FiltersSection
      config={filterConfig}
      values={draftFilters}
      onChange={handleFilterChange}
      onApply={handleApply}
      onClear={onClear}
    />
  );
};