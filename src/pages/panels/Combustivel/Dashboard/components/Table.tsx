// Local: [seu-projeto]/AbastecimentoTable.tsx

import {  useMemo } from 'react';
import { PaginationControls } from '../../../../../components/PaginationControls/PaginationControls';
import { TableSection } from '../../../../../components/TableSection/TableSection';
import type { SortConfig, TableColumn, TableDataItem } from '../../../../../types/tables';

// --- Interface de Props ---

const columns: TableColumn<TableDataItem>[] = [
      {
        header: "Data",
        accessor: "datetime",
        sortable: true,
        dataType: "date",
        isFilterable: true,
        filterKey: "datetime"
      },
      {
        header: "Custo",
        accessor: "cost",
        sortable: true,
        dataType: "currency",
        isFilterable: true,
        filterKey: "cost"
      },
      {
        header: "Litros",
        accessor: "fuelVolume",
        sortable: true,
        dataType: "number",
        isFilterable: true,
        filterKey: "fuelVolume"
      },
      {
        header: "Tipo Combustível",
        accessor: "fuelType",
        sortable: true,
        dataType: "string",
        isFilterable: true,
        filterKey: "fuelType"
      },
      {
        header: "Motorista",
        accessor: "driverName",
        sortable: true,
        dataType: "string",
        isFilterable: true,
        filterKey: "driverName"
      },
      {
        header: "Placa",
        accessor: "vehicle.plate",
        sortable: true,
        dataType: "string",
        isFilterable: true,
        filterKey: "vehiclePlate"
      },
      {
        header: "Modelo",
        accessor: "vehicle.model",
        sortable: true,
        dataType: "string",
        isFilterable: true,
        filterKey: "vehicleModel"
      },
      {
        header: "Marca",
        accessor: "vehicle.brand",
        sortable: true,
        dataType: "string",
        isFilterable: true,
        filterKey: "vehicleBrand"
      },
      {
        header: "Posto",
        accessor: "gasStation.name",
        sortable: true,
        dataType: "string",
        isFilterable: true,
        filterKey: "gasStationName"
      },
      {
        header: "Cidade",
        accessor: "gasStation.city",
        sortable: true,
        dataType: "string",
        isFilterable: true,
        filterKey: "gasStationCity"
      },
      {
        header: "Órgão/Departamento",
        accessor: "department",
        sortable: true,
        dataType: "string",
        isFilterable: true,
        filterKey: "department"
      }
    ];

interface AbastecimentoTableProps {
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
  filterValues: { [key: string]: string };
  onFilterChange: (accessor: keyof TableDataItem, value: string) => void;
  columns: TableColumn<TableDataItem>[];
}

// --- Componente Principal ---

export const AbastecimentoTable = ({ 
  data,
  totalCount,
  pagination,
  onPaginationChange,
  sort,
  onSortChange,
  isLoading,
  filterValues,
  onFilterChange,
}: AbastecimentoTableProps) => {


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
      <TableSection<TableDataItem>
        title="Últimos abastecimentos"
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