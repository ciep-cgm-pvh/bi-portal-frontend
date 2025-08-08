import { useQuery } from 'urql';
import { useMemo } from 'react';
import type { ReactNode } from 'react';

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

export const AbastecimentoTable = () => {
  const { processedData, sortConfig, currentPage, totalPages, handleSort, onPageChange } = useAbastecimentoData();
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
    return <div>Carregando configuração da tabela...</div>;
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