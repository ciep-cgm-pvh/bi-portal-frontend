/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/panels/Obras/Dashboard/hooks/useFilterConfig.ts
import { useMemo } from "react";
import { useQuery } from "urql";
import type { FilterConfig } from "../../../../../types/filters";
import { GET_OBRAS_FILTER_OPTIONS_QUERY } from "../../Queries/ObrasQueries";
import { baseFilterConfig } from "../data/filters.config";

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
    query: GET_OBRAS_FILTER_OPTIONS_QUERY,
    variables: { filters: filtersForOptionsQuery },
    requestPolicy: 'network-only'
  });

  const { data, fetching: isLoading, error } = result;

  const finalFilterConfig = useMemo((): FilterConfig[] => {
    let config = [...baseFilterConfig];

    if (data?.getObrasFiltersOptions) {
      const options = data.getObrasFiltersOptions;

      config = config.map(filter => {
        switch (filter.id) {
          case "departmentCode":
            return { ...filter, options: options.departmentCode ?? [] };
          case "program":
            return { ...filter, options: options.program ?? [] };
          case "projectActivity":
            return { ...filter, options: options.projectActivity ?? [] };
          case "creditor":
            return { ...filter, options: options.creditor ?? [] };
          case "processNumber":
            return { ...filter, options: options.processNumber ?? [] };
          default:
            return { ...filter, options: filter.options ?? [] };
        }
      });
    }
    return config;
  }, [data]);

  return {
    filterConfig: finalFilterConfig,
    isLoading,
    error,
  };
};
