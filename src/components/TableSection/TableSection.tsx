import { ChevronDown, ChevronUp } from 'lucide-react';
import type { SortConfig, TableColumn, TableDataItem } from '../../types/tables';

interface TableSectionProps<T extends TableDataItem> {
  title?: string;
  columns: TableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  // Props para ordenação
  sortConfig?: SortConfig<T> | null;
  onSort: (key: keyof T) => void;
}

export const TableSection = <T extends TableDataItem>({
  title,
  columns,
  data,
  isLoading = false,
  emptyMessage = 'Nenhum resultado encontrado.',
  sortConfig,
  onSort,
}: TableSectionProps<T>) => {
  const renderSortIcon = (key: keyof T) => {
    if (!sortConfig || sortConfig.key !== key) {
      // Ícone sutil para indicar que a coluna é ordenável
      return <ChevronDown className="h-3 w-3 text-gray-300" />;
    }
    if (sortConfig.direction === 'ascending') {
      return <ChevronUp className="h-4 w-4 text-gray-600" />;
    }
    return <ChevronDown className="h-4 w-4 text-gray-600" />;
  };

  return (
    <section className="bg-white px-4 pt-4 rounded-t-lg shadow-md">
      {title && <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200">
            <tr>
              {columns.map((column) => (
                <th key={String(column.accessor)} className={`py-3 px-4 font-semibold text-gray-600 uppercase`}>
                  {column.sortable ? (
                    <button className="flex items-center space-x-1" onClick={() => onSort(column.accessor)}>
                      <span>{column.header}</span>
                      {renderSortIcon(column.accessor)}
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={columns.length} className="p-6 text-center text-gray-500">Carregando...</td></tr>
            ) : data.length === 0 ? (
              <tr><td colSpan={columns.length} className="p-6 text-center text-gray-500">{emptyMessage}</td></tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  {columns.map((column) => (
                    <td key={String(column.accessor)} className={`py-4 px-4 ${column.className || ''}`}>
                      {column.render ? column.render(item) : item[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};