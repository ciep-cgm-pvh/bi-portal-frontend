import { useState } from 'react';

import { filterConfiguration, initialFilterValues } from '../data/filters.config';
import FiltersSection from '../../../../../components/FiltersSection/FiltersSection';

export const SupplyFilters = () => {
  const [filterValues, setFilterValues] = useState(initialFilterValues);
  
  const handleFilterChange = (id: string, value: string | number) => {
    console.log(`Filtro '${id}' alterado para:`, value);
    setFilterValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleApplyFilters = () => {
    // Aqui você pegaria os `filterValues` e faria a chamada para a API GraphQL
    console.log('Aplicando filtros:', filterValues);
    alert('Filtros aplicados! Veja o console.');
  };

  const handleClearFilters = () => {
    console.log('Limpando filtros');
    setFilterValues(initialFilterValues);
    // Opcional: pode também chamar onApply() para buscar os dados sem filtros
  };

  return (
    <FiltersSection
      config={filterConfiguration}
      values={filterValues}
      onChange={handleFilterChange}
      onApply={handleApplyFilters}
      onClear={handleClearFilters}
    />
  );
};