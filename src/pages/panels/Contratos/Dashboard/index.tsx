/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useState } from "react";
import { DashboardPanelTemplate } from "../../../../templates/DashboardPanelTemplate";
import type { SortConfig, TableDataItem } from "../../../../types/tables";
import { ContratosFilters } from "./components/ContratosFilters";
import { ContratosTable } from "./components/ContratosTable";
import { initialFilterValues } from "./data/filters.config";
import { useContratosDashboardData } from "./hooks/useContratosDashboardData";

const DashboardContratos = () => {
  const [generalFilters, setGeneralFilters] = useState(initialFilterValues);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [debouncedColumnFilters, setDebouncedColumnFilters] = useState<Record<string, string>>({});
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 5,
  });
  const [sort, setSort] = useState<SortConfig<TableDataItem>>({
    key: "globalAmount",
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
    useContratosDashboardData({
      filters: generalFilters,
      tableFilter: debouncedColumnFilters,
      pagination,
      sort,
    });

  // Abre com todo o período: são convênios plurianuais, e restringir a um
  // ano esconderia a maior parte do que ja foi repassado.
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
      <ContratosFilters
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
      <ContratosTable
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
      title="Contratos de Repasses e Convênios"
      description="Repasses e convênios firmados pelo município, com contrapartida e valor global."
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

export default DashboardContratos;
