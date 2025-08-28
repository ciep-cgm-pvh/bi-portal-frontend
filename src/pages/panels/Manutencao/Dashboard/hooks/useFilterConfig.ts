import { useMemo } from 'react';
import type { FilterConfig } from '../../../../../types/filters';
import { baseFilterConfig } from '../data/filters.config'; // Supondo que você tenha um arquivo base

/**
 * @description Hook para construir a configuração dos filtros a partir de opções dinâmicas.
 * Não faz fetch de dados, apenas processa as opções recebidas.
 * @param options - As opções dinâmicas (ex: secretarias, placas) vindas da API.
 * @returns A configuração completa para o componente de filtros.
 */
export const useFiltersConfig = (options: any): FilterConfig[] => {
  const filterConfig = useMemo((): FilterConfig[] => {
    if (!options) return baseFilterConfig;

    // Mapeia as opções recebidas para a configuração base de filtros
    return baseFilterConfig.map(filter => {
      switch (filter.id) {
        case 'secretaria':
          return { ...filter, options: options.department || [] };
        case 'categoriaOs':
          return { ...filter, options: options.categoryOs || [] };
        case 'placa':
          return { ...filter, options: options.plate || [] };
        default:
          return filter;
      }
    });
  }, [options]);

  return filterConfig;
};

// É importante também ter um 'baseFilterConfig' em 'data/filters.config.ts'
/* Exemplo para src/pages/panels/Manutencao/Dashboard/data/filters.config.ts
export const baseFilterConfig: FilterConfig[] = [
  { id: 'periodo', label: 'Período', type: 'date-range' },
  { id: 'secretaria', label: 'Secretaria', type: 'select', options: [] },
  { id: 'categoriaOs', label: 'Categoria OS', type: 'select', options: [] },
  { id: 'placa', label: 'Placa', type: 'select', options: [] },
];

export const initialFilterValues = {
  periodo: { startDate: '', endDate: '' },
  secretaria: '',
  categoriaOs: '',
  placa: '',
};
*/