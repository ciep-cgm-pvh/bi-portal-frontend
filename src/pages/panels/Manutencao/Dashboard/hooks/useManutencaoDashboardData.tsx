/* eslint-disable @typescript-eslint/no-explicit-any */
import { DollarSign, Wrench } from 'lucide-react';
import { useMemo } from 'react';
import { useQuery } from 'urql';
import type { ChartConfig } from '../../../../../types/charts';
import { GET_MANUTENCAO_DASHBOARD_DATA_QUERY } from '../../queries/ManutencaoQueries';


// Helper para formatar moeda
const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);

const sortKeyMapping: { [key: string]: string } = {
  // data: 'datetime',
  // total: 'totalCost',
};

/**
 * @description Hook centralizado para buscar e processar todos os dados do dashboard de Manutenção.
 * Executa uma única query para obter KPIs, dados de gráficos, opções de filtros e dados da tabela.
 *
 * @param filters - O estado atual dos filtros aplicados no dashboard.
 * @returns Um objeto contendo todos os dados prontos para serem consumidos pelos componentes.
 */
export const useManutencaoDashboardData = ({ filters, tableFilter, pagination, sort }: any) => {
  // 2. USE A FUNÇÃO PARA PREPARAR OS FILTROS

  const queryVariables = useMemo(() => {
    // Traduz a chave de ordenação, se necessário. Caso contrário, usa a chave original.
    const sortByBackend = sortKeyMapping[sort.key] || sort.key;

    return {
      filters,
      tableFilter,
      limit: pagination.itemsPerPage,
      offset: (pagination.currentPage - 1) * pagination.itemsPerPage,
      sortBy: sortByBackend,
      sortDirection: sort.direction,
    };
  }, [filters, pagination.currentPage, pagination.itemsPerPage, sort.direction, sort.key, tableFilter]);

  const [result] = useQuery({
    query: GET_MANUTENCAO_DASHBOARD_DATA_QUERY,
    variables: queryVariables,
  });

  const { data, fetching: isLoading, error } = result;

  // Memoiza o processamento dos KPIs
  const kpiData = useMemo(() => {
    const kpis = data?.kpis;
    if (!kpis) return [
      { title: 'Custo Total', value: 'Carregando...', icon: <DollarSign className="size-5" /> },
      { title: 'Nº de Ordens de Serviço', value: 'Carregando...', icon: <Wrench className="size-5" /> },
      { title: 'Custo Médio por OS', value: 'Carregando...', icon: <DollarSign className="size-5" /> },
    ];
    return [
      { title: 'Custo Total', value: formatCurrency(kpis.totalCost), icon: <DollarSign className="size-5 text-green-500" /> },
      { title: 'Nº de Ordens de Serviço', value: kpis.serviceOrderCount?.toLocaleString('pt-BR'), icon: <Wrench className="size-5 text-blue-500" /> },
      { title: 'Custo Médio por OS', value: formatCurrency(kpis.averageCostPerOs), icon: <DollarSign className="size-5 text-yellow-500" /> },
    ];
  }, [data?.kpis]);

  // Memoiza a configuração dos gráficos
  const chartConfig = useMemo((): ChartConfig[] => {
    const charts = data?.charts;
    if (!charts) return [];

    return [
      {
        id: 'custo-por-secretaria',
        title: 'Custo por Secretaria',
        type: 'pie',
        data: charts.costByDepartment || [],
        config: { dataKey: 'value', nameKey: 'name' },
      },
      {
        id: 'custo-por-tipo-manutencao',
        title: 'Custo por Tipo de Manutenção',
        type: 'bar-vertical',
        data: charts.costByTypeOfManutencao || [],
        config: { dataKey: 'value', categoryKey: 'name', color: '#82ca9d' },
      },
    ];
  }, [data?.charts]);

  // Extrai os dados da tabela e a contagem total
  const tableData = useMemo(() => ({
    rows: data?.tableData || [],
    totalCount: data?.totalCount || 0,
  }), [data?.tableData, data?.totalCount]);


  return {
    kpiData,
    chartConfig,
    filterOptions: data?.filterOptions,
    tableData,
    lastUpdate: data?.kpis?.lastUpdate,
    isLoading,
    error,
  };
};