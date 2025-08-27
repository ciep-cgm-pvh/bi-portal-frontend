import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { PaginationControls } from '../../../../../components/PaginationControls/PaginationControls';
import { TableSection } from '../../../../../components/TableSection/TableSection';
import type { TableColumn, TableDataItem, SortConfig } from '../../../../../types/tables';

// =================================================================
// FUNÇÕES HELPER E DEFINIÇÃO DE COLUNAS
// =================================================================

// Função para formatar a célula permanece a mesma
const formatCell = (value: any, dataType?: string): ReactNode => {
    if (value === null || typeof value === 'undefined') return 'N/A';
    switch (dataType) {
        case 'CURRENCY':
            return `R$ ${Number(value).toFixed(2).replace('.', ',')}`;
        case 'DATE':
            // Ajuste para formatar a data corretamente
            return new Date(value).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
        default:
            return value;
    }
};

// Colunas definidas estaticamente com base na sua solicitação
const columns: TableColumn<TableDataItem>[] = [
    { header: 'OS', accessor: 'os', sortable: true },
    { header: 'Secretaria', accessor: 'secretaria', sortable: true },
    { header: 'Placa', accessor: 'placa', sortable: true },
    { header: 'Data', accessor: 'data', sortable: true, render: (item) => formatCell(item.data, 'DATE') },
    { header: 'Categoria', accessor: 'categoriaOs', sortable: true },
    { header: 'Custo Total', accessor: 'total', sortable: true, render: (item) => formatCell(item.total, 'CURRENCY') },
];

// =================================================================
// PROPS DO COMPONENTE
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

// =================================================================
// COMPONENTE PRINCIPAL
// =================================================================
export const ManutencaoTable = ({
  data,
  totalCount,
  pagination,
  onPaginationChange,
  sort,
  onSortChange,
  isLoading
}: ManutencaoTableProps) => {

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
        data={data}
        isLoading={isLoading}
        sortConfig={sort}
        onSort={handleSort}
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