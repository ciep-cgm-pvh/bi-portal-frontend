
import { PaginationControls } from '../../../../../components/PaginationControls/PaginationControls';
import { TableSection } from '../../../../../components/TableSection/TableSection';
import type { TableColumn, TableDataItem } from '../../../../../types/tables';
import { useDiariasData } from '../hooks/useDiariasData';

const columns: TableColumn<TableDataItem>[] = [
  { header: 'Nº Processo', accessor: 'processo',  sortable: true},
  { header: 'Órgão', accessor: 'orgao', sortable: true },
  { header: 'Data Pagamento', accessor: 'dataPagamento', sortable: true },
  { header: 'Funcionário', accessor: 'funcionario', sortable: true },
  { header: 'Valor Concedido', accessor: 'valorConcedido', sortable: true, render: (item) => `R$ ${item.valorConcedido.toFixed(2)}` },
  { header: 'Situação', accessor: 'situacao', sortable: true },
];

export const Table = () => {
  const { processedData, sortConfig, currentPage, totalPages, handleSort, onPageChange } = useDiariasData();

  return (
    <>
      <TableSection
        title="Últimos Abastecimentos"
        columns={columns}
        data={processedData}
        sortConfig={sortConfig}
        onSort={handleSort}
      />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
};