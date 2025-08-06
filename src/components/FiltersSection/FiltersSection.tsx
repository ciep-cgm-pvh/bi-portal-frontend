import { Filter, X, Check } from 'lucide-react';
import type { FilterConfig, FilterValues } from '../../types/filters';

// Definindo as props que o componente vai receber
interface FiltersSectionProps {
  config: FilterConfig[]; // A estrutura dos filtros
  values: FilterValues; // Os valores atuais
  onChange: (id: string, value: string | number) => void; // Função para atualizar um valor
  onApply: () => void; // Função para o botão "Aplicar"
  onClear: () => void; // Função para o botão "Limpar"
}

export const FiltersSection = ({ config, values, onChange, onApply, onClear }: FiltersSectionProps) => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-6">
      {/* Cabeçalho */}
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <Filter className="mr-2 h-5 w-5" />
        Filtros
      </h2>

      {/* Grid para os inputs dos filtros */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {config.map((filter) => (
          <div key={filter.id}>
            <label htmlFor={filter.id} className="block text-sm font-medium text-gray-700 mb-1">
              {filter.label}
            </label>
            {/* Renderiza um tipo de input diferente com base no filter.type */}
            {filter.type === 'select' && (
              <select
                id={filter.id}
                value={values[filter.id] || ''}
                onChange={(e) => onChange(filter.id, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">{filter.placeholder || 'Selecione'}</option>
                {filter.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}

            {filter.type === 'date' && (
              <input
                type="date"
                id={filter.id}
                value={values[filter.id] || ''}
                onChange={(e) => onChange(filter.id, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            )}
            
            {filter.type === 'text' && (
              <input
                type="text"
                id={filter.id}
                placeholder={filter.placeholder || 'Digite...'}
                value={values[filter.id] || ''}
                onChange={(e) => onChange(filter.id, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          </div>
        ))}
      </div>

      {/* Botões de Ação */}
      <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={onClear}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors flex items-center"
        >
          <X className="mr-1 h-4 w-4" /> Limpar
        </button>
        <button
          onClick={onApply}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
        >
          <Check className="mr-1 h-4 w-4" /> Aplicar Filtros
        </button>
      </div>
    </div>
  );
};

export default FiltersSection;