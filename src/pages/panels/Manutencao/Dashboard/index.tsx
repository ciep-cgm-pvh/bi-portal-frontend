import { useCallback, useMemo, useState } from 'react';
import { DashboardPanelTemplate } from '../../../../templates/DashboardPanelTemplate';
import { ManutencaoFilters } from './components/ManutencaoFilters';
import { ManutencaoTable } from './components/ManutencaoTable';
import { initialFilterValues } from './data/filters.config';
import { useManutencaoDashboardData } from './hooks/useManutencaoDashboardData';
// Adicione a importação dos tipos aqui
import type { SortConfig, TableDataItem } from '../../../../types/tables';

let count_render = 0
let count_initial_requests = 0
const DashboardManutencao = () => {
  count_render++;
  console.log(`Render DashboardManutencao: ${count_render} vezes`);
  const [filters, setFilters] = useState(initialFilterValues);
  const [pagination, setPagination] = useState({ currentPage: 1, itemsPerPage: 10 });
  
  // CORREÇÃO: Tipando explicitamente o estado 'sort'
  const [sort, setSort] = useState<SortConfig<TableDataItem>>({ key: 'data', direction: 'descending' });

  // ✨ ÚNICA CHAMADA PARA BUSCAR TODOS OS DADOS! ✨
  const {
    kpiData,
    chartConfig,
    //filterOptions,
    tableData,
    lastUpdate,
    isLoading,
  } = useManutencaoDashboardData({ filters, pagination, sort });
  if (!isLoading) {
    count_initial_requests++;
    console.log(`Initial data fetch completed ${count_initial_requests} times`);
  }
  //console.log('data from useManutencaoDashboardData:', { kpiData, chartConfig, tableData, lastUpdate, isLoading });

  // Handlers para filtros

  const handleApplyFilters = useCallback((newFilters: any) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  }, []); // Array de dependências vazio, pois a função não depende de nada externo que muda

  const handleClearFilters = useCallback(() => {
    setFilters(initialFilterValues);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  }, []); // Array de dependências vazio

// 2. Memoize a instância do componente de filtros
  const filtersComponent = useMemo(() => (
    <ManutencaoFilters
      initialValues={filters}
      onApply={handleApplyFilters}
      onClear={handleClearFilters}
      isLoading={isLoading} 
    />
  ), [filters, isLoading, handleApplyFilters, handleClearFilters]);

  // 3. Memoize a instância do componente da tabela
  const tableComponent = useMemo(() => (
    <ManutencaoTable
      data={tableData.rows}
      totalCount={tableData.totalCount}
      pagination={pagination}
      onPaginationChange={setPagination}
      sort={sort}
      onSortChange={setSort}
      isLoading={isLoading} 
    />
  ), [tableData, pagination, sort, isLoading]);

  return (
    <DashboardPanelTemplate
      title="Manutenção de Veículos"
      description="Visualize e filtre os dados de gastos com manutenção de veículos."
      lastUpdate={lastUpdate}
      isLoading={isLoading}
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

export default DashboardManutencao;