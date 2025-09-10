// Local: [seu-projeto]/AbastecimentoTable.tsx

import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'urql';

import { PaginationControls } from '../../../../../components/PaginationControls/PaginationControls';
import { TableSection } from '../../../../../components/TableSection/TableSection';
import type { TableColumn, TableDataItem } from '../../../../../types/tables';
import { useAbastecimentoData } from '../hooks/useAbastecimentoData';

// --- Helpers e Configurações (movidos para fora do componente) ---

const GET_TABLE_CONFIG_QUERY = `
  query GetAbastecimentosTableConfig {
    abastecimentosColumns {
      headerLabel
      accessor
      isSortable
      dataType
      isFilterable
      filterKey
    }
  }
`;

/**
 * Acessa um valor aninhado em um objeto com base em um caminho de string (ex: 'veiculo.placa').
 */
const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

/**
 * Formata o valor da célula com base no tipo de dado especificado pela API.
 */
const formatCell = (item: TableDataItem, accessor: string, dataType: string): ReactNode => {
  const value = getNestedValue(item, accessor);
  if (value === null || typeof value === 'undefined') return 'N/A';

  switch (dataType) {
    case 'CURRENCY':
      return `R$ ${Number(value).toFixed(2).replace('.', ',')}`;
    case 'DATETIME':
      return new Date(value).toLocaleString('pt-BR');
    case 'STATUS_TAG':
      // Exemplo de como você poderia renderizar uma tag de status
      return <span className={`status-${String(value).toLowerCase()}`}>{value}</span>;
    default:
      return value;
  }
};

// --- Interface de Props ---

interface AbastecimentoTableProps {
  filters: Record<string, any>; // Filtros gerais passados de um componente pai
}

// --- Componente Principal ---

export const AbastecimentoTable = ({ filters: generalFilters }: AbastecimentoTableProps) => {
  // --- Estados ---
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
  const [debouncedColumnFilters, setDebouncedColumnFilters] = useState<Record<string, string>>({});

  // --- Efeitos ---

  // Efeito para aplicar debounce aos filtros das colunas, evitando requisições excessivas à API.
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedColumnFilters(columnFilters);
    }, 500); // Aguarda 500ms após o usuário parar de digitar

    return () => clearTimeout(handler);
  }, [columnFilters]);

  // --- Queries da API ---

  // Busca a configuração das colunas da tabela (cabeçalhos, tipos, etc.)
  const [configResult] = useQuery({ query: GET_TABLE_CONFIG_QUERY });
  const { data: configData, fetching: isLoadingConfig } = configResult;

  // --- Memos (Lógica de Negócio) ---

  // Combina os filtros gerais (do pai) com os filtros específicos de cada coluna.
  const combinedFilters = useMemo(() => {
    const translatedColumnFilters: Record<string, any> = {};
    const columnConfig = configData?.abastecimentosColumns || [];

    for (const accessor in debouncedColumnFilters) {
      const value = debouncedColumnFilters[accessor];
      if (value) {
        const config = columnConfig.find((c: any) => c.accessor === accessor);
        // Usa o 'filterKey' da API para a chave do filtro, garantindo que a API entenda a busca.
        const keyForApi = config?.filterKey || accessor;
        translatedColumnFilters[keyForApi] = value;
      }
    }

    return {
      ...generalFilters,
      ...translatedColumnFilters,
    };
  }, [generalFilters, debouncedColumnFilters, configData]);

  // Hook customizado que busca os dados de abastecimento já filtrados e paginados da API.
  const {
    processedData,
    sortConfig,
    currentPage,
    totalPages,
    totalItems,
    isLoading: isLoadingData,
    handleSort,
    onPageChange,
  } = useAbastecimentoData({ filters: combinedFilters, itemsPerPage });

  // Constrói as definições de coluna para a UI com base na resposta da API.
  const columns = useMemo((): TableColumn<TableDataItem>[] => {
    if (!configData?.abastecimentosColumns) return [];
    return configData.abastecimentosColumns.map((col: any) => ({
      header: col.headerLabel,
      accessor: col.accessor,
      sortable: col.isSortable,
      isFilterable: col.isFilterable !== false, // É filtrável por padrão
      render: (item: TableDataItem) => formatCell(item, col.accessor, col.dataType),
    }));
  }, [configData]);

  const isLoading = isLoadingConfig || isLoadingData;

  // --- Handlers ---

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(Math.max(1, value));
    onPageChange(1); // Volta para a primeira página ao mudar a quantidade de itens
  };

  const handleColumnFilterChange = (accessor: keyof TableDataItem, value: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [accessor as string]: value,
    }));
  };

  // --- Renderização ---

  if (isLoadingConfig) {
    return (
      <div className='inline-flex items-center justify-center w-full bg-white p-4 md:p-6 rounded-lg shadow-md mb-6'>
        Carregando configuração da tabela...
      </div>
    );
  }

  return (
    <div className="shadow-md rounded-lg">
      <TableSection
        title="Últimos Abastecimentos"
        columns={columns}
        data={processedData || []}
        isLoading={isLoading}
        sortConfig={sortConfig}
        onSort={handleSort}
        filterValues={columnFilters}
        onFilterChange={handleColumnFilterChange}
      />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={handleItemsPerPageChange}
        totalItems={totalItems || 0}
      />
    </div>
  );
};