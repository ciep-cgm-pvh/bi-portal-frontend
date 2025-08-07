import { useState, useMemo } from 'react';
import type { SortConfig, TableDataItem } from '../../../../../types/tables';
import { useQuery } from 'urql';

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
  query GetAbastecimento($limit: Int, $offset: Int, $sortBy: String, $sortDirection: String) {
    abastecimento(limit: $limit, offset: $offset, sortBy: $sortBy, sortDirection: $sortDirection) {
      id
      date
      vehicle
      driver
      cost
      status
    }
    suppliesCount
  }
`;

const ITEMS_PER_PAGE = 5;

export const useAbastecimentoData = () => {
  // Em um caso real, `rawAbastecimentoData` viria de um SWR ou React Query
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ sortConfig, setSortConfig ] = useState<SortConfig<TableDataItem> | null>(null);

  const [ result ] = useQuery({
    query: GET_ABASTECIMENTO_QUERY,
    // Você pode passar variáveis para a query aqui, se necessário
    // variables: { limit: ITEMS_PER_PAGE, offset: (currentPage - 1) * ITEMS_PER_PAGE, ... }
  });

  const { data: apiData, fetching: isLoading, error } = result;

  // Se houver erro na API, logue o erro e use o mock
  if (error) {
    console.error("Falha ao buscar dados da API:", error.message);
  }

  const data = apiData?.supplies || mockAbastecimentoData;
  const totalItems = apiData?.suppliesCount || mockAbastecimentoData.length;

  const processedData = useMemo(() => {
    let sortableItems = [ ...data ];
    if (sortConfig) {
      sortableItems.sort((a, b) => {
        if (a[ sortConfig.key ] < b[ sortConfig.key ]) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[ sortConfig.key ] > b[ sortConfig.key ]) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    const firstPageIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortableItems.slice(firstPageIndex, firstPageIndex + ITEMS_PER_PAGE);
  }, [ data, currentPage, sortConfig ]);

  const handleSort = (key: keyof TableDataItem) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig?.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return {
    // Dados e Estado
    processedData,
    sortConfig,
    currentPage,
    totalPages,
    isLoading,
    // Handlers
    handleSort,
    onPageChange: setCurrentPage,
  };
};