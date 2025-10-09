// Local: src/pages/panels/Diarias/Dashboard/hooks/useFilterConfig.ts

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { useQuery } from "urql";
import type { FilterConfig } from "../../../../../types/filters";
import { GET_DIARIAS_FILTER_OPTIONS_QUERY } from "../../Queries/DiariasQueries";
import { baseFilterConfig } from "../data/filters.config";

/**
 * Hook para buscar e montar as opções de filtros do painel de DIÁRIAS.
 */
export const useFiltersConfig = (activeFilters: any) => {
  const variables = useMemo(() => {
    const hasActiveFilters =
      activeFilters && Object.keys(activeFilters).length > 0;

    let vars = {};

    if (hasActiveFilters) {
      // CORREÇÃO CRÍTICA: Removemos paymentDate do objeto de filtros ANTES de enviá-lo para
      // a query de opções, pois o servidor rejeita este campo neste tipo de Input (DiariasFiltersOptions).
      const filtersToSend = { ...activeFilters };
      delete filtersToSend.paymentDate; // Remove o campo que o servidor rejeita

      vars = { filters: filtersToSend };
    }

    // LOG PARA DEBUG
    console.log("--- DIARIAS FILTER OPTIONS QUERY ---");
    console.log("QUERY:", GET_DIARIAS_FILTER_OPTIONS_QUERY);
    console.log("VARIABLES:", vars);
    console.log("------------------------------------");

    return vars;
  }, [activeFilters]);

  const [{ data, fetching: isLoading }] = useQuery({
    query: GET_DIARIAS_FILTER_OPTIONS_QUERY,
    variables: variables,
  });

  const filterConfig = useMemo((): FilterConfig[] => {
    const options = data?.getDiariasFiltersOptions || null;

    if (!options) {
      return baseFilterConfig.map((fc) => ({ ...fc, options: [] }));
    }

    const normalize = (list: any[] | undefined) => {
      if (!Array.isArray(list)) return [];
      return list
        .filter(Boolean)
        .map((opt: any) => {
          if (
            opt &&
            typeof opt === "object" &&
            "value" in opt &&
            "label" in opt
          ) {
            return opt;
          }
          if (typeof opt === "string" || typeof opt === "number") {
            return { value: String(opt), label: String(opt) };
          }
          return {
            value: String(opt?.value ?? opt?.id ?? ""),
            label: String(opt?.label ?? opt?.name ?? opt?.value ?? ""),
          };
        })
        .filter((o: any) => o.value || o.label);
    };

    // Mapeia os IDs do baseFilterConfig para as coleções certas do backend
    return baseFilterConfig.map((filter) => {
      switch (filter.id) {
        case "department":
          return { ...filter, options: normalize(options.department) };
        case "status":
          return { ...filter, options: normalize(options.status) };
        case "processNumber":
          return { ...filter, options: normalize(options.processNumber) };
        case "paymentDate":
          // O campo foi removido do backend; não há opções para ele.
          return { ...filter, options: [] };
        default:
          return { ...filter, options: filter.options ?? [] };
      }
    });
  }, [data]);

  return { filterConfig, isLoading };
};
