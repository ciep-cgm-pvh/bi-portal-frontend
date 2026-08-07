/* eslint-disable @typescript-eslint/no-explicit-any */
import { Banknote, HardHat, Percent, TrafficCone } from "lucide-react";
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
      status: filters.status,
      contractor: filters.contractor,
      neighborhood: filters.neighborhood,
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
        { title: "Valor Contratado", value: "...", icon: <Banknote /> },
        { title: "Valor Pago", value: "...", icon: <Banknote /> },
        { title: "Total de Obras", value: "...", icon: <TrafficCone /> },
        { title: "Execução Média", value: "...", icon: <Percent /> },
      ];
    return [
      {
        title: "Valor Contratado",
        value: formatCurrency(kpis.totalContratado),
        icon: <Banknote color="#4CAF50" />,
      },
      {
        title: "Valor Pago",
        value: formatCurrency(kpis.totalPago),
        icon: <HardHat color="#FF9800" />,
      },
      {
        title: "Total de Obras",
        value: String(kpis.totalObras ?? 0),
        icon: <TrafficCone color="#9C27B0" />,
      },
      {
        title: "Execução Média",
        value: `${Number(kpis.percentualExecucaoMedio ?? 0).toLocaleString("pt-BR", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        })}%`,
        icon: <Percent color="#2196F3" />,
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
        id: "investimento-por-orgao",
        title: "Investimento por Secretaria",
        type: "bar-vertical",
        data: charts.InvestimentoOrgao || [],
        config: { dataKey: "total", categoryKey: "name" },
      },
      {
        id: "investimento-por-mes",
        title: "Investimento por Mês",
        type: "line",
        data: charts.InvestimentoMes || [],
        config: { dataKey: "total", categoryKey: "name" },
      },
      {
        id: "obras-por-status",
        title: "Distribuição por Status",
        type: "pie",
        data: charts.ObrasPorStatus || [],
        config: { dataKey: "total", nameKey: "name" },
      },
      {
        id: "investimento-por-bairro",
        title: "Investimento por Bairro",
        type: "ranking-table",
        data: charts.InvestimentoBairro || [],
        config: {
          columns: [
            {
              header: "Bairro",
              accessor: "name",
              className: "text-left",
            },
            {
              header: "Total Investido",
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
