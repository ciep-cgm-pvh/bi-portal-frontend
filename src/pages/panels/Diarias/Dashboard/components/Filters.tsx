import { useState } from 'react';

import { filterConfiguration, initialFilterValues } from '../data/filters.config';
import FiltersSection from '../../../../../components/FiltersSection/FiltersSection';
import type { DateRangeValue } from '../../../../../types/filters';

export const Filters = () => {
  const [filterValues, setFilterValues] = useState(initialFilterValues);
  
  const handleFilterChange = (id: string, value: string | number | DateRangeValue) => {
    setFilterValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleApplyFilters = () => {
    // Aqui você pegaria os `filterValues` e faria a chamada para a API GraphQL
    alert('Filtros aplicados! Veja o console.');
  };

  const handleClearFilters = () => {
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