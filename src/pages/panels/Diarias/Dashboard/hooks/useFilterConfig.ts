// Em src/pages/panels/Diarias/Dashboard/hooks/useFilterConfig.ts
import { useMemo } from "react";
import { useQuery } from "urql";
import type { FilterConfig } from "../../../../../types/filters";
import { baseFilterConfig } from "../data/filters.config";
import { GET_DIARIAS_FILTER_OPTIONS_QUERY } from '../../Queries/DiariasQueries';

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

  const [ result ] = useQuery({
    query: GET_DIARIAS_FILTER_OPTIONS_QUERY,
    // 2. Passe os filtros ativos como variáveis para a query
    variables: { filters: filtersForOptionsQuery },
    requestPolicy: 'network-only' 
  });

  const { data, fetching: isLoading, error } = result;

  const finalFilterConfig = useMemo((): FilterConfig[] => {
    let config = [ ...baseFilterConfig ];

    if (data?.getDiariasFiltersOptions) {
      const options = data.getDiariasFiltersOptions;
      
      config = config.map(filter => {
        switch (filter.id) {
          case "departmentCode":
            return { ...filter, options: (options.departmentCode) };
          case "status":
            return { ...filter, options: (options.status) };
          case "employee":
            return { ...filter, options: (options.employee) };
          case "processNumber":
            return { ...filter, options: (options.processNumber) };
          default:
            // Se existir algum filtro “extra” na base, mantém como está
          return { ...filter, options: filter.options ?? [] };
        }
      });
    }
    return config;
  }, [ data, activeFilters ]);

  return {
    filterConfig: finalFilterConfig,
    isLoading,
    error,
  };
};
