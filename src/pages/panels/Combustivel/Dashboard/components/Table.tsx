import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { useQuery } from 'urql';

import { PaginationControls } from '../../../../../components/PaginationControls/PaginationControls';
import { TableSection } from '../../../../../components/TableSection/TableSection';
import type { TableColumn, TableDataItem } from '../../../../../types/tables';
import { useAbastecimentoData } from '../hooks/useAbastecimentoData';

// =================================================================
// FUNÇÃO HELPER IMPLEMENTADA
// =================================================================
/**
 * Acessa um valor aninhado em um objeto usando um caminho de string.
 * @param obj - O objeto no qual buscar o valor.
 * @param path - O caminho para o valor (ex: 'vehicle.plate').
 * @returns O valor encontrado ou undefined se o caminho não existir.
 */
const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

// Query para a configuração da tabela
const GET_TABLE_CONFIG_QUERY = `
  query GetAbastecimentosTableConfig {
    abastecimentosColumns {
      headerLabel
      accessor
      isSortable
      dataType
    }
  }
`;

// Função de formatação de célula, agora usando getNestedValue
const formatCell = (item: TableDataItem, accessor: string, dataType: string): ReactNode => {
  // Acessa o valor, seja ele simples ('cost') ou aninhado ('vehicle.plate')
  const value = getNestedValue(item, accessor);

  if (value === null || typeof value === 'undefined') {
    return 'N/A';
  }

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

export const AbastecimentoTable = ({ filters }: { filters: any }) => {
  const { processedData, sortConfig, currentPage, totalPages, handleSort, onPageChange } = useAbastecimentoData({ filters });
  const [configResult] = useQuery({ query: GET_TABLE_CONFIG_QUERY });
  const { data: configData, fetching: isLoadingConfig } = configResult;
  
  const columns = useMemo((): TableColumn<TableDataItem>[] => {
    if (!configData?.abastecimentosColumns) return [];

    return configData.abastecimentosColumns.map((col: any) => ({
      header: col.headerLabel,
      accessor: col.accessor,
      sortable: col.isSortable,
      render: (item: TableDataItem) => formatCell(item, col.accessor, col.dataType),
    }));
  }, [configData]);

  if (isLoadingConfig) {
    return <div className='inline-flex items-center justify-center w-full bg-white p-4 md:p-6 rounded-lg shadow-md mb-6'>
      <svg className="mr-3 -ml-1 size-5 animate-spin text-green-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
      Carregando configuração da tabela...</div>;
  }

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