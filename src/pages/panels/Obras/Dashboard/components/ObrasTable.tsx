/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/panels/Obras/Dashboard/components/ObrasTable.tsx

import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { PaginationControls } from '../../../../../components/PaginationControls/PaginationControls';
import { TableSection } from '../../../../../components/TableSection/TableSection';
import type { SortConfig, TableColumn, TableDataItem } from '../../../../../types/tables';

const formatBRL = (v: any) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(v || 0));

const formatCell = (value: any, dataType?: 'CURRENCY' | 'DATE' | 'PERCENT'): ReactNode => {
  if (value === null || value === undefined || value === '') return 'N/A';
  switch (dataType) {
    case 'CURRENCY':
      return formatBRL(value);
    case 'DATE':
      return new Date(value).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    case 'PERCENT':
      return `${Number(value).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}%`;
    default:
      return value;
  }
};

const ExecutionBar = ({ value }: { value: any }) => {
  const percent = Math.min(Math.max(Number(value || 0), 0), 100);
  return (
    <div className="flex items-center gap-2 min-w-32">
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="text-xs text-gray-600 tabular-nums">
        {formatCell(value, 'PERCENT')}
      </span>
    </div>
  );
};

const columns: TableColumn<TableDataItem>[] = [
  {
    header: 'Obra',
    accessor: 'name',
    sortable: true,
    isFilterable: true,
  },
  {
    header: 'Secretaria',
    accessor: 'departmentCode',
    sortable: true,
    isFilterable: true,
  },
  {
    header: 'Empresa Contratada',
    accessor: 'contractor',
    sortable: true,
    isFilterable: true,
  },
  {
    header: 'Bairro',
    accessor: 'neighborhood',
    sortable: true,
    isFilterable: true,
  },
  {
    header: 'Valor Contratado',
    accessor: 'contractedAmount',
    sortable: true,
    isFilterable: true,
    render: (item) => formatCell(item.contractedAmount, 'CURRENCY'),
  },
  {
    header: 'Valor Pago',
    accessor: 'paidAmount',
    sortable: true,
    isFilterable: true,
    render: (item) => formatCell(item.paidAmount, 'CURRENCY'),
  },
  {
    header: 'Execução',
    accessor: 'executionPercentage',
    sortable: true,
    isFilterable: false,
    render: (item) => <ExecutionBar value={item.executionPercentage} />,
  },
  {
    header: 'Início',
    accessor: 'startDate',
    sortable: true,
    isFilterable: true,
    render: (item) => formatCell(item.startDate, 'DATE'),
  },
  {
    header: 'Previsão de Término',
    accessor: 'expectedEndDate',
    sortable: true,
    isFilterable: true,
    render: (item) => formatCell(item.expectedEndDate, 'DATE'),
  },
  {
    header: 'Status',
    accessor: 'status',
    sortable: true,
    isFilterable: true,
  },
];

interface ObrasTableProps {
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

export const ObrasTable = ({
  data,
  totalCount,
  pagination,
  onPaginationChange,
  sort,
  onSortChange,
  isLoading,
  filterValues,
  onFilterChange,
}: ObrasTableProps) => {
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
        title="Acompanhamento de Obras"
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
