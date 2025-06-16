import { useState } from 'react';
import GenericTableFilters from './GenericTableFilters';


const GenericTable = ({
  data,
  columns,
  filtersConfig,
  isMobile,
  className,
}: {
  data: never[];
  columns: { field: string; label?: string }[];
  filtersConfig: never[];
  isMobile: boolean;
  className?: string;
}) => {
  const [filters, setFilters] = useState({});

  const filteredData = data.filter((item) => {
    return filtersConfig.every(({ field, type }) => {
      const val = filters[field];
      if (!val) return true;
      const itemVal = item[field];

      if (type === 'number') return Number(itemVal) === Number(val);
      return String(itemVal).toLowerCase().includes(String(val).toLowerCase());
    });
  });

  return (
    <div className={`overflow-x-auto ${isMobile ? 'text-sm' : 'text-base'} mb-4 ${className}`}>
      <GenericTableFilters filters={filters} setFilters={setFilters} filterConfig={filtersConfig} />
      <table className="min-w-full border border-gray-300 text-left rounded-b-xl overflow-hidden">
        <thead className="bg-cyan-500 text-gray-50">
          <tr>
            {columns.map((col) => (
              <th key={col.field} className="border px-4 py-2">
                {col.label || col.field}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, i) => (
            <tr key={i} className="odd:bg-white even:bg-gray-50">
              {columns.map((col) => (
                <td key={col.field} className="border px-4 py-2">
                  {typeof row[col.field] === 'number' && col.field === 'custo'
                    ? `R$ ${row[col.field].toLocaleString()}`
                    : row[col.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GenericTable;