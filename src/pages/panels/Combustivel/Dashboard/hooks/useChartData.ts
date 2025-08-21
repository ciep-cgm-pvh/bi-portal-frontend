import { useMemo } from 'react';
import { useQuery } from 'urql';
import type { ChartConfig } from '../../../../../types/charts';
import { prepareGqlFilters } from '../utils/filter.utils';

// 1. ATUALIZE A QUERY PARA BUSCAR TODOS OS DADOS NECESSÁRIOS
const GET_CHART_DATA_QUERY = `
  query GetChartData($filters: AbastecimentoFiltersInput) {
    costByDepartment(filters: $filters) { department total }
    costByPlate(filters: $filters) { plate total }
    costOverTime(filters: $filters) { date total }
    rankingByDate(filters: $filters) { date total }
    rankingByPlate(filters: $filters) { plate total quantity }
    rankingByDepartment(filters: $filters) { department total }
  }
`;

// Helper para formatar moeda
const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

// Helper para formatar datas curtas (ex: 01/Jan)
const formatDateShort = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', timeZone: 'UTC' });
};

export const useChartData = ({ filters }: { filters: any }) => {
  const { filters: gqlFilters } = prepareGqlFilters(filters);
  const [ result ] = useQuery({
    query: GET_CHART_DATA_QUERY,
    variables: { filters: gqlFilters },
  });

  const { data, fetching: isLoading, error } = result;

  // 2. ATUALIZE O useMemo PARA CONSTRUIR AS NOVAS CONFIGURAÇÕES
  const chartConfig = useMemo((): ChartConfig[] => {
    if (!data) {
      return []; // Retorna vazio enquanto carrega
    }

    // Configurações dos Gráficos existentes
    const costByDeptConfig: ChartConfig = {
      id: 'gasto-por-secretaria',
      title: 'Gasto por Secretaria',
      type: 'pie',
      data: data.costByDepartment?.map((item: any) => ({ name: item.department, value: item.total })) || [],
      config: { dataKey: 'value', nameKey: 'name' },
    };

    const costByPlateConfig: ChartConfig = {
      id: 'gasto-por-veiculo',
      title: 'Gasto por Veículo (Top 10)',
      type: 'bar-horizontal',
      // get top 10 order by cost
      data: data.costByPlate
        ?.slice() // cria cópia para não mutar o original
        .sort((a: { total: number; }, b: { total: number; }) => b.total - a.total) // ordena do maior para o menor
        .slice(0, 10)
        .reverse() || [],
      config: { dataKey: 'total', categoryKey: 'plate', color: '#8884d8' },
    };

    // --- NOVAS CONFIGURAÇÕES ---

    const costOverTimeConfig: ChartConfig = {
      id: 'custo-por-tempo',
      title: 'Custo ao longo do Tempo',
      type: 'line',
      data: data.costOverTime || [],
      config: {
        dataKey: 'total',
        categoryKey: 'date',
        color: '#82ca9d',
        tickFormatter: formatDateShort,
      },
    };

    const rankingByDateConfig: ChartConfig = {
      id: 'ranking-por-data',
      title: 'Ranking por Data',
      type: 'ranking-table',
      data: data.rankingByDate || [],
      config: {
        columns: [
          { header: 'Data', accessor: 'date', render: (value) => new Date(value).toLocaleDateString('pt-BR', { timeZone: 'UTC' }) },
          { header: 'Total Gasto', accessor: 'total', className: 'text-right', render: formatCurrency },
        ],
      },
    };

    const rankingByPlateConfig: ChartConfig = {
      id: 'ranking-por-placa',
      title: 'Ranking por Veículo',
      type: 'ranking-table',
      data: data.rankingByPlate || [],
      config: {
        columns: [
          { header: 'Placa', accessor: 'plate' },
          { header: 'Qtde.', accessor: 'quantity', className: 'text-center' },
          { header: 'Total Gasto', accessor: 'total', className: 'text-right', render: formatCurrency },
        ],
      },
    };

    const rankingByDeptConfig: ChartConfig = {
      id: 'ranking-por-secretaria',
      title: 'Ranking por Secretaria',
      type: 'ranking-table',
      data: data.rankingByDepartment || [],
      config: {
        columns: [
          { header: 'Secretaria', accessor: 'department' },
          { header: 'Total Gasto', accessor: 'total', className: 'text-right', render: formatCurrency },
        ],
      },
    };

    return [
      costOverTimeConfig,
      costByDeptConfig,
      costByPlateConfig,
      rankingByDateConfig,
      rankingByPlateConfig,
      rankingByDeptConfig,
    ];
  }, [ data ]);

  return { chartConfig, isLoading, error };
};