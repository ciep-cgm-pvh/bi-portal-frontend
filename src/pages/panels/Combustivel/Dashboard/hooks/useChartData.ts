// src/pages/DashboardCombustivel/hooks/useChartData.ts

import { useMemo } from 'react';
import { useQuery } from 'urql';
import type { ChartConfig } from '../../../../../types/charts';
import { prepareGqlFilters } from '../utils/filter.utils';

// 1. Defina a query
const GET_CHART_DATA_QUERY = `
  query GetChartData {
    costByDepartment {
      department
      total
    }
    costByCity {
      city
      total
    }
    costByGasStation {
      name
      total
    }
    costByPlate {
      plate
      total
    }
    costByDate{
      date
      total
    }
    costOverTime {
      date
      total
    }
  }
`;

// Estrutura de dados que a API retorna
interface ChartApiResponse {
  costByVehicle: { vehicle: string; total: number }[];
  costByStatus: { status: string; total: number }[];
  costByDepartment: { department: string; total: number }[];
  costByCity: { city: string; total: number }[];
  costByGasStation: { name: string; total: number }[];
  costByPlate: { plate: string; total: number }[];
  costByDate: { date: string; total: number }[];
  costOverTime: { date: string; total: number }[];
}

export const useChartData = ({ filters }: { filters: any }) => {
  // 2. Busque os dados da API
  const [ result ] = useQuery({ query: GET_CHART_DATA_QUERY, variables: { filters: prepareGqlFilters(filters) }, });
  const { data, fetching: isLoading, error } = result;

  // 3. Transforme os dados brutos no array de configuração de gráficos
  const chartConfig = useMemo((): ChartConfig[] => {
    const chartData: ChartApiResponse | undefined = data;

    if (!chartData) {
      // Retorna uma configuração vazia ou com placeholders enquanto carrega
      return [
        // Graficos: Pie -> Valor por Secretaria; Barra Vertical -->Top 10 Veículos por Custo por Placa; Double linechart --> Custo ao Longo do tempo por semestre (compara 2024.2 com 2025.2); tabela --> [data - litros - custo] --> ranking de dia com mais gasto;tabela --> [placa - litros - custo] --> ranking de veículos por gasto; tabela --> [departamento - litros - custo] --> ranking de departamentos por gasto;

        {
          id: 'valor-por-secretaria',
          title: 'Valor por Secretaria',
          type: 'pie',
          data: [],
          config: { dataKey: 'value', nameKey: 'name' }
        },
        {
          id: 'top-10-veiculos-custo',
          title: 'Top 10 Veículos por Custo',
          type: 'bar-vertical', // Alterado para vertical conforme solicitado
          data: [],
          config: { dataKey: 'total', categoryKey: 'plate', color: '#155dfc' }
        },
      ];
    }

    let processedDepartments = [];
    const topN = 9;

    // 1. Ordena os departamentos por valor total, do maior para o menor
    const sortedDepartments = [ ...chartData.costByDepartment ].sort((a, b) => b.total - a.total);

    // 2. Se houver mais departamentos que o nosso limite (9)
    if (sortedDepartments.length > topN) {
      // Pega os 9 primeiros
      const topDepartments = sortedDepartments.slice(0, topN);

      // Pega o restante para somar
      const otherDepartments = sortedDepartments.slice(topN);
      const othersTotal = otherDepartments.reduce((acc, item) => acc + item.total, 0);

      // Junta os 9 primeiros com a nova categoria "Outros"
      processedDepartments = [ ...topDepartments ];
      if (othersTotal > 0) {
        processedDepartments.push({ department: 'Outros', total: othersTotal });
      }

    } else {
      // Se houver 9 ou menos, apenas usa a lista ordenada
      processedDepartments = sortedDepartments;
    }

    const top10Vehicles = [ ...chartData.costByPlate ] // Cria uma cópia para não alterar o original
      .sort((a, b) => b.total - a.total) // Ordena do maior para o menor custo
      .slice(0, 10); // Pega apenas os 10 primeiros itens

    // Mapeia os dados já processados para o formato que o gráfico espera
    const pieChartData = processedDepartments.map(item => ({
      name: item.department,
      value: parseFloat(item.total.toFixed(2)),
    }));

    return [
      {
        id: 'valor-por-secretaria',
        title: 'Valor por Secretaria',
        type: 'pie',
        data: pieChartData,
        config: { dataKey: 'value', nameKey: 'name' },
      },
      {
        id: 'top-10-veiculos-custo',
        title: 'Top 10 Veículos por Custo',
        type: 'bar-horizontal',
        // top 10
        data: top10Vehicles.map(item => ({
          plate: item.plate,
          total: parseFloat(item.total.toFixed(2)),
        })),
        config: { dataKey: 'total', categoryKey: 'plate', color: '#155dfc', tickFormatter: (value: number) => `R$ ${(value / 1000000).toFixed(1)}M`, },
      },
    ];
  }, [ data ]);

  return {
    chartConfig,
    isLoading,
    error,
  };
};