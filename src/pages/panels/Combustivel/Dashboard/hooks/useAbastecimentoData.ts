import { useEffect, useRef, useState } from 'react';
import { useQuery } from 'urql';
import type { SortConfig, TableDataItem } from '../../../../../types/tables';
import { prepareGqlFilters } from '../utils/filter.utils';


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
  abastecimentosCount(filters: $filters)
}
`;

// --- INÍCIO DAS ALTERAÇÕES ---

// Interface para as props do hook
interface UseAbastecimentoDataProps {
  filters: any;
  itemsPerPage: number; // 1. Recebe itemsPerPage como prop
}

export const useAbastecimentoData = ({ filters, itemsPerPage }: UseAbastecimentoDataProps) => {
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ sortConfig, setSortConfig ] = useState<SortConfig<TableDataItem> | null>({ key: 'datetime', direction: 'descending' }); // datetime é mais provável que 'date'
  const isInitialMount = useRef(true); // Para evitar o reset na montagem inicial

  // Reseta para a primeira página sempre que os filtros mudam.
  useEffect(() => {
    // Evita o reset na primeira renderização
    if (!isInitialMount.current) {
      setCurrentPage(1);
    } else {
      isInitialMount.current = false;
    }
  }, [ filters ]); // Depende do objeto de filtros combinado

  const queryVariables = {
    limit: itemsPerPage, // 2. Usa a prop dinâmica
    offset: (currentPage - 1) * itemsPerPage, // 3. Usa a prop dinâmica no cálculo
    sortBy: sortConfig?.key,
    sortDirection: sortConfig?.direction,
    filters: prepareGqlFilters(filters),
  };

  const [ result, reexecuteQuery ] = useQuery({
    query: GET_ABASTECIMENTO_QUERY,
    variables: queryVariables,
  });

  const { data: apiData, fetching: isLoading, error } = result;
  useEffect(() => {
    // --- COLOQUE O LOG AQUI ---
    console.log('%c[API Request] Enviando nova requisição com os filtros:', 'color: yellow; font-weight: bold;', {
      filters: prepareGqlFilters(filters),
      page: currentPage,
      limit: itemsPerPage,
      sort: sortConfig
    });

    reexecuteQuery({ requestPolicy: 'network-only' });
  }, [ currentPage, sortConfig, filters, itemsPerPage, reexecuteQuery ]);

  useEffect(() => {
    // 4. Adiciona `itemsPerPage` às dependências do efeito
    reexecuteQuery({ requestPolicy: 'network-only' });
  }, [ currentPage, sortConfig, filters, itemsPerPage, reexecuteQuery ]);

  if (error) {
    console.error("API Error:", error.message);
  }

  const processedData = apiData?.abastecimentos;
  const totalItems = apiData?.abastecimentosCount;

  // 5. Calcula totalPages com a prop dinâmica
  const totalPages = totalItems ? Math.ceil(totalItems / itemsPerPage) : 0;

  const handleSort = (key: keyof TableDataItem) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig?.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  return {
    processedData,
    sortConfig,
    currentPage,
    totalPages,
    isLoading,
    error,
    totalItems, // 6. Retorna o total de itens para o componente
    handleSort,
    onPageChange: setCurrentPage,
  };
};