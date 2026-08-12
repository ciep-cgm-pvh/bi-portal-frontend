/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/panels/Contratos/Dashboard/components/ContratosTable.tsx

import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { PaginationControls } from '../../../../../components/PaginationControls/PaginationControls';
import { TableSection } from '../../../../../components/TableSection/TableSection';
import type { SortConfig, TableColumn, TableDataItem } from '../../../../../types/tables';

const formatBRL = (v: any) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(v || 0));

const formatCell = (value: any): ReactNode => {
  if (value === null || value === undefined || value === '') return 'N/A';
  return formatBRL(value);
};

/** Descrição e situação costumam ser longas; o texto completo fica no title. */
const Texto = ({ value, max = 'max-w-72' }: { value: any; max?: string }) => {
  if (!value) return <>N/A</>;
  const text = String(value);
  return (
    <span className={`block ${max} truncate text-gray-600`} title={text}>
      {text}
    </span>
  );
};

const columns: TableColumn<TableDataItem>[] = [
  {
    header: 'Processo',
    accessor: 'processNumber',
    sortable: true,
    isFilterable: true,
    render: (item) => <Texto value={item.processNumber} max="max-w-44" />,
  },
  {
    header: 'Ano',
    accessor: 'year',
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
    header: 'Origem do Repasse',
    accessor: 'parliamentarian',
    sortable: true,
    isFilterable: true,
    render: (item) => <Texto value={item.parliamentarian} max="max-w-48" />,
  },
  {
    header: 'Fonte',
    accessor: 'resourceSource',
    sortable: true,
    isFilterable: true,
  },
  {
    header: 'Área',
    accessor: 'area',
    sortable: true,
    isFilterable: true,
  },
  {
    header: 'Bairro / Distrito',
    accessor: 'neighborhood',
    sortable: true,
    isFilterable: true,
    render: (item) => <Texto value={item.neighborhood} max="max-w-44" />,
  },
  {
    header: 'Descrição',
    accessor: 'description',
    sortable: false,
    isFilterable: true,
    render: (item) => <Texto value={item.description} />,
  },
  {
    header: 'Repasse',
    accessor: 'transferAmount',
    sortable: true,
    isFilterable: false,
    className: 'text-right whitespace-nowrap',
    render: (item) => formatCell(item.transferAmount),
  },
  {
    header: 'Contrapartida',
    accessor: 'counterpartAmount',
    sortable: true,
    isFilterable: false,
    className: 'text-right whitespace-nowrap',
    render: (item) => formatCell(item.counterpartAmount),
  },
  {
    header: 'Valor Global',
    accessor: 'globalAmount',
    sortable: true,
    isFilterable: false,
    className: 'text-right whitespace-nowrap',
    render: (item) => formatCell(item.globalAmount),
  },
  {
    header: 'Situação',
    accessor: 'status',
    sortable: true,
    isFilterable: true,
    render: (item) => <Texto value={item.status} max="max-w-52" />,
  },
];

interface ContratosTableProps {
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

export const ContratosTable = ({
  data,
  totalCount,
  pagination,
  onPaginationChange,
  sort,
  onSortChange,
  isLoading,
  filterValues,
  onFilterChange,
}: ContratosTableProps) => {
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
        title="Contratos de Repasses e Convênios"
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
