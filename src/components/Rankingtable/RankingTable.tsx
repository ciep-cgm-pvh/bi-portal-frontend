import type { ReactNode } from 'react';

// Função para acessar valores aninhados, caso necessário no futuro
const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

// Tipos para as props do componente
interface RankingTableColumn {
  header: string;
  accessor: string;
  className?: string;
  render?: (value: any) => ReactNode;
}

interface RankingTableProps {
  data: any[];
  columns: RankingTableColumn[];
}

export const RankingTable = ({ data, columns }: RankingTableProps) => {
  return (
    <div className="overflow-y-auto h-[85%]">
      {/* Use border-collapse for modern dividers */}
      <table className="w-full text-left text-sm border-collapse">
        <thead className="sticky top-0 bg-white z-10">
          {/* Add a subtle top border to separate from the card title */}
          <tr className="border-b-2 border-gray-200">
            {columns.map((column, index) => (
              <th 
                key={column.accessor} 
                // Adjust padding and alignment
                className={`py-3 px-4 font-bold text-gray-500 uppercase tracking-wider ${index === 0 ? 'text-left' : 'text-center'}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            // Use border-transparent to create space for the divider
            // Apply a bottom border to all rows except the last one
            <tr 
              key={`${getNestedValue(item, columns[0].accessor)}-${index}`} 
              className="border border-x-transparent border-y-gray-200 hover:bg-blue-100 transition-colors duration-200"
            >
              {columns.map((column, colIndex) => (
                <td 
                  key={column.accessor} 
                  // Adjust padding and alignment
                  className={`py-3 px-4 text-gray-700 ${column.className || ''} ${colIndex === 0 ? 'text-left' : 'text-center'}`}
                >
                  {column.render 
                    ? column.render(getNestedValue(item, column.accessor)) 
                    : getNestedValue(item, column.accessor)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
