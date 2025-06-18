// src/components/Table/GenericTable.tsx
import { useState } from 'react';
import GenericTableFilters from './GenericTableFilters';

export type TableColumn<T> = {
  field: Extract<keyof T, string>; // apenas string, compatível com React key
  label?: string;
};

export type FilterConfig<T> = {
  field: Extract<keyof T, string>;
  label?: string;
  type?: 'text' | 'number' | 'select' | 'range';
  options?: (string | number)[];
};

interface GenericTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: TableColumn<T>[];
  filtersConfig: FilterConfig<T>[];
  isMobile?: boolean;
  className?: string;
}

function GenericTable<T extends Record<string, unknown>>({
  data,
  columns,
  filtersConfig,
  isMobile = false,
  className = '',
}: GenericTableProps<T>) {
  const [filters, setFilters] = useState<Partial<Record<Extract<keyof T, string>, string | number>>>({});

  const filteredData = data.filter((item) =>
    filtersConfig.every(({ field, type }) => {
      const filterValue = filters[field];
      if (!filterValue) return true;

      const itemValue = item[field];
      if (type === 'number') return Number(itemValue) === Number(filterValue);
      return String(itemValue).toLowerCase().includes(String(filterValue).toLowerCase());
    })
  );

  return (
    <div className={`overflow-x-auto ${isMobile ? 'text-sm' : 'text-base'} mb-4 ${className}`}>
      <GenericTableFilters<T>
        filters={filters}
        setFilters={setFilters}
        filterConfig={filtersConfig}
      />

      <table className="min-w-full border border-gray-300 text-left rounded-b-xl overflow-hidden">
        <thead className="bg-cyan-500 text-gray-50">
          <tr>
            {columns.map(({ field, label }) => (
              <th key={field} className="border px-4 py-2">
                {label || field}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index} className="odd:bg-white even:bg-gray-50">
              {columns.map(({ field }) => (
                <td key={field} className="border px-4 py-2">
                  {typeof row[field] === 'number' && field === 'custo'
                    ? `R$ ${row[field].toLocaleString()}`
                    : String(row[field])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GenericTable;
