/* eslint-disable @typescript-eslint/no-explicit-any */
// Em src/pages/panels/Diarias/Dashboard/hooks/useFilterConfig.ts

import { useMemo } from "react";
import { useQuery } from "urql";
import type { FilterConfig } from "../../../../../types/filters";
import { GET_DIARIAS_DASHBOARD_DATA_QUERY } from "../../Queries/DiariasQueries";
import { baseFilterConfig } from "../data/filters.config";

/**
 * Hook para buscar e montar as opções de filtros do painel de DIÁRIAS.
 * Espera que o backend retorne getDiariasFiltersOptions com:
 * - department[{value,label}]
 * - status[{value,label}]
 * - processNumber[{value,label}]
 * - paymentDate[{value,label}]
 */
export const useFiltersConfig = (activeFilters: any) => {
  const variables = useMemo(
    () => ({ filters: activeFilters }),
    [activeFilters]
  );

  const [{ data, fetching: isLoading }] = useQuery({
    query: GET_DIARIAS_DASHBOARD_DATA_QUERY,
    variables,
  });

  const filterConfig = useMemo((): FilterConfig[] => {
    // Tenta primeiro a chave certa do backend
    const options =
      data?.getDiariasFiltersOptions ||
      // fallback caso alguém tenha deixado "filterOptions" no servidor antigo
      data?.filterOptions ||
      null;

    // Se ainda não veio nada, devolve a base zerada para não quebrar o UI
    if (!options) {
      return baseFilterConfig.map((fc) => ({ ...fc, options: [] }));
    }

    // Normaliza um array qualquer para [{value,label}]
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
          // Se o backend mandar string, vira { value: s, label: s }
          if (typeof opt === "string" || typeof opt === "number") {
            return { value: String(opt), label: String(opt) };
          }
          // Último caso: tenta extrair value/label “na marra”
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
          return { ...filter, options: normalize(options.paymentDate) };
        default:
          // Se existir algum filtro “extra” na base, mantém como está
          return { ...filter, options: filter.options ?? [] };
      }
    });
  }, [data]);

  return { filterConfig, isLoading };
};
