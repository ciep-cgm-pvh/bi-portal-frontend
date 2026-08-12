/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/panels/Contratos/Dashboard/hooks/useFilterConfig.ts
import { useMemo } from "react";
import { useQuery } from "urql";
import type { FilterConfig } from "../../../../../types/filters";
import { GET_CONTRATOS_FILTER_OPTIONS_QUERY } from "../../Queries/ContratosQueries";
import { baseFilterConfig } from "../data/filters.config";
import { montarYearRange } from "../utils/filter.utils";

export const useFiltersConfig = (activeFilters: Record<string, any>) => {
  const filtersForOptionsQuery = useMemo(() => {
    const cleaned = { ...activeFilters };
    const yearRange = montarYearRange(cleaned.yearFrom, cleaned.yearTo);

    delete cleaned.yearFrom;
    delete cleaned.yearTo;

    return yearRange ? { ...cleaned, yearRange } : cleaned;
  }, [activeFilters]);

  const [result] = useQuery({
    query: GET_CONTRATOS_FILTER_OPTIONS_QUERY,
    variables: { filters: filtersForOptionsQuery },
    requestPolicy: 'network-only'
  });

  const { data, fetching: isLoading, error } = result;

  const finalFilterConfig = useMemo((): FilterConfig[] => {
    let config = [...baseFilterConfig];

    if (data?.getContratosFiltersOptions) {
      const options = data.getContratosFiltersOptions;

      config = config.map(filter => {
        switch (filter.id) {
          // Os dois extremos do período saem da mesma lista de anos.
          case "yearFrom":
          case "yearTo":
            return { ...filter, options: options.year ?? [] };
          case "departmentCode":
            return { ...filter, options: options.departmentCode ?? [] };
          case "parliamentarian":
            return { ...filter, options: options.parliamentarian ?? [] };
          case "resourceSource":
            return { ...filter, options: options.resourceSource ?? [] };
          case "area":
            return { ...filter, options: options.area ?? [] };
          case "neighborhood":
            return { ...filter, options: options.neighborhood ?? [] };
          case "status":
            return { ...filter, options: options.status ?? [] };
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
