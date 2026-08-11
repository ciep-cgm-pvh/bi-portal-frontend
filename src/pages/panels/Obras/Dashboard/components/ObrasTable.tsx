/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/panels/Obras/Dashboard/components/ObrasTable.tsx

import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { PaginationControls } from '../../../../../components/PaginationControls/PaginationControls';
import { TableSection } from '../../../../../components/TableSection/TableSection';
import type { SortConfig, TableColumn, TableDataItem } from '../../../../../types/tables';

const formatBRL = (v: any) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(v || 0));

const formatCell = (value: any, dataType?: 'CURRENCY' | 'DATE'): ReactNode => {
  if (value === null || value === undefined || value === '') return 'N/A';
  switch (dataType) {
    case 'CURRENCY':
      return formatBRL(value);
    case 'DATE':
      return new Date(value).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    default:
      return value;
  }
};

/**
 * O "Histórico Empenho" costuma ter parágrafos inteiros. Mostramos um trecho
 * e deixamos o texto completo no title, acessível ao passar o mouse.
 */
const Subject = ({ value }: { value: any }) => {
  if (!value) return <>N/A</>;
  const text = String(value);
  return (
    <span className="block max-w-80 truncate text-gray-600" title={text}>
      {text}
    </span>
  );
};

const columns: TableColumn<TableDataItem>[] = [
  {
    header: 'Nº Empenho',
    accessor: 'empenhoNumber',
    sortable: true,
    isFilterable: true,
  },
  {
    header: 'Data',
    accessor: 'empenhoDate',
    sortable: true,
    isFilterable: true,
    render: (item) => formatCell(item.empenhoDate, 'DATE'),
  },
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
    header: 'Credor',
    accessor: 'creditor',
    sortable: true,
    isFilterable: true,
  },
  {
    header: 'Programa',
    accessor: 'program',
    sortable: true,
    isFilterable: true,
  },
  {
    header: 'Atividade / Projeto',
    accessor: 'projectActivity',
    sortable: true,
    isFilterable: true,
  },
  {
    header: 'Assunto',
    accessor: 'subject',
    sortable: false,
    isFilterable: true,
    render: (item) => <Subject value={item.subject} />,
  },
  {
    header: 'Empenhado',
    accessor: 'committedAmount',
    sortable: true,
    isFilterable: false,
    className: 'text-right whitespace-nowrap',
    render: (item) => formatCell(item.committedAmount, 'CURRENCY'),
  },
  {
    header: 'Liquidado',
    accessor: 'settledAmount',
    sortable: true,
    isFilterable: false,
    className: 'text-right whitespace-nowrap',
    render: (item) => formatCell(item.settledAmount, 'CURRENCY'),
  },
  {
    header: 'Pago',
    accessor: 'paidAmount',
    sortable: true,
    isFilterable: false,
    className: 'text-right whitespace-nowrap',
    render: (item) => formatCell(item.paidAmount, 'CURRENCY'),
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
        title="Empenhos de Obras e Serviços de Engenharia"
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
