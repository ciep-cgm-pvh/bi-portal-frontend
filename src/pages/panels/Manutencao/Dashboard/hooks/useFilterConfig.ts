// src/pages/DashboardManutencao/hooks/useFiltersConfig.ts

import { useMemo } from 'react';
import { useQuery } from 'urql';
import type { FilterConfig } from '../../../../../types/filters';
import { baseFilterConfig } from '../data/filters.config';

const GET_FILTER_OPTIONS_QUERY = `
  query GetFilterOptions($filters: ManutencaoFiltersOptionsInput) {
   departmentOptions(filters: $filters) { value, label }
   vehiclePlateOptions(filters: $filters) { value, label }
   vehicleModelOptions(filters: $filters) { value, label }
   gasStationCityOptions(filters: $filters) { value, label }
   gasStationNameOptions(filters: $filters) { value, label }
 }
`;

export const useFiltersConfig = (activeFilters: Record<string, any>) => {
  console.log('%c[HOOK-FILTERS] 3. Hook de filtros recebeu filtros ativos:', 'color: purple; font-weight: bold;', activeFilters);

  // 👇 INÍCIO DA CORREÇÃO 👇
  const filtersForOptionsQuery = useMemo(() => {
    // Cria uma cópia para não modificar o estado original
    const cleanedFilters = { ...activeFilters };

    // Remove as chaves que não fazem parte do tipo ManutencaoFiltersOptionsInput
    delete cleanedFilters.startDate;
    delete cleanedFilters.endDate;

    return cleanedFilters;
  }, [ activeFilters ]);
  // 👆 FIM DA CORREÇÃO 👆
  // 2. Use os filtros ativos como variáveis na query
  const [ result ] = useQuery({
    query: GET_FILTER_OPTIONS_QUERY,
    // 2. Passe os filtros ativos como variáveis para a query
    variables: { filters: filtersForOptionsQuery }
  });
  const { data, fetching: isLoading, error } = result;

  const finalFilterConfig = useMemo((): FilterConfig[] => {
    let config = [ ...baseFilterConfig ];

    if (data) {
      config = config.map(filter => {
        switch (filter.id) {
          case 'department':
            return { ...filter, options: data.departmentOptions };
          case 'vehiclePlate':
            return { ...filter, options: data.vehiclePlateOptions };
          case 'vehicleModel':
            return { ...filter, options: data.vehicleModelOptions };
          case 'gasStationCity':
            return { ...filter, options: data.gasStationCityOptions };
          case 'gasStationName':
            return { ...filter, options: data.gasStationNameOptions };
          default:
            return filter;
        }
      });
    }

    return config;
    // 3. Adicione `activeFilters` como dependência do useMemo
  }, [ data, activeFilters ]);

  return {
    filterConfig: finalFilterConfig,
    isLoading,
    error,
  };
};