import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { DashboardPanelTemplate } from '../../../../templates/DashboardPanelTemplate';

import { AbastecimentoFilters } from './components/Filters';
import { AbastecimentoTable } from './components/Table';
import { initialFilterValues } from './data/filters.config';
import type { SortConfig, TableDataItem } from '../../../../types/tables';
import { useAbastecimentoDashboardData } from './hooks/useAbastecimentoDashboardData';

// Função auxiliar para formatar a data no padrão YYYY-MM-DD para o input 'date'
const formatDateForInput = (dateString: string | Date): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  // Pega o ano, mês e dia em UTC para evitar deslocamento por fuso horário
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

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
  } = useAbastecimentoDashboardData({
    filters: generalFilters,
    tableFilters: debouncedColumnFilters,
    pagination,
    sort,
  });

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
      isLoading={isLoading}
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