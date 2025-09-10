// src/pages/DashboardCombustivel/data/filters.config.ts

import type { FilterConfig } from '../../../../../types/filters';

// Esta é a configuração ESTRUTURAL dos filtros.
export const baseFilterConfig: FilterConfig[] = [
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
  {
    id: 'department',
    label: 'Unidade',
    type: 'select',
    placeholder: 'Todas as unidades',
    options: [], // As opções serão preenchidas dinamicamente
  },
  {
    id: 'vehiclePlate',
    label: 'Placa do Veículo',
    type: 'select',
    placeholder: 'Todas as placas',
    options: [], // As opções serão preenchidas dinamicamente
  },
  {
    id: 'vehicleModel',
    label: 'Modelo do Veículo',
    type: 'select',
    placeholder: 'Todos os modelos',
    options: [], // As opções serão preenchidas dinamicamente
  },
  {
    id: 'gasStationCity',
    label: 'Cidade do Posto',
    type: 'select',
    placeholder: 'Todas as cidades',
    options: [], // As opções serão preenchidas dinamicamente
  },
  {
    id: 'gasStationName',
    label: 'Nome do Posto',
    type: 'select',
    placeholder: 'Todos os postos',
    options: [], // As opções serão preenchidas dinamicamente
  },

];

// Mantenha os valores iniciais
export const initialFilterValues = {
  startDate: '2025-01-01', // YYYY-MM-DD
  endDate: '2025-06-30', // YYYY-MM-DD
  department: '',
  vehiclePlate: '',
  vehicleModel: '',
  gasStationCity: '',
  gasStationName: '',
  excludePostoInterno: true
};