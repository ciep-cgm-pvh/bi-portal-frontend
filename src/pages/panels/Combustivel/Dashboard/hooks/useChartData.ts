// src/pages/DashboardCombustivel/hooks/useChartData.ts

import { useQuery } from 'urql';
import { useMemo } from 'react';
import type { ChartConfig } from '../../../../../types/charts';

// 1. Defina a query
const GET_CHART_DATA_QUERY = `
  query GetChartData {
    costByVehicle {
      vehicle
      total
    }
    costByStatus {
      status
      total
    }
  }
`;

// Estrutura de dados que a API retorna
interface ChartApiResponse {
  costByVehicle: { vehicle: string; total: number }[];
  costByStatus: { status: string; total: number }[];
}

export const useChartData = () => {
  // 2. Busque os dados da API
  const [ result ] = useQuery({ query: GET_CHART_DATA_QUERY });
  const { data, fetching: isLoading, error } = result;

  // 3. Transforme os dados brutos no array de configuração de gráficos
  const chartConfig = useMemo((): ChartConfig[] => {
    const chartData: ChartApiResponse | undefined = data;

    if (!chartData) {
      // Retorna uma configuração vazia ou com placeholders enquanto carrega
      return [
        { id: 'gasto-por-veiculo', title: 'Gasto Total por Veículo', type: 'bar-horizontal', data: [], config: { dataKey: '', categoryKey: '', color: '' } },
        { id: 'gasto-por-status', title: 'Distribuição por Status', type: 'pie', data: [], config: { dataKey: '', nameKey: '' } },
      ];
    }

    // O componente do gráfico de pizza espera as chaves 'name' e 'value'.
    // Mapeamos o resultado da API para o formato esperado.
    const pieChartData = chartData.costByStatus.map(item => ({
      name: item.status,
      value: item.total
    }));

    return [
      {
        id: 'gasto-por-veiculo',
        title: 'Gasto Total por Veículo',
        type: 'bar-horizontal',
        data: chartData.costByVehicle,
        config: { dataKey: 'total', categoryKey: 'vehicle', color: '#8884d8' },
      },
      {
        id: 'gasto-por-status',
        title: 'Distribuição de Gasto por Status',
        type: 'pie',
        data: pieChartData,
        config: { dataKey: 'value', nameKey: 'name' },
      },
    ];
  }, [ data ]);

  return {
    chartConfig,
    isLoading,
    error,
  };
};