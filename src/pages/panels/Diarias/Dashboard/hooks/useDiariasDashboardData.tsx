/* eslint-disable no-constant-binary-expression */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CircleCheckBig, DollarSign } from 'lucide-react';
import { useMemo } from 'react';
import { useQuery } from 'urql';
import type { ChartConfig } from '../../../../../types/charts';
import { GET_DIARIAS_CHARTS_DATA_QUERY, GET_DIARIAS_KPIS_DATA_QUERY, GET_DIARIAS_TABLE_DATA_QUERY } from '../../Queries/DiariasQueries';
import { formatCurrency } from '../../../../../utils/helpers';


export const useDiariasDashboardData = ({ filters, tableFilter, pagination, sort }: any) => {
  // 1) Variáveis da query
  const queryVariables = useMemo(() => ({
    dateRange: { from: filters.from, to: filters.to },
    employee: filters.employee,
    departmentCode: filters.departmentCode,
    status: filters.status,
    processNumber: filters.processNumber,
  }), [filters]);

  const [kpiResult] = useQuery({
    query: GET_DIARIAS_KPIS_DATA_QUERY,
    variables: { filters: queryVariables },
    requestPolicy: 'cache-and-network'
  });

  const { data: kpiDataRaw, fetching: isLoadingKpi, error: kpiError } = kpiResult;

  // 2) KPIs
  const kpiData = useMemo(() => {
    const kpis = kpiDataRaw?.getDiariasKpi;
    if (!kpis) return [
      { title: 'Gastos Concedidos', value: '...', icon: <DollarSign /> },
      // { title: 'Total Aprovados', value: '...', icon: <CircleCheckBig /> },
      { title: 'Total de Diárias', value: '...', icon: <CircleCheckBig /> },
    ];
    return [
      { title: 'Gastos Concedidos', value: formatCurrency(kpis.totalConcedido), icon: <DollarSign color='#4CAF50' /> },
      // { title: 'Total Aprovados', value: kpis.totalAprovado.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }), icon: <CircleCheckBig color='#FF9800' /> },
      { title: 'Total de Diárias', value: kpis.totalDiarias, icon: <CircleCheckBig color='#9C27B0' /> },
    ];
  }, [ kpiDataRaw ]);

  // Última atualização
  const lastUpdate = kpiDataRaw?.getDiariasLastUpdate;

  // 3) Gráficos
  const [chartsResult] = useQuery({
      query: GET_DIARIAS_CHARTS_DATA_QUERY,
      variables: { filters: queryVariables },
      requestPolicy: 'cache-and-network'
    });

  const { data: chartsDataRaw, fetching: isLoadingCharts, error: chartsError } = chartsResult;
  
  const chartConfig = useMemo((): ChartConfig[] => {
    const charts = chartsDataRaw?.getDiariasCharts;
    if (!charts) return [];
    return [
      {
        id: 'custo-por-orgao',
        title: 'Gasto por Órgão',
        type: 'bar-vertical',
        data: charts.GastoOrgaoDiaria,
        config: { dataKey: 'total', categoryKey: 'name' },
      },
      {
        id: 'gasto-por-mes',
        title: 'Gasto por Mês',
        type: 'line',
        data: charts.GastoMesDiaria,
        config: { dataKey: 'total', categoryKey: 'name'},
      },
      {
        id: 'gasto-por-funcionario',
        title: 'Gasto por Funcionário',
        type: 'ranking-table',
        data: charts.GastoFuncionarioDiaria,
        config: {
          columns: [
            {
              header: 'Funcionário',
              accessor: 'name',
              className: 'text-left'
            },
            {
              header: 'Total Gasto',
              accessor: 'total',
              className: 'text-right',
              render: formatCurrency
            }
          ]
        }
      },
    ];
  }, [ chartsDataRaw ]);

  // 4) Tabela
  const [tableResult] = useQuery({
    query: GET_DIARIAS_TABLE_DATA_QUERY,
    variables: { 
      filters: queryVariables, 
      tableFilters: tableFilter, 
      limit: pagination.itemsPerPage, 
      offset: (pagination.currentPage - 1) * pagination.itemsPerPage, 
      sortBy: sort.key, 
      sortDirection: sort.direction 
    },
    requestPolicy: 'cache-and-network'
  });

  const { data: tableDataRaw, fetching: loadingTable, error: tableError} = tableResult;
  const rows = tableDataRaw?.getDiariasTable.data || [];
  const totalCount = tableDataRaw?.getDiariasTable.totalCount;
  const tableData = useMemo(() => ({
    rows,
    totalCount,
  }), [ rows, totalCount ]);

  // const [ optionsResult ] = useQuery({
  //   query: GET_DIARIAS_FILTER_OPTIONS_QUERY,
  //   variables: { filters: queryVariables },
  //   requestPolicy: 'cache-and-network'
  // });
  // const { data: optionsDataRaw, fetching: isLoadingOptions, error: optionsError } = optionsResult;

  return {
    kpiData,
    chartConfig,
    // filterOptions: optionsDataRaw,
    tableData,
    lastUpdate,
    isLoading: {isLoadingKpi, isLoadingCharts, loadingTable},
      error: { kpiError, chartsError, tableError},
  };
};
