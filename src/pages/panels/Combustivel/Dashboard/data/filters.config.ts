// src/pages/DashboardCombustivel/data/filters.config.ts

import type { FilterConfig } from '../../../../../types/filters';

// Esta é a configuração ESTRUTURAL dos filtros.
export const baseFilterConfig: FilterConfig[] = [
  {
    id: 'vehicle',
    label: 'Veículo',
    type: 'select',
    placeholder: 'Todos os veículos',
    options: [], // As opções serão preenchidas dinamicamente
  },
  {
    id: 'status',
    label: 'Status',
    type: 'select',
    placeholder: 'Todos os status',
    options: [], // As opções serão preenchidas dinamicamente
  },
  {
    id: 'dateRange', // Agrupando as datas
    label: 'Período',
    type: 'daterange',
  },
];

// Mantenha os valores iniciais
export const initialFilterValues = { vehicle: '', status: '', dateRange: '' };