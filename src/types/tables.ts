import type { ReactNode } from 'react';

// Força que todo item de dado para a tabela tenha um `id`
export type TableDataItem = {
  id: string | number;
  [ key: string ]: any;
};

// Configuração da coluna (semelhante ao que você já tinha)
export interface TableColumn<T extends TableDataItem> {
  header: string;
  accessor: keyof T;
  className?: string;
  sortable?: boolean; // Adicionamos a opção de ser ordenável
  isFilterable?: boolean;
  render?: (item: T) => ReactNode;
  dataType?: string;
  filterKey?: string;
}

// Configuração para o estado de ordenação
export interface SortConfig<T> {
  key: keyof T;
  direction: 'ascending' | 'descending';
}