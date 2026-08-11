/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useState } from "react";
import { DashboardPanelTemplate } from "../../../../templates/DashboardPanelTemplate";
import type { SortConfig, TableDataItem } from "../../../../types/tables";
import { ObrasFilters } from "./components/ObrasFilters";
import { ObrasTable } from "./components/ObrasTable";
import { initialFilterValues } from "./data/filters.config";
import { useObrasDashboardData } from "./hooks/useObrasDashboardData";

const DashboardObras = () => {
  const [generalFilters, setGeneralFilters] = useState(initialFilterValues);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [debouncedColumnFilters, setDebouncedColumnFilters] = useState<Record<string, string>>({});
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 5,
  });
  const [sort, setSort] = useState<SortConfig<TableDataItem>>({
    key: "empenhoDate",
    direction: "descending",
  });
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedColumnFilters(columnFilters);
      setPagination((p) => ({ ...p, currentPage: 1 }));
    }, 500);
    return () => clearTimeout(handler);
  }, [columnFilters]);

  const { kpiData, chartConfig, tableData, lastUpdate, isLoading } =
    useObrasDashboardData({
      filters: generalFilters,
      tableFilter: debouncedColumnFilters,
      pagination,
      sort,
    });

  // Diferente dos demais painéis, Obras abre com o período completo (2023 em
  // diante). Uma obra atravessa exercícios, então restringir ao ano corrente
  // esconderia a maior parte da execução acumulada.
  const handleApplyFilters = useCallback((newFilters: any) => {
    setGeneralFilters(newFilters);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setGeneralFilters(initialFilterValues);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  }, []);

  const handleColumnFilterChange = useCallback(
    (accessor: string, value: string) => {
      setColumnFilters((prev) => ({
        ...prev,
        [accessor]: value,
      }));
    },
    []
  );

  const filtersComponent = useMemo(
    () => (
      <ObrasFilters
        initialValues={generalFilters}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
        isLoading={isLoading.isLoadingKpi}
      />
    ),
    [generalFilters, isLoading, handleApplyFilters, handleClearFilters]
  );

  const tableComponent = useMemo(
    () => (
      <ObrasTable
        data={tableData.rows}
        totalCount={tableData.totalCount}
        pagination={pagination}
        onPaginationChange={setPagination}
        sort={sort}
        onSortChange={setSort}
        isLoading={isLoading.loadingTable}
        filterValues={columnFilters}
        onFilterChange={
          handleColumnFilterChange as (
            accessor: keyof TableDataItem,
            value: string
          ) => void
        }
      />
    ),
    [
      tableData,
      pagination,
      sort,
      isLoading,
      columnFilters,
      handleColumnFilterChange,
    ]
  );

  return (
    <DashboardPanelTemplate
      title="Obras"
      description="Execução orçamentária de obras e serviços de engenharia, por empenho."
      lastUpdate={lastUpdate}
      isLoading={isLoading.isLoadingKpi}
      kpiData={kpiData}
      chartConfig={chartConfig}
      filtersComponent={filtersComponent}
      tableComponent={tableComponent}
      mockData={false}
      panelStatus={false}
      panelStatusPhasesData={{}}
    />
  );
};

export default DashboardObras;
