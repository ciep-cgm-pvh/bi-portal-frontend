// src/pages/panels/Suprimentos/Dashboard/hooks/useFilterConfig.ts
import { useMemo } from "react";
import { useQuery } from "urql";
import type { FilterConfig } from "../../../../../types/filters";
import { baseFilterConfig } from "../data/filters.config";
import { GET_SUPRIMENTOS_FILTER_OPTIONS_QUERY } from '../../Queries/SuprimentosQueries';

export const useFiltersConfig = (activeFilters: Record<string, any>) => {
  const filtersForOptionsQuery = useMemo(() => {
    const cleanedFilters = { ...activeFilters };
    
    if (cleanedFilters.from || cleanedFilters.to) {
      cleanedFilters.dateRange = {
        from: cleanedFilters.from,
        to: cleanedFilters.to,
      };
    }
    
    delete cleanedFilters.from;
    delete cleanedFilters.to;
    
    return cleanedFilters;
  }, [activeFilters]);

  const [result] = useQuery({
    query: GET_SUPRIMENTOS_FILTER_OPTIONS_QUERY,
    variables: { filters: filtersForOptionsQuery },
    requestPolicy: 'network-only' 
  });

  const { data, fetching: isLoading, error } = result;

  const finalFilterConfig = useMemo((): FilterConfig[] => {
    let config = [...baseFilterConfig];

    if (data?.SuprimentoFilterOptions) {
      const options = data.SuprimentoFilterOptions;
      
      config = config.map(filter => {
        switch (filter.id) {
          case "departmentCode":
            return { ...filter, options: options.departmentCode ?? [] };
          case "status":
            return { ...filter, options: options.status ?? [] };
          case "employee":
            return { ...filter, options: options.employee ?? [] };
          case "processNumber":
            return { ...filter, options: options.processNumber ?? [] };
          default:
            return { ...filter, options: filter.options ?? [] };
        }
      });
    }
    return config;
  }, [data, activeFilters]);

  return {
    filterConfig: finalFilterConfig,
    isLoading,
    error,
  };
};
