// Local: src/pages/panels/Manutencao/Dashboard/components/ManutencaoTable.tsx

import type { ReactNode } from 'react';
// 1. Importe o useState
import { useMemo, useState } from 'react';
import { PaginationControls } from '../../../../../components/PaginationControls/PaginationControls';
import { TableSection } from '../../../../../components/TableSection/TableSection';
import type { TableColumn, TableDataItem, SortConfig } from '../../../../../types/tables';

// Funções Helper e Colunas (sem alterações)
const formatCell = (value: any, dataType?: string): ReactNode => {
    if (value === null || typeof value === 'undefined') return 'N/A';
    switch (dataType) {
        case 'CURRENCY':
            return `R$ ${Number(value).toFixed(2).replace('.', ',')}`;
        case 'DATE':
            return new Date(value).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
        default:
            return value;
    }
};

const columns: TableColumn<TableDataItem>[] = [
    { header: 'OS', accessor: 'os', sortable: true, isFilterable: true },
    { header: 'Secretaria', accessor: 'secretaria', sortable: true, isFilterable: true },
    { header: 'Placa', accessor: 'placa', sortable: true, isFilterable: true },
    { header: 'Data', accessor: 'data', sortable: true, render: (item) => formatCell(item.data, 'DATE') },
    { header: 'Categoria', accessor: 'categoriaOs', sortable: true, isFilterable: true },
    { header: 'Custo Total', accessor: 'total', sortable: true, render: (item) => formatCell(item.total, 'CURRENCY') },
];
// =================================================================

interface ManutencaoTableProps {
  data: TableDataItem[];
  totalCount: number;
  pagination: {
    currentPage: number;
    itemsPerPage: number;
  };
  onPaginationChange: (pagination: { currentPage: number; itemsPerPage: number; }) => void;
  sort: SortConfig<TableDataItem>;
  onSortChange: (sort: SortConfig<TableDataItem>) => void;
  isLoading: boolean;
}

export const ManutencaoTable = ({
  data,
  totalCount,
  pagination,
  onPaginationChange,
  sort,
  onSortChange,
  isLoading
}: ManutencaoTableProps) => {

  // 2. Adicione um estado para os filtros de coluna
  const [columnFilters, setColumnFilters] = useState<{ [key: string]: string }>({});

  // 3. Crie um handler para atualizar os filtros de coluna
  const handleColumnFilterChange = (accessor: keyof TableDataItem, value: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [accessor as string]: value,
    }));
  };

  // 4. Filtre os dados localmente com base nos filtros de coluna
  const filteredData = useMemo(() => {
    return data.filter(item => {
      return Object.entries(columnFilters).every(([key, value]) => {
        if (!value) return true; // Se o filtro estiver vazio, não filtra
        const itemValue = item[key];
        return String(itemValue).toLowerCase().includes(value.toLowerCase());
      });
    });
  }, [data, columnFilters]);


  // O resto da lógica permanece o mesmo
  const totalPages = useMemo(() => {
    return Math.ceil(totalCount / pagination.itemsPerPage);
  }, [totalCount, pagination.itemsPerPage]);

  const handlePageChange = (newPage: number) => {
    onPaginationChange({ ...pagination, currentPage: newPage });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    onPaginationChange({ currentPage: 1, itemsPerPage: newItemsPerPage });
  };

  const handleSort = (key: keyof TableDataItem) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sort.key === key && sort.direction === 'ascending') {
        direction = 'descending';
    }
    onSortChange({ key, direction });
  };

  return (
    <div className="shadow-md rounded-lg">
      <TableSection
        title="Ordens de Serviço Recentes"
        columns={columns}
        // 5. Passe os dados filtrados para a tabela
        data={filteredData}
        isLoading={isLoading}
        sortConfig={sort}
        onSort={handleSort}
        // 6. Passe as props de filtro para o TableSection
        filterValues={columnFilters}
        onFilterChange={handleColumnFilterChange}
      />
      <PaginationControls
        currentPage={pagination.currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        itemsPerPage={pagination.itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        totalItems={totalCount}
      />
    </div>
  );
};