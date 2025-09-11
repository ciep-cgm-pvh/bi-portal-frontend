/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { SortConfig, TableDataItem } from '../../../../types/tables';
import { DashboardPanelTemplate } from '../../../../templates/DashboardPanelTemplate';
import { ManutencaoFilters } from './components/ManutencaoFilters';
import { ManutencaoTable } from './components/ManutencaoTable';
import { initialFilterValues } from './data/filters.config';
import { useManutencaoDashboardData } from './hooks/useManutencaoDashboardData';

const DashboardManutencao = () => {
  // --- Estados do Painel ---
  const [generalFilters, setGeneralFilters] = useState(initialFilterValues);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [debouncedColumnFilters, setDebouncedColumnFilters] = useState<Record<string, string>>({});
  const [pagination, setPagination] = useState({ currentPage: 1, itemsPerPage: 10 });
  const [sort, setSort] = useState<SortConfig<TableDataItem>>({ key: 'data', direction: 'descending' });


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
    isLoading,
  } = useManutencaoDashboardData({
    filters: generalFilters,
    tableFilter: debouncedColumnFilters,
    pagination,
    sort,
  });


  // Handlers para filtros GERAIS (sem alterações)
  const handleApplyFilters = useCallback((newFilters: any) => {
    setGeneralFilters(newFilters);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setGeneralFilters(initialFilterValues);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  }, []);

  // 5. CRIE O HANDLER PARA ATUALIZAR OS FILTROS DA COLUNA
  const handleColumnFilterChange = useCallback((accessor: string, value: string) => {
    // Atualiza o estado "ao vivo" dos filtros da coluna a cada tecla digitada
    setColumnFilters(prev => ({
      ...prev,
      [accessor]: value,
    }));
  }, []);

  // Memoização dos componentes (sem grandes alterações, apenas passando novas props)
  const filtersComponent = useMemo(() => (
    <ManutencaoFilters
      initialValues={generalFilters}
      onApply={handleApplyFilters}
      onClear={handleClearFilters}
      isLoading={isLoading}
    />
  ), [generalFilters, isLoading, handleApplyFilters, handleClearFilters]);

  const tableComponent = useMemo(() => (
    <ManutencaoTable
      data={tableData.rows}
      totalCount={tableData.totalCount}
      pagination={pagination}
      onPaginationChange={setPagination}
      sort={sort}
      onSortChange={setSort}
      isLoading={isLoading}
      // 6. PASSE O ESTADO DO FILTRO E O HANDLER PARA A TABELA
      filterValues={columnFilters} // Passa o estado "ao vivo" para os inputs da tabela
      onFilterChange={handleColumnFilterChange as (accessor: keyof TableDataItem, value: string) => void} // Passa a função para a tabela chamar quando um filtro mudar
    />
  ), [tableData, pagination, sort, isLoading, columnFilters, handleColumnFilterChange]); // Adicione as novas dependências

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