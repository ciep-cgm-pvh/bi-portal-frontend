/* eslint-disable react-hooks/exhaustive-deps */
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

// Se você precisar traduzir nomes de colunas do front para o backend, faça aqui.
const sortKeyMapping: { [key: string]: string } = {
  // 'paymentDate': 'paymentDate',
  // 'amountGranted': 'amountGranted',
};

export const useDiariasDashboardData = ({ filters, tableFilter, pagination, sort }: any) => {
  // 1) Variáveis da query com paginação e ordenação coerentes
  const queryVariables = useMemo(() => {
    const sortByBackend = sortKeyMapping[sort.key] || sort.key;
    return {
      filters,
      tableFilter,
      limit: pagination.itemsPerPage,
      offset: (pagination.currentPage - 1) * pagination.itemsPerPage,
      sortBy: sortByBackend,
      sortDirection: sort.direction, // 'ascending' | 'descending'
    };
  }, [filters, tableFilter, pagination.itemsPerPage, pagination.currentPage, sort.key, sort.direction]);

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

    const gastoPorMes = (charts.GastoMesDiaria ?? [])
      .map((item: any) => ({
        rawMonth: item?.month ?? '',
        value: Number(item?.total) ?? 0,
      }))
      // Ordena do mais recente para o mais antigo antes de formatar o rótulo
      .sort((a: any, b: any) => parseMonth(b.rawMonth) - parseMonth(a.rawMonth))
      .map((d: any) => ({
        name: formatMonth(d.rawMonth),
        value: d.value,
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
        type: 'bar-horizontal', // troque para 'line' ou 'bar-vertical' se preferir
        data: gastoPorMes,
        config: { dataKey: 'value', categoryKey: 'name' },
      },
    ];
  }, [data?.getDiariasCharts]);

  // 4) Tabela + total
  // Se o backend já pagina de verdade, isso aqui basta:
  // const tableData = useMemo(() => ({
  //   rows: data?.getDiarias || [],
  //   totalCount: data?.getDiariasTableCount || 0,
  // }), [data?.getDiarias, data?.getDiariasTableCount]);

  // Fallback temporário caso o backend ainda não implemente limit/offset:
  const allRows = data?.getDiarias || [];
  const start = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const end = start + pagination.itemsPerPage;
  const tableData = useMemo(() => ({
    rows: allRows.slice(start, end),
    totalCount: data?.getDiariasTableCount ?? allRows.length,
  }), [allRows, start, end, data?.getDiariasTableCount]);

  // 5) Última atualização
  const lastUpdate = data?.getDiariasLastUpdate ?? null;

  return {
    kpiData,
    chartConfig,
    // Caso esteja usando filtros dinâmicos via hook separado, isso pode não ser necessário:
    filterOptions: data?.getDiariasFiltersOptions,
    tableData,
    lastUpdate,
    isLoading,
    error,
  };
};

// =================== utils locais ===================
function parseMonth(m?: string): number {
  if (!m) return -Infinity;

  // "YYYY-MM" ou "YYYY-M"
  const iso = /^(\d{4})-(\d{1,2})$/.exec(m);
  if (iso) {
    const [, y, mm] = iso;
    return new Date(Number(y), Number(mm) - 1, 1).getTime();
  }

  // "MM/YYYY" ou "M/YYYY"
  const br = /^(\d{1,2})\/(\d{4})$/.exec(m);
  if (br) {
    const [, mm, y] = br;
    return new Date(Number(y), Number(mm) - 1, 1).getTime();
  }

  const t = new Date(m).getTime();
  return Number.isNaN(t) ? -Infinity : t;
}

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
