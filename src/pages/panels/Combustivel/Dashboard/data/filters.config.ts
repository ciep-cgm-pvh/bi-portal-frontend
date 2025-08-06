import type { FilterConfig } from '../../../../../types/filters';


export const filterConfiguration: FilterConfig[] = [
  {
    id: 'vehicle',
    label: 'Veículo',
    type: 'select',
    placeholder: 'Todos os veículos',
    options: [
      { value: 'fiat-strada', label: 'Fiat Strada (ABC-1234)' },
      { value: 'vw-gol', label: 'VW Gol (DEF-5678)' },
    ],
  },
  {
    id: 'status',
    label: 'Status',
    type: 'select',
    placeholder: 'Todos os status',
    options: [
      { value: 'approved', label: 'Aprovado' },
      { value: 'pending', label: 'Pendente' },
      { value: 'rejected', label: 'Rejeitado' },
    ],
  },
  {
    id: 'startDate',
    label: 'Data Inicial',
    type: 'date',
  },
  {
    id: 'endDate',
    label: 'Data Final',
    type: 'date',
  },
];

export const initialFilterValues = { vehicle: '', status: '', startDate: '', endDate: '' };