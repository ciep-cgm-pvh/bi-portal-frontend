// src/pages/DashboardCombustivel/hooks/useFiltersConfig.ts
import { useMemo } from 'react';
import { useQuery } from 'urql';
import type { FilterConfig } from '../../../../../types/filters';
import { baseFilterConfig } from '../data/filters.config';
import { GET_COMBUSTIVEL_FILTER_OPTIONS_QUERY } from '../../queries/CombustivelQueries';

export const useFiltersConfig = (activeFilters: Record<string, any>) => {
  const filtersForOptionsQuery = useMemo(() => {
    // Cria uma cópia para não modificar o estado original
    const cleanedFilters = { ...activeFilters };

    // Se houver from/to, agrupe em dateRange
    if (cleanedFilters.from || cleanedFilters.to) {
      cleanedFilters.dateRange = {
        from: cleanedFilters.from,
        to: cleanedFilters.to,
      };
    }

    delete cleanedFilters.from;
    delete cleanedFilters.to;

    return cleanedFilters;
  }, [ activeFilters ]);
  // 2. Use os filtros ativos como variáveis na query
  const [ result ] = useQuery({
    query: GET_COMBUSTIVEL_FILTER_OPTIONS_QUERY,
    // 2. Passe os filtros ativos como variáveis para a query
    variables: { filters: filtersForOptionsQuery }
  });
  const { data, fetching: isLoading, error } = result;

  const finalFilterConfig = useMemo((): FilterConfig[] => {
    let config = [ ...baseFilterConfig ];

    if (data?.AbastecimentoFilterOptions) {
      const options = data.AbastecimentoFilterOptions;

      config = config.map(filter => {
        switch (filter.id) {
          case 'department':
            return { ...filter, options: options.departmentOptions };
          case 'vehiclePlate':
            return { ...filter, options: options.vehiclePlateOptions };
          case 'vehicleModel':
            return { ...filter, options: options.vehicleModelOptions };
          case 'gasStationCity':
            return { ...filter, options: options.gasStationCityOptions };
          case 'gasStationName':
            return { ...filter, options: options.gasStationNameOptions };
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