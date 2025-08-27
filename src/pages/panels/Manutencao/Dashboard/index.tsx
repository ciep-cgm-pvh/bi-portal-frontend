import { useState } from 'react';
import { DashboardPanelTemplate } from '../../../../templates/DashboardPanelTemplate';
import { ManutencaoFilters } from './components/ManutencaoFilters';
import { ManutencaoTable } from './components/ManutencaoTable';
import { useManutencaoDashboardData } from './hooks/useManutencaoDashboardData';
import { initialFilterValues } from './data/filters.config';
// Adicione a importação dos tipos aqui
import type { SortConfig, TableDataItem } from '../../../../types/tables';

const DashboardManutencao = () => {
  const [filters, setFilters] = useState(initialFilterValues);
  const [pagination, setPagination] = useState({ currentPage: 1, itemsPerPage: 10 });
  
  // CORREÇÃO: Tipando explicitamente o estado 'sort'
  const [sort, setSort] = useState<SortConfig<TableDataItem>>({ key: 'data', direction: 'descending' });

  // ✨ ÚNICA CHAMADA PARA BUSCAR TODOS OS DADOS! ✨
  const {
    kpiData,
    chartConfig,
    filterOptions,
    tableData,
    lastUpdate,
    isLoading,
  } = useManutencaoDashboardData({ filters, pagination, sort });
  console.log('data from useManutencaoDashboardData:', { kpiData, chartConfig, filterOptions, tableData, lastUpdate, isLoading });

  // Handlers para filtros

  const handleApplyFilters = (newFilters: any) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, currentPage: 1 })); // Reseta a paginação ao aplicar filtros
  };

  const handleClearFilters = () => {
    setFilters(initialFilterValues);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  return (
    <DashboardPanelTemplate
      title="Manutenção de Veículos"
      description="Visualize e filtre os dados de gastos com manutenção de veículos."
      lastUpdate={lastUpdate}
      isLoading={isLoading} // Adiciona um estado de loading geral
      kpiData={kpiData}
      chartConfig={chartConfig}
      filtersComponent={<ManutencaoFilters
        initialValues={filters}
        options={filterOptions} // Passa as opções para o componente de filtro
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
        isLoading={isLoading} />}
      tableComponent={<ManutencaoTable
        data={tableData.rows}
        totalCount={tableData.totalCount}
        pagination={pagination}
        onPaginationChange={setPagination}
        sort={sort} // Agora o tipo corresponde
        onSortChange={setSort} // E o setter também
        isLoading={isLoading} />} mockData={false} panelStatus={false} panelStatusPhasesData={{}}    />
  );
};

export default DashboardManutencao;