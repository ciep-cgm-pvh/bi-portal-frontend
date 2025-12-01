import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DashboardPanelTemplate } from '../../../../templates/DashboardPanelTemplate';

import { AbastecimentoFilters } from './components/Filters';
import { AbastecimentoTable } from './components/Table';
import { initialFilterValues } from './data/filters.config';
import type { SortConfig, TableDataItem } from '../../../../types/tables';
import { useAbastecimentoDashboardData } from './hooks/useAbastecimentoDashboardData';
import { formatDateForInput } from '../../../../utils/helpers';

const DashboardCombustivel = () => {
  // --- Estados do Painel ---
  const [generalFilters, setGeneralFilters] = useState(initialFilterValues);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [debouncedColumnFilters, setDebouncedColumnFilters] = useState<Record<string, string>>({});
  const [pagination, setPagination] = useState({ currentPage: 1, itemsPerPage: 10 });
  const [sort, setSort] = useState<SortConfig<TableDataItem>>({ key: 'data', direction: 'descending' });
  const hasInitialized = useRef(false);


  // O efeito de debounce permanece o mesmo, está perfeito.
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedColumnFilters(columnFilters);
      setPagination(p => ({ ...p, currentPage: 1 }));
    }, 500);

    return () => clearTimeout(handler);
  }, [columnFilters]);

  // 4. PASSE OS FILTROS SEPARADAMENTE PARA O HOOK
  const {
    kpiData,
    chartConfig,
    tableData,
    lastUpdate,
    columns,
    isLoading,
    error,
  } = useAbastecimentoDashboardData({
    filters: generalFilters,
    tableFilters: debouncedColumnFilters,
    pagination,
    sort,
  });

  if (error) {
    console.error('Erro ao carregar dados do dashboard:', error);
  }

  useEffect(() => {
    // Roda apenas se 'lastUpdate' existir E se a inicialização ainda não ocorreu
    if (lastUpdate && !hasInitialized.current) {
      const currentYear = new Date().getFullYear();
      const firstDayOfYear = formatDateForInput(new Date(currentYear, 0, 1));
      const lastUpdateDate = formatDateForInput(lastUpdate);

      setGeneralFilters({
        ...initialFilterValues,
        from: firstDayOfYear,
        to: lastUpdateDate,
      });
      hasInitialized.current = true;
    }
  }, [lastUpdate]); 
  
  // Handlers para filtros GERAIS (sem alterações)
  const handleApplyFilters = useCallback((newFilters: any) => {
    setGeneralFilters(newFilters);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  }, []);

  const handleClearFilters = () => {
    if (lastUpdate) {
        const currentYear = new Date().getFullYear();
        const firstDayOfYear = formatDateForInput(new Date(currentYear, 0, 1));
        const lastUpdateDate = formatDateForInput(lastUpdate);
        setGeneralFilters({
            ...initialFilterValues,
            from: firstDayOfYear,
            to: lastUpdateDate,
        });
    } else {
        setGeneralFilters(initialFilterValues);
    }
  }; 

  const handleColumnFilterChange = useCallback((accessor: string, value: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [accessor]: value,
    }));
  }, []);

  const filterComponent = useMemo(() => (
    <AbastecimentoFilters
      isLoading={isLoading.loadingKpi}
      initialValues={generalFilters}
      onApply={handleApplyFilters}
      onClear={handleClearFilters}
    />
  ), [generalFilters, isLoading, handleApplyFilters, handleClearFilters])

  const tableComponent = useMemo(() => (
    <AbastecimentoTable 
      data={tableData.rows}
      columns={columns}
      totalCount={tableData.totalCount}
      pagination={pagination}
      onPaginationChange={setPagination}
      sort={sort}
      onSortChange={setSort}
      isLoading={isLoading.loadingTable}
      filterValues={columnFilters} 
      onFilterChange={handleColumnFilterChange as (accessor: keyof TableDataItem, value: string) => void}
    />
  ), [tableData, pagination, sort, isLoading, columnFilters, handleColumnFilterChange])
  
  return (
    <DashboardPanelTemplate
      mockData={false}
      panelStatus={false}
      panelStatusPhasesData={{}}
      title="Abastecimento"
      description="Visualize e filtre os dados de gastos com combustível."
      lastUpdate={lastUpdate}
      kpiData={kpiData}
      chartConfig={chartConfig}
      filtersComponent={filterComponent}
      tableComponent={tableComponent}

    />
  );
};

export default DashboardCombustivel;