
import { PaginationControls } from '../../../../../components/PaginationControls/PaginationControls';
import { TableSection } from '../../../../../components/TableSection/TableSection';
import type { TableColumn, TableDataItem } from '../../../../../types/tables';
import { useAbastecimentoData } from '../hooks/useAbastecimentoData';


const columns: TableColumn<TableDataItem>[] = [
  { header: 'Data', accessor: 'date', sortable: true },
  { header: 'Veículo', accessor: 'vehicle', sortable: true },
  { header: 'Motorista', accessor: 'driver', sortable: false },
  { header: 'Custo', accessor: 'cost', sortable: true, render: (item) => `R$ ${item.cost.toFixed(2)}` },
  { header: 'Status', accessor: 'status', sortable: true },
];

export const AbastecimentoTable = () => {
  const { processedData, sortConfig, currentPage, totalPages, handleSort, onPageChange } = useAbastecimentoData();

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