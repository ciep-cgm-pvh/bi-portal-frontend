// src/pages/DashboardCombustivel/hooks/useFiltersConfig.ts

import { useMemo } from 'react';
import { useQuery } from 'urql';
import type { FilterConfig } from '../../../../../types/filters';
import { baseFilterConfig } from '../data/filters.config';

// const GET_FILTER_OPTIONS_QUERY = `
//   query GetFilterOptions {
//     vehicleOptions { value, label }
//     statusOptions { value, label }
//   }
// `;

const GET_FILTER_OPTIONS_QUERY = `
  query GetFilterOptions {
    departmentOptions {
      value
      label
    }
    vehiclePlateOptions {
      value
      label
    }
    vehicleModelOptions {
      value
      label
    }
    gasStationCityOptions {
      value
      label
    }
    gasStationNameOptions {
      value
      label
    }
  }
`
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
  }, [ data ]);

  return {
    filterConfig: finalFilterConfig,
    isLoading,
    error,
  };
};