// src/pages/DashboardCombustivel/hooks/useFiltersConfig.ts

import { useQuery } from 'urql';
import { useMemo } from 'react';
import { baseFilterConfig } from '../data/filters.config';
import type { FilterConfig } from '../../../../../types/filters';

const GET_FILTER_OPTIONS_QUERY = `
  query GetFilterOptions {
    vehicleOptions { value, label }
    statusOptions { value, label }
  }
`;

export const useFiltersConfig = () => {
  const [ result ] = useQuery({ query: GET_FILTER_OPTIONS_QUERY });
  const { data, fetching: isLoading, error } = result;

  const finalFilterConfig = useMemo((): FilterConfig[] => {
    // Comece com a configuração base
    let config = [ ...baseFilterConfig ];

    // Se os dados da API já chegaram, injete as opções dinâmicas
    if (data) {
      config = config.map(filter => {
        switch (filter.id) {
          case 'vehicle':
            return { ...filter, options: data.vehicleOptions };
          case 'status':
            return { ...filter, options: data.statusOptions };
          default:
            return filter;
        }
      });
    }

    return config;
  }, [ data ]);

  return {
    filterConfig: finalFilterConfig,
    isLoading,
    error,
  };
};