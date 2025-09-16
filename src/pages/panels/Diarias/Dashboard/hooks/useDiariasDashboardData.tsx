/* eslint-disable @typescript-eslint/no-explicit-any */
import { DollarSign, Wrench } from 'lucide-react';
import { useMemo } from 'react';
import { useQuery } from 'urql';
import type { ChartConfig } from '../../../../../types/charts';
import { GET_DIARIAS_DASHBOARD_DATA_QUERY } from '../../Queries/DiariasQueries';

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
export const useDiariasDashboardData = ({ filters, tableFilter, pagination, sort }: any) => {
  //console.log('Fetching Diarias dashboard data with filters:', filters, 'pagination:', pagination, 'sort:', sort);
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
    query: GET_DIARIAS_DASHBOARD_DATA_QUERY,
    variables: queryVariables,
  });
  // console.log('Diarias dashboard query result:', result);

  const { data, fetching: isLoading, error } = result;

  // Memoiza o processamento dos KPIs
  const kpiData = useMemo(() => {
    const kpis = data?.getDiariasKpi;
    if (!kpis) return [
      { title: 'Total Concedido', value: 'Carregando...', icon: <DollarSign className="size-5" /> },
      { title: 'Nº de Ordens de Serviço', value: 'Carregando...', icon: <Wrench className="size-5" /> },
    ];
    return [
      { title: 'Total Concedido', value: formatCurrency(kpis.totalGasto), icon: <DollarSign className="size-5 text-green-500" /> },
      { title: 'N° de Empenhos de Diárias', value: kpis.totalDiarias?.toLocaleString('pt-BR'), icon: <Wrench className="size-5 text-blue-500" /> },
    ];
  }, [data?.getDiariasKpi]);


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