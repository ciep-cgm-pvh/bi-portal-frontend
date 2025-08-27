import type { FilterConfig } from '../../../../../types/filters';

// CORREÇÃO: Os 'id's agora correspondem ao que o backend espera.
export const baseFilterConfig: FilterConfig[] = [
  { id: 'date', label: 'Período', type: 'date' }, // Usaremos 'date-range' para o objeto
  { id: 'department', label: 'Secretaria', type: 'select', options: [] },
  { id: 'categoryOs', label: 'Categoria OS', type: 'select', options: [] },
  { id: 'plate', label: 'Placa', type: 'select', options: [] },
];

// CORREÇÃO: Os nomes das chaves agora correspondem aos 'id's.
export const initialFilterValues = {
  dateRange: { startDate: '', endDate: '' },
  department: '',
  categoryOs: '',
  plate: '',
};