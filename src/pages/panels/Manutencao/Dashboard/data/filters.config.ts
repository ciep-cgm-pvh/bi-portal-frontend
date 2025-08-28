import type { FilterConfig } from '../../../../../types/filters';

// CORREÇÃO: Os 'id's agora correspondem ao que o backend espera.
export const baseFilterConfig: FilterConfig[] = [
  { id: 'dateRange', label: 'Período', type: 'daterange' }, // Usaremos 'date-range' para o objeto
  { id: 'department', label: 'Secretaria', type: 'select', options: [] },
  { id: 'categoryOs', label: 'Categoria OS', type: 'select', options: [] },
  { id: 'plate', label: 'Placa', type: 'select', options: [] },
];

export const initialFilterValues = {
  dateRange: { from: '2025-01-01', to: '2025-08-28' },
  department: '',
  categoryOs: '',
  plate: '',
};