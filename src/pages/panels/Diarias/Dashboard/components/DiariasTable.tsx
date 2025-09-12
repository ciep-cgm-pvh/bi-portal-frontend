// Local: src/pages/panels/Diarias/Dashboard/components/DiariasTable.tsx

import type { ReactNode } from 'react';
// 1. Importe o useState
import { useMemo } from 'react';
import { PaginationControls } from '../../../../../components/PaginationControls/PaginationControls';
import { TableSection } from '../../../../../components/TableSection/TableSection';
import type { SortConfig, TableColumn, TableDataItem } from '../../../../../types/tables';

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
  {
    header: 'OS',
    accessor: 'os',
    sortable: true,
    isFilterable: true,
  },
  {
    header: 'Secretaria',
    accessor: 'department',
    sortable: true,
    isFilterable: true,
  },
  {
    header: 'Placa',
    accessor: 'plate',
    sortable: true,
    isFilterable: true
  },
  {
    header: 'Data',
    accessor: 'datetime',
    sortable: true,
    isFilterable: true,
    render: (item) => item.datetime
  },
  {
    header: 'Categoria',
    accessor: 'categoryOs',
    sortable: true,
    isFilterable: true,
  },
  {
    header: 'Custo Total',
    accessor: 'totalCost',
    sortable: true,
    isFilterable: true,
    render: (item) => formatCell(item.totalCost, 'CURRENCY')
  },
];
// =================================================================

interface DiariasTableProps {
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
  // Adicione estas duas props
  filterValues: { [key: string]: string };
  onFilterChange: (accessor: keyof TableDataItem, value: string) => void;
}

export const DiariasTable = ({
  data,
  totalCount,
  pagination,
  onPaginationChange,
  sort,
  onSortChange,
  isLoading,
  filterValues,
  onFilterChange
}: DiariasTableProps) => {


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
        // 3. USE OS DADOS DIRETAMENTE DA PROP `data`
        data={data}
        isLoading={isLoading}
        sortConfig={sort}
        onSort={handleSort}
        // 4. PASSE AS PROPS DE FILTRO RECEBIDAS
        filterValues={filterValues}
        onFilterChange={onFilterChange}
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