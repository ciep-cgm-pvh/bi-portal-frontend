/* eslint-disable @typescript-eslint/no-explicit-any */
// Em src/pages/panels/Diarias/Dashboard/hooks/useFilterConfig.ts

import { useMemo } from "react";
import { useQuery } from "urql";
import type { FilterConfig } from "../../../../../types/filters";

import { baseFilterConfig } from "../data/filters.config";
import { GET_DIARIAS_FILTER_OPTIONS_QUERY } from '../../Queries/DiariasQueries';

/**
 * Hook para buscar e montar as opções de filtros do painel de DIÁRIAS.
 * Espera que o backend retorne getDiariasFiltersOptions com:
 * - department[{value,label}]
 * - status[{value,label}]
 * - processNumber[{value,label}]
 * - paymentDate[{value,label}]
 */
export const useFiltersConfig = (activeFilters: any) => {
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

  const [ result ] = useQuery({
      query: GET_DIARIAS_FILTER_OPTIONS_QUERY,
      // 2. Passe os filtros ativos como variáveis para a query
      variables: { filters: filtersForOptionsQuery }
  });

  const { data, fetching: isLoading, error } = result;
  
  const finalFilterConfig = useMemo((): FilterConfig[] => {
    let config = [ ...baseFilterConfig ];

    if (data?.getDiariasFiltersOptions) {
      const options = data.getDiariasFiltersOptions;

      config = config.map(filter => {
        switch (filter.id) {
          case "department":
            return { ...filter, options: (options.department) };
          case "status":
            return { ...filter, options: (options.status) };
          case "processNumber":
            return { ...filter, options: (options.processNumber) };
          case "paymentDate":
            return { ...filter, options: (options.paymentDate) };
          default:
            // Se existir algum filtro “extra” na base, mantém como está
            return { ...filter, options: filter.options ?? [] };
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
