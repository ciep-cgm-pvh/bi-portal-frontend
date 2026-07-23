/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/panels/Suprimentos/Dashboard/components/SuprimentosTable.tsx

import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { PaginationControls } from '../../../../../components/PaginationControls/PaginationControls';
import { TableSection } from '../../../../../components/TableSection/TableSection';
import type { SortConfig, TableColumn, TableDataItem } from '../../../../../types/tables';

// Helpers
const formatBRL = (v: any) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(v || 0));

const formatCell = (value: any, dataType?: 'CURRENCY' | 'DATE'): ReactNode => {
  if (value === null || value === '') return 'N/A';
  switch (dataType) {
    case 'CURRENCY':
      return formatBRL(value);
    case 'DATE':
      return new Date(value).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    default:
      return value;
  }
};

// Colunas para SUPRIMENTOS
const columns: TableColumn<TableDataItem>[] = [
  {
    header: 'Secretaria',
    accessor: 'departmentCode',
    sortable: true,
    isFilterable: true,
  },
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
    header: 'Concedido',
    accessor: 'grantedAmount',
    sortable: true,
    isFilterable: true,
    render: (item) => formatCell(item.grantedAmount, 'CURRENCY'),
  },
  {
    header: 'Data de Aprovação',
    accessor: 'approvalDate',
    sortable: true,
    isFilterable: true,
    render: (item) => item.approvalDate,
  },
  {
    header: 'Status',
    accessor: 'status',
    sortable: true,
    isFilterable: true,
  },
];

interface SuprimentosTableProps {
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

export const SuprimentosTable = ({
  data,
  totalCount,
  pagination,
  onPaginationChange,
  sort,
  onSortChange,
  isLoading,
  filterValues,
  onFilterChange,
}: SuprimentosTableProps) => {
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
        title="Histórico de Suprimentos de Fundos"
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
