/* eslint-disable @typescript-eslint/no-explicit-any */
// Local: src/pages/panels/Diarias/Dashboard/components/DiariasTable.tsx

import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { PaginationControls } from '../../../../../components/PaginationControls/PaginationControls';
import { TableSection } from '../../../../../components/TableSection/TableSection';
import type { SortConfig, TableColumn, TableDataItem } from '../../../../../types/tables';

// Helpers
const formatBRL = (v: any) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(v || 0));

const formatCell = (value: any, dataType?: 'CURRENCY' | 'DATE'): ReactNode => {
  if (value === null || typeof value === 'undefined' || value === '') return 'N/A';
  switch (dataType) {
    case 'CURRENCY':
      return formatBRL(value);
    case 'DATE':
      return new Date(value).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    default:
      return value;
  }
};

// Colunas para DIÁRIAS (acessores devem bater com getDiariasTable)
const columns: TableColumn<TableDataItem>[] = [
  {
    header: 'Nº Processo',
    accessor: 'processNumber',
    sortable: true,
    isFilterable: true,
  },
  {
    header: 'Servidor',
    accessor: 'employee',
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
    header: 'Status',
    accessor: 'status',
    sortable: true,
    isFilterable: true,
  },
  {
    header: 'Concedido',
    accessor: 'amountGranted',
    sortable: true,
    isFilterable: false,
    render: (item) => formatCell(item.amountGranted, 'CURRENCY'),
  },
  {
    header: 'Dt. Pagamento',
    accessor: 'paymentDate',
    sortable: true,
    isFilterable: false,
    render: (item) => formatCell(item.paymentDate, 'DATE'),
  },
];

// **********************************************
// ********* INTERFACE QUE ESTAVA FALTANDO *******
// **********************************************
interface DiariasTableProps {
  data: TableDataItem[];
  totalCount: number;
  pagination: {
    currentPage: number;
    itemsPerPage: number;
  };
  onPaginationChange: (pagination: { currentPage: number; itemsPerPage: number }) => void;
  sort: SortConfig<TableDataItem>;
  onSortChange: (sort: SortConfig<TableDataItem>) => void;
  isLoading: boolean;
  filterValues: { [key: string]: string };
  onFilterChange: (accessor: keyof TableDataItem, value: string) => void;
}
// **********************************************

export const DiariasTable = ({
  data,
  totalCount,
  pagination,
  onPaginationChange,
  sort,
  onSortChange,
  isLoading,
  filterValues,
  onFilterChange,
}: DiariasTableProps) => {
  const totalPages = useMemo(() => {
    return Math.ceil((totalCount || 0) / pagination.itemsPerPage);
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
        title="Histórico de Diárias"
        columns={columns}
        data={data}
        isLoading={isLoading}
        sortConfig={sort}
        onSort={handleSort}
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