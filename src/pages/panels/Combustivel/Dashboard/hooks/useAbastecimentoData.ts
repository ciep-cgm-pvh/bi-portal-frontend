import { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import type { SortConfig, TableDataItem } from '../../../../../types/tables';
import { prepareGqlFilters } from '../utils/filter.utils';

// Mock dos dados brutos
const mockAbastecimentoData: TableDataItem[] = [
  { id: 1, date: '2025-08-01', vehicle: 'Fiat Strada', driver: 'João Silva', cost: 250.75, status: 'Aprovado' },
  { id: 2, date: '2025-08-01', vehicle: 'VW Gol', driver: 'Maria Santos', cost: 180.50, status: 'Aprovado' },
  { id: 3, date: '2025-08-02', vehicle: 'Honda Civic', driver: 'Pedro Almeida', cost: 320.00, status: 'Pendente' },
  { id: 4, date: '2025-08-03', vehicle: 'Fiat Strada', driver: 'João Silva', cost: 260.10, status: 'Rejeitado' },
  // ... adicione mais 10 a 15 linhas para testar a paginação
  { id: 5, date: '2025-08-04', vehicle: 'Toyota Corolla', driver: 'Ana Costa', cost: 300.00, status: 'Aprovado' },
  { id: 6, date: '2025-08-05', vehicle: 'Chevrolet Onix', driver: 'Carlos Souza', cost: 220.00, status: 'Pendente' },
  { id: 7, date: '2025-08-06', vehicle: 'Ford Fiesta', driver: 'Lucia Martins', cost: 190.00, status: 'Rejeitado' },
  { id: 8, date: '2025-08-07', vehicle: 'Hyundai HB20', driver: 'Roberto Lima', cost: 280.00, status: 'Aprovado' },
  { id: 9, date: '2025-08-08', vehicle: 'Nissan Versa', driver: 'Fernanda Rocha', cost: 230.00, status: 'Pendente' },
  { id: 10, date: '2025-08-09', vehicle: 'Kia Picanto', driver: 'Marcos Pereira', cost: 210.00, status: 'Rejeitado' },
  { id: 11, date: '2025-08-10', vehicle: 'Volkswagen Polo', driver: 'Sofia Almeida', cost: 240.00, status: 'Aprovado' },
  { id: 12, date: '2025-08-11', vehicle: 'Fiat Argo', driver: 'Gustavo Silva', cost: 270.00, status: 'Pendente' },
  { id: 13, date: '2025-08-12', vehicle: 'Renault Kwid', driver: 'Clara Santos', cost: 200.00, status: 'Rejeitado' },
  { id: 14, date: '2025-08-13', vehicle: 'Peugeot 208', driver: 'Tiago Costa', cost: 260.00, status: 'Aprovado' },
  { id: 15, date: '2025-08-14', vehicle: 'Citroën C3', driver: 'Isabela Martins', cost: 220.00, status: 'Pendente' },
];

// Exemplo de query para buscar os dados da tabela
const GET_ABASTECIMENTO_QUERY = `
  query GetAbastecimentos(
  $limit: Int,
  $offset: Int,
  $sortBy: String,
  $sortDirection: String,
  $filters: AbastecimentoFiltersInput
) {
  abastecimentos(
    limit: $limit,
    offset: $offset,
    sortBy: $sortBy,
    sortDirection: $sortDirection,
    filters: $filters
  ) {
    id
    datetime
    cost
    fuelVolume
    fuelType
    driverName

    vehicle {
      plate
      model
      brand
    }

    gasStation {
      name
      city
    }

    department
    costCenter
  }

  # abastecimentosCount(filters: $filters)
}

# O backend precisaria definir um tipo de input para os filtros
# conforme as novas opções disponíveis:
#
# input AbastecimentoFiltersInput {
#   dateRange: DateRangeInput

#   fuelType: [String!]
#   driverName: String
#   department: [String!]
#   vehiclePlate: [String!]
#   vehicleModel: [String!]
#   gasStationCity: [String!]
#   gasStationName: [String!]
# }
#
# input DateRangeInput {
#   from: DateTime!
#   to: DateTime!
# }
`;

const ITEMS_PER_PAGE = 5;

export const useAbastecimentoData = ({ filters }: { filters: any }) => {
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ sortConfig, setSortConfig ] = useState<SortConfig<TableDataItem> | null>({ key: 'date', direction: 'descending' });

  const queryVariables = {
    limit: ITEMS_PER_PAGE,
    offset: (currentPage - 1) * ITEMS_PER_PAGE,
    sortBy: sortConfig?.key,
    sortDirection: sortConfig?.direction,
    // Usa os filtros preparados em vez dos filtros brutos
    filters: prepareGqlFilters(filters),
  };

  const [ result, reexecuteQuery ] = useQuery({
    query: GET_ABASTECIMENTO_QUERY,
    variables: queryVariables,
  });

  const { data: apiData, fetching: isLoading, error } = result;

  // Adicionado `filters` ao array de dependências para refazer a busca quando os filtros mudarem.
  useEffect(() => {
    // Quando qualquer um desses estados mudar, uma nova query será feita.
    console.log('%c[HOOK-TABLE] 4. Efeito de re-execução da query foi ativado!', 'color: red; font-weight: bold;');

    reexecuteQuery({ requestPolicy: 'network-only' });
  }, [ currentPage, sortConfig, filters, reexecuteQuery ]);

  if (error) {
    console.error("API Error:", error.message);
  }

  // Use API data if available, otherwise use mock data as a fallback
  const processedData = apiData?.abastecimentos || mockAbastecimentoData;
  const totalItems = apiData?.abastecimentoCount || mockAbastecimentoData.length;

  const handleSort = (key: keyof TableDataItem) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig?.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1); // Reset to first page on new sort
  };

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return {
    // Data and State
    processedData,
    sortConfig,
    currentPage,
    totalPages,
    isLoading,
    error, // Pass error to the UI
    // Handlers
    handleSort,
    onPageChange: setCurrentPage,
  };
};