/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { SortConfig, TableDataItem } from '../../../../types/tables';
import { DashboardPanelTemplate } from '../../../../templates/DashboardPanelTemplate';
import { DiariasFilters } from './components/DiariasFilters';
import { DiariasTable } from './components/DiariasTable';
import { initialFilterValues } from './data/filters.config';
import { useDiariasDashboardData } from './hooks/useDiariasDashboardData';
import { formatDateForInput } from '../../../../utils/helpers';

const DashboardDiarias = () => {
  const [ generalFilters, setGeneralFilters ] = useState(initialFilterValues);
  const [ columnFilters, setColumnFilters ] = useState<Record<string, string>>({});
  const [ debouncedColumnFilters, setDebouncedColumnFilters ] = useState<Record<string, string>>({});
  const [ pagination, setPagination ] = useState({ currentPage: 1, itemsPerPage: 5 });
  const [ sort, setSort ] = useState<SortConfig<TableDataItem>>({ key: 'approvalDate', direction: 'descending' });
  const hasInitialized = useRef(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedColumnFilters(columnFilters);
      setPagination(p => ({ ...p, currentPage: 1 }));
    }, 500);
    return () => clearTimeout(handler);
  }, [ columnFilters ]);

  const {
    kpiData,
    chartConfig,
    tableData,
    lastUpdate,
    isLoading,
  } = useDiariasDashboardData({
    filters: generalFilters,
    tableFilter: debouncedColumnFilters,
    pagination,
    sort,
  });

  useEffect(() => {
    if (lastUpdate && !hasInitialized.current) {
      const currentYear = new Date().getFullYear();
      const lastUpdateYear = new Date(lastUpdate).getFullYear();

      const startYear =
        lastUpdateYear < currentYear ? lastUpdateYear : currentYear;

      const fromDate = formatDateForInput(new Date(startYear, 0, 1));
      const toDate = formatDateForInput(lastUpdate);

      setGeneralFilters({
        ...initialFilterValues,
        from: fromDate,
        to: toDate,
      });

      hasInitialized.current = true;
    }
  }, [ lastUpdate ]);


  const handleApplyFilters = useCallback((newFilters: any) => {
    setGeneralFilters(newFilters);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  }, []);

  const handleClearFilters = useCallback(() => {
    if (lastUpdate) {
      const currentYear = new Date().getFullYear();
      const lastUpdateYear = new Date(lastUpdate).getFullYear();

      const startYear =
        lastUpdateYear < currentYear ? lastUpdateYear : currentYear;

      const fromDate = formatDateForInput(new Date(startYear, 0, 1));
      const toDate = formatDateForInput(lastUpdate);

      setGeneralFilters({
        ...initialFilterValues,
        from: fromDate,
        to: toDate,
      });
    } else {
      setGeneralFilters(initialFilterValues);
    }
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  }, [ lastUpdate ]);

  const handleColumnFilterChange = useCallback((accessor: string, value: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [ accessor ]: value,
    }));
  }, []);

  const filtersComponent = useMemo(() => (
    <DiariasFilters
      initialValues={generalFilters}
      onApply={handleApplyFilters}
      onClear={handleClearFilters}
      isLoading={isLoading.isLoadingKpi}
    />
  ), [ generalFilters, isLoading, handleApplyFilters, handleClearFilters ]);

  const tableComponent = useMemo(() => (
    <DiariasTable
      data={tableData.rows}
      totalCount={tableData.totalCount}
      pagination={pagination}
      onPaginationChange={setPagination}
      sort={sort}
      onSortChange={setSort}
      isLoading={isLoading.loadingTable}
      filterValues={columnFilters}
      onFilterChange={handleColumnFilterChange as (accessor: keyof TableDataItem, value: string) => void}
    />
  ), [ tableData, pagination, sort, isLoading, columnFilters, handleColumnFilterChange ]);

  return (
    <DashboardPanelTemplate
      title="Diárias"
      description="Visualize e filtre os dados de gastos com diárias."
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

export default DashboardDiarias;
