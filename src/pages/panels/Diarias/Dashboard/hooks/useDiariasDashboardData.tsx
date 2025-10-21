/* eslint-disable no-constant-binary-expression */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DollarSign, Wrench } from 'lucide-react';
import { useMemo } from 'react';
import { useQuery } from 'urql';
import type { ChartConfig } from '../../../../../types/charts';
import { GET_DIARIAS_DASHBOARD_DATA_QUERY } from '../../Queries/DiariasQueries';

// Helpers
const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);

const sortKeyMapping: { [key: string]: string } = {
  // data: 'paymentDate',
  // total: 'amountGranted',
};

export const useDiariasDashboardData = ({ filters, tableFilter, pagination, sort }: any) => {
  // 1) Variáveis da query
  const queryVariables = useMemo(() => {
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

  const { data, fetching: isLoading, error } = result;

  // 2) KPIs
  const kpiData = useMemo(() => {
    const kpis = data?.getDiariasKpi;
    if (!kpis) {
      return [
        { title: 'Total Concedido', value: 'Carregando...', icon: <DollarSign className="size-5" /> },
        { title: 'Nº de Diárias', value: 'Carregando...', icon: <Wrench className="size-5" /> },
      ];
    }
    return [
      { title: 'Total Concedido', value: formatCurrency(kpis.totalGasto), icon: <DollarSign className="size-5 text-green-500" /> },
      { title: 'Nº de Diárias', value: Number(kpis.totalDiarias ?? 0).toLocaleString('pt-BR'), icon: <Wrench className="size-5 text-blue-500" /> },
    ];
  }, [data?.getDiariasKpi]);

  // 3) Gráficos
  const chartConfig = useMemo((): ChartConfig[] => {
    const charts = data?.getDiariasCharts;
    if (!charts) return [];

    const gastoPorOrgao = (charts.OrgaoGastoDiaria ?? []).map((item: any) => ({
      name: item?.name ?? 'N/A',
      value: Number(item?.total) ?? 0,
    }));

    const gastoPorMes = (charts.GastoMesDiaria ?? []).map((item: any) => ({
      name: formatMonth(item?.month),
      value: Number(item?.total) ?? 0,
    }));

    return [
      {
        id: 'custo-por-orgao',
        title: 'Gasto por Órgão',
        type: 'pie',
        data: gastoPorOrgao,
        config: { dataKey: 'value', nameKey: 'name' },
      },
      {
        id: 'gasto-por-mes',
        title: 'Gasto por Mês',
        type: 'bar-vertical',
        data: gastoPorMes,
        config: { dataKey: 'value', categoryKey: 'name' },
      },
    ];
  }, [data?.getDiariasCharts]);

  // 4) Tabela
  const tableData = useMemo(() => ({
    rows: data?.getDiariasTable || [],
    totalCount: data?.getDiariasTableCount || 0,
  }), [data?.getDiarias, data?.getDiariasTableCount]);

  // 5) Última atualização
  const lastUpdate = data?.getDiariasLastUpdate ?? null;

  return {
    kpiData,
    chartConfig,
    filterOptions: data?.getDiariasFiltersOptions,
    tableData,
    lastUpdate,
    isLoading,
    error,
  };
};

// Utils
function formatMonth(m?: string) {
  if (!m) return 'N/A';
  const iso = /^(\d{4})-(\d{1,2})$/.exec(m);
  if (iso) {
    const [, y, mm] = iso;
    return new Date(Number(y), Number(mm) - 1, 1)
      .toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })
      .replace('.', '');
  }
  const br = /^(\d{1,2})\/(\d{4})$/.exec(m);
  if (br) {
    const [, mm, y] = br;
    return new Date(Number(y), Number(mm) - 1, 1)
      .toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })
      .replace('.', '');
  }
  return m;
}
