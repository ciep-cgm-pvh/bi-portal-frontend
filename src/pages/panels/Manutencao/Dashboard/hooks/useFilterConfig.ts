// Em src/pages/panels/Manutencao/Dashboard/hooks/useFilterConfig.ts
import { useMemo } from 'react';
import { useQuery } from 'urql';
import type { FilterConfig } from '../../../../../types/filters';
import { GET_MANUTENCAO_FILTER_OPTIONS_QUERY } from '../../queries/ManutencaoQueries';
import { baseFilterConfig } from '../data/filters.config';

/**
 * @description Hook para buscar e construir a configuração dos filtros de Manutenção.
 * @param activeFilters - Os filtros atualmente selecionados/digitados pelo usuário.
 * @returns A configuração completa para o componente de filtros, com opções atualizadas.
 */

export const useFiltersConfig = (activeFilters: any) => {
  const queryVariables = useMemo(() => {
    return { filters: activeFilters };
  }, [activeFilters]);

  const [ result ] = useQuery({
    query: GET_MANUTENCAO_FILTER_OPTIONS_QUERY,
    variables: queryVariables,
  });

  const { data, fetching: isLoading } = result;

  const filterConfig = useMemo((): FilterConfig[] => {
    const options = data?.filterOptions;
    if (!options) {
      // Retorna a config base com arrays vazios enquanto carrega ou se não houver dados
      return baseFilterConfig.map(fc => ({ ...fc, options: [] })); 
    }

    // Mapeia as opções recebidas da API para a configuração base de filtros
    return baseFilterConfig.map(filter => {
      switch (filter.id) {
        case 'department':
          return { ...filter, options: options.department || [] };
        case 'categoryOs':
          return { ...filter, options: options.categoryOs || [] };
        case 'plate':
          return { ...filter, options: options.plate || [] };
        default:
          return filter;
      }
    });
  }, [ data ]);

  return { filterConfig, isLoading };
};