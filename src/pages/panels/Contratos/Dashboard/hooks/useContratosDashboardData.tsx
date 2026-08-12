/* eslint-disable @typescript-eslint/no-explicit-any */
import { Banknote, FileSignature, HandCoins, Landmark } from "lucide-react";
import { useMemo } from "react";
import { useQuery } from "urql";
import type { ChartConfig } from "../../../../../types/charts";
import { formatCurrency } from "../../../../../utils/helpers";
import {
  GET_CONTRATOS_CHARTS_DATA_QUERY,
  GET_CONTRATOS_KPIS_DATA_QUERY,
  GET_CONTRATOS_TABLE_DATA_QUERY,
} from "../../Queries/ContratosQueries";
import { montarYearRange } from "../utils/filter.utils";

const contagem = (valor: any) => Number(valor ?? 0).toLocaleString("pt-BR");

export const useContratosDashboardData = ({
  filters,
  tableFilter,
  pagination,
  sort,
}: any) => {
  // 1) Variáveis da query
  const queryVariables = useMemo(() => {
    const yearRange = montarYearRange(filters.yearFrom, filters.yearTo);

    return {
      ...(yearRange ? { yearRange } : {}),
      departmentCode: filters.departmentCode,
      parliamentarian: filters.parliamentarian,
      resourceSource: filters.resourceSource,
      area: filters.area,
      neighborhood: filters.neighborhood,
      status: filters.status,
      processNumber: filters.processNumber,
    };
  }, [filters]);

  const [kpiResult] = useQuery({
    query: GET_CONTRATOS_KPIS_DATA_QUERY,
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
    const kpis = kpiDataRaw?.getContratosKpi;
    if (!kpis)
      return [
        { title: "Valor do Repasse", value: "...", icon: <Landmark /> },
        { title: "Contrapartida", value: "...", icon: <HandCoins /> },
        { title: "Valor Global", value: "...", icon: <Banknote /> },
        { title: "Contratos", value: "...", icon: <FileSignature /> },
      ];
    return [
      {
        title: "Valor do Repasse",
        value: formatCurrency(kpis.totalRepasse),
        icon: <Landmark color="#2196F3" />,
      },
      {
        title: "Contrapartida",
        value: formatCurrency(kpis.totalContrapartida),
        icon: <HandCoins color="#FF9800" />,
      },
      {
        title: "Valor Global",
        value: formatCurrency(kpis.totalGlobal),
        icon: <Banknote color="#4CAF50" />,
      },
      {
        title: "Contratos",
        value: `${contagem(kpis.totalContratos)} (${contagem(kpis.totalProcessos)} processos)`,
        icon: <FileSignature color="#9C27B0" />,
      },
    ];
  }, [kpiDataRaw]);

  // Data de referência da carga
  const lastUpdate = kpiDataRaw?.getContratosLastUpdate;

  // 3) Gráficos
  const [chartsResult] = useQuery({
    query: GET_CONTRATOS_CHARTS_DATA_QUERY,
    variables: { filters: queryVariables },
    requestPolicy: "cache-and-network",
  });

  const {
    data: chartsDataRaw,
    fetching: isLoadingCharts,
    error: chartsError,
  } = chartsResult;

  const chartConfig = useMemo((): ChartConfig[] => {
    const charts = chartsDataRaw?.getContratosCharts;
    if (!charts) return [];

    return [
      {
        id: "valor-por-ano",
        title: "Valor Global por Ano",
        type: "line",
        data: charts.ValorPorAno || [],
        config: { dataKey: "total", categoryKey: "name" },
      },
      {
        id: "valor-por-secretaria",
        title: "Valor Global por Secretaria",
        type: "bar-vertical",
        data: charts.ValorPorSecretaria || [],
        config: { dataKey: "total", categoryKey: "name" },
      },
      {
        id: "valor-por-area",
        title: "Valor Global por Área",
        type: "pie",
        data: charts.ValorPorArea || [],
        config: { dataKey: "total", nameKey: "name" },
      },
      {
        id: "valor-por-fonte",
        title: "Valor Global por Fonte do Recurso",
        type: "pie",
        data: charts.ValorPorFonte || [],
        config: { dataKey: "total", nameKey: "name" },
      },
      {
        id: "valor-por-parlamentar",
        title: "Valor Global por Origem do Repasse",
        type: "ranking-table",
        data: charts.ValorPorParlamentar || [],
        config: {
          columns: [
            { header: "Origem", accessor: "name", className: "text-left" },
            {
              header: "Valor Global",
              accessor: "total",
              className: "text-right",
              render: formatCurrency,
            },
          ],
        },
      },
      {
        id: "contratos-por-status",
        title: "Contratos por Situação",
        type: "ranking-table",
        data: charts.ContratosPorStatus || [],
        config: {
          columns: [
            { header: "Situação", accessor: "name", className: "text-left" },
            {
              header: "Contratos",
              accessor: "total",
              className: "text-right",
              render: (v: any) => contagem(v),
            },
          ],
        },
      },
    ] as ChartConfig[];
  }, [chartsDataRaw]);

  // 4) Tabela
  const [tableResult] = useQuery({
    query: GET_CONTRATOS_TABLE_DATA_QUERY,
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
      rows: tableDataRaw?.getContratosTable?.data ?? [],
      totalCount: tableDataRaw?.getContratosTable?.totalCount ?? 0,
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
