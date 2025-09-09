import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'urql';

import { PaginationControls } from '../../../../../components/PaginationControls/PaginationControls';
import { TableSection } from '../../../../../components/TableSection/TableSection';
import type { TableColumn, TableDataItem } from '../../../../../types/tables';
import { useAbastecimentoData } from '../hooks/useAbastecimentoData';

// =================================================================
// FUNÇÕES HELPER (Sem alterações)
// =================================================================
const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

const formatCell = (item: TableDataItem, accessor: string, dataType: string): ReactNode => {
  const value = getNestedValue(item, accessor);
  if (value === null || typeof value === 'undefined') return 'N/A';
  switch (dataType) {
    case 'CURRENCY':
      return `R$ ${Number(value).toFixed(2).replace('.', ',')}`;
    case 'DATETIME':
      return new Date(value).toLocaleString('pt-BR');
    case 'STATUS_TAG':
      return <span className={`status-${value}`}>{value}</span>;
    default:
      return value;
  }
};

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


// =================================================================
// COMPONENTE PRINCIPAL (Lógica de Filtros Corrigida)
// =================================================================
export const AbastecimentoTable = ({ filters: generalFilters }: { filters: any }) => {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [columnFilters, setColumnFilters] = useState<{ [key: string]: string }>({});
  const [debouncedColumnFilters, setDebouncedColumnFilters] = useState<{ [key: string]: string }>({});

  // Efeito de Debounce para os filtros de coluna
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedColumnFilters(columnFilters);
    }, 500);
    return () => clearTimeout(handler);
  }, [columnFilters]);

  // Busca a configuração das colunas da API
  const [configResult] = useQuery({ query: GET_TABLE_CONFIG_QUERY });
  const { data: configData, fetching: isLoadingConfig } = configResult;

  // Combina os filtros gerais com os filtros de coluna, traduzindo as chaves.
  const combinedFilters = useMemo(() => {
    const translatedColumnFilters: { [key: string]: any } = {};
    const columnConfig = configData?.abastecimentosColumns || [];

    // Itera sobre os filtros de coluna que o usuário digitou
    for (const accessor in debouncedColumnFilters) {
      const value = debouncedColumnFilters[accessor];
      if (value) { // Apenas se houver um valor
        // Encontra a configuração da coluna correspondente
        const config = columnConfig.find((c: any) => c.accessor === accessor);
        
        // Usa o `filterKey` fornecido pela API. Se não existir, usa o `accessor`.
        const keyForApi = config?.filterKey || accessor;
        translatedColumnFilters[keyForApi] = value;
      }
    }

    return {
      ...generalFilters,
      ...translatedColumnFilters,
    };
  }, [generalFilters, debouncedColumnFilters, configData]);

  // Hook que busca os dados, agora com os filtros corretos
  console.log('%c[TABLE] 1. Combinando filtros gerais e de coluna para a tabela:', 'color: blue; font-weight: bold;', combinedFilters);
  
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
  console.log('%c[TABLE] 4. Dados processados para a tabela:', 'color: blue; font-weight: bold;', processedData);
  

  // Handlers (sem alterações)
  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(Math.max(1, value));
    onPageChange(1);
  };
  
  const handleColumnFilterChange = (accessor: keyof TableDataItem, value: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [accessor as string]: value,
    }));
  };

  // Memoização das colunas para a UI (sem alterações)
  const columns = useMemo((): TableColumn<TableDataItem>[] => {
    if (!configData?.abastecimentosColumns) return [];
    return configData.abastecimentosColumns.map((col: any) => ({
      header: col.headerLabel,
      accessor: col.accessor,
      sortable: col.isSortable,
      isFilterable: col.isFilterable || true,
      render: (item: TableDataItem) => formatCell(item, col.accessor, col.dataType),
    }));
  }, [configData]);

  const isLoading = isLoadingConfig || isLoadingData;

  if (isLoadingConfig) {
    return <div className='inline-flex items-center justify-center w-full bg-white p-4 md:p-6 rounded-lg shadow-md mb-6'>Carregando configuração...</div>;
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
