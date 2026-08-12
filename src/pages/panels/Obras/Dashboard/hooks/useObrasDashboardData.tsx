/* eslint-disable @typescript-eslint/no-explicit-any */
import { Banknote, FileText, HandCoins, Receipt } from "lucide-react";
import { useMemo } from "react";
import { useQuery } from "urql";
import type { ChartConfig } from "../../../../../types/charts";
import { formatCurrency } from "../../../../../utils/helpers";
import {
  GET_OBRAS_CHARTS_DATA_QUERY,
  GET_OBRAS_KPIS_DATA_QUERY,
  GET_OBRAS_TABLE_DATA_QUERY,
} from "../../Queries/ObrasQueries";

export const useObrasDashboardData = ({
  filters,
  tableFilter,
  pagination,
  sort,
}: any) => {
  // 1) Variáveis da query
  const queryVariables = useMemo(
    () => ({
      dateRange: { from: filters.from, to: filters.to },
      departmentCode: filters.departmentCode,
      program: filters.program,
      projectActivity: filters.projectActivity,
      creditor: filters.creditor,
      processNumber: filters.processNumber,
    }),
    [filters]
  );

  const [kpiResult] = useQuery({
    query: GET_OBRAS_KPIS_DATA_QUERY,
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
    const kpis = kpiDataRaw?.getObrasKpi;
    if (!kpis)
      return [
        { title: "Empenhado", value: "...", icon: <Banknote /> },
        { title: "Liquidado", value: "...", icon: <Receipt /> },
        { title: "Pago", value: "...", icon: <HandCoins /> },
        { title: "Processos", value: "...", icon: <FileText /> },
      ];
    return [
      {
        title: "Empenhado",
        value: formatCurrency(kpis.totalEmpenhado),
        icon: <Banknote color="#2196F3" />,
      },
      {
        title: "Liquidado",
        value: formatCurrency(kpis.totalLiquidado),
        icon: <Receipt color="#FF9800" />,
      },
      {
        title: "Pago",
        value: formatCurrency(kpis.totalPago),
        icon: <HandCoins color="#4CAF50" />,
      },
      {
        title: "Processos",
        value: `${kpis.totalProcessos ?? 0} (${kpis.totalEmpenhos ?? 0} empenhos)`,
        icon: <FileText color="#9C27B0" />,
      },
    ];
  }, [kpiDataRaw]);

  // Última atualização
  const lastUpdate = kpiDataRaw?.getObrasLastUpdate;

  // 3) Gráficos
  const [chartsResult] = useQuery({
    query: GET_OBRAS_CHARTS_DATA_QUERY,
    variables: { filters: queryVariables },
    requestPolicy: "cache-and-network",
  });

  const {
    data: chartsDataRaw,
    fetching: isLoadingCharts,
    error: chartsError,
  } = chartsResult;

  const chartConfig = useMemo((): ChartConfig[] => {
    const charts = chartsDataRaw?.getObrasCharts;
    if (!charts) return [];
    return [
      {
        id: "empenhado-por-secretaria",
        title: "Empenhado por Secretaria",
        type: "bar-vertical",
        data: charts.EmpenhadoOrgao || [],
        config: { dataKey: "total", categoryKey: "name" },
      },
      {
        id: "empenhado-por-mes",
        title: "Empenhado por Mês",
        type: "line",
        data: charts.EmpenhadoMes || [],
        config: { dataKey: "total", categoryKey: "name" },
      },
      {
        id: "empenhado-por-programa",
        title: "Empenhado por Programa",
        type: "pie",
        data: charts.EmpenhadoPrograma || [],
        config: { dataKey: "total", nameKey: "name" },
      },
      {
        id: "empenhado-por-credor",
        title: "Empenhado por Credor",
        type: "ranking-table",
        data: charts.EmpenhadoCredor || [],
        config: {
          columns: [
            {
              header: "Credor",
              accessor: "name",
              className: "text-left",
            },
            {
              header: "Total Empenhado",
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
    query: GET_OBRAS_TABLE_DATA_QUERY,
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
      rows: tableDataRaw?.getObrasTable?.data ?? [],
      totalCount: tableDataRaw?.getObrasTable?.totalCount ?? 0,
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
