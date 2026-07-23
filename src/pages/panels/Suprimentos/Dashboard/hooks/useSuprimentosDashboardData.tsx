/* eslint-disable no-constant-binary-expression */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CircleCheckBig, DollarSign } from "lucide-react";
import { useMemo } from "react";
import { useQuery } from "urql";
import type { ChartConfig } from "../../../../../types/charts";
import { formatCurrency } from "../../../../../utils/helpers";
import {
  GET_SUPRIMENTOS_CHARTS_DATA_QUERY,
  GET_SUPRIMENTOS_KPIS_DATA_QUERY,
  GET_SUPRIMENTOS_TABLE_DATA_QUERY,
} from "../../Queries/SuprimentosQueries";

export const useSuprimentosDashboardData = ({
  filters,
  tableFilter,
  pagination,
  sort,
}: any) => {
  // 1) Variáveis da query
  const queryVariables = useMemo(
    () => ({
      dateRange: { from: filters.from, to: filters.to },
      employee: filters.employee,
      departmentCode: filters.departmentCode,
      status: filters.status,
      processNumber: filters.processNumber,
    }),
    [filters]
  );

  const [kpiResult] = useQuery({
    query: GET_SUPRIMENTOS_KPIS_DATA_QUERY,
    variables: { filters: queryVariables },
    requestPolicy: "cache-and-network",
  });

  const {
    data: kpiDataRaw,
    fetching: isLoadingKpi,
    error: kpiError,
  } = kpiResult;

  // 2) KPIs
  const kpiData = useMemo(() => {
    const kpis = kpiDataRaw?.SuprimentoKpis;
    if (!kpis)
      return [
        { title: "Gastos Concedidos", value: "...", icon: <DollarSign /> },
        { title: "Total de Processos", value: "...", icon: <CircleCheckBig /> },
      ];
    return [
      {
        title: "Gastos Concedidos",
        value: formatCurrency(kpis.totalConcedido),
        icon: <DollarSign color="#4CAF50" />,
      },
      {
        title: "Total de Processos",
        value: kpis.totalProcessos,
        icon: <CircleCheckBig color="#9C27B0" />,
      },
    ];
  }, [kpiDataRaw]);

  // Última atualização
  const lastUpdate = kpiDataRaw?.getSuprimentoLastUpdate || kpiDataRaw?.SuprimentoKpis?.lastUpdate;

  // 3) Gráficos
  const [chartsResult] = useQuery({
    query: GET_SUPRIMENTOS_CHARTS_DATA_QUERY,
    variables: { filters: queryVariables },
    requestPolicy: "cache-and-network",
  });

  const {
    data: chartsDataRaw,
    fetching: isLoadingCharts,
    error: chartsError,
  } = chartsResult;

  const chartConfig = useMemo((): ChartConfig[] => {
    const charts = chartsDataRaw?.SuprimentoCharts;
    if (!charts) return [];
    return [
      {
        id: "custo-por-orgao",
        title: "Gasto por Órgão",
        type: "bar-vertical",
        data: charts.GastoOrgao || [],
        config: { dataKey: "total", categoryKey: "name" },
      },
      {
        id: "gasto-por-mes",
        title: "Gasto por Mês",
        type: "line",
        data: charts.GastoMes || [],
        config: { dataKey: "total", categoryKey: "name" },
      },
      {
        id: "gasto-por-funcionario",
        title: "Gasto por Funcionário",
        type: "ranking-table",
        data: charts.GastoFuncionario || [],
        config: {
          columns: [
            {
              header: "Funcionário",
              accessor: "name",
              className: "text-left",
            },
            {
              header: "Total Gasto",
              accessor: "total",
              className: "text-right",
              render: formatCurrency,
            },
          ],
        },
      },
    ];
  }, [chartsDataRaw]);

  // 4) Tabela
  const [tableResult] = useQuery({
    query: GET_SUPRIMENTOS_TABLE_DATA_QUERY,
    variables: {
      filters: queryVariables,
      tableFilters: tableFilter,
      limit: pagination.itemsPerPage,
      offset: (pagination.currentPage - 1) * pagination.itemsPerPage,
      sortBy: sort.key,
      sortDirection: sort.direction,
    },
    requestPolicy: "cache-and-network",
  });

  const {
    data: tableDataRaw,
    fetching: loadingTable,
    error: tableError,
  } = tableResult;

  const tableData = useMemo(
    () => ({
      rows: tableDataRaw?.getSuprimentoTable?.data ?? [],
      totalCount: tableDataRaw?.getSuprimentoTable?.totalCount ?? 0,
    }),
    [tableDataRaw]
  );

  return {
    kpiData,
    chartConfig,
    tableData,
    lastUpdate,
    isLoading: { isLoadingKpi, isLoadingCharts, loadingTable },
    error: { kpiError, chartsError, tableError },
  };
};
