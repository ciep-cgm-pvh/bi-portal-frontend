// src/components/Table/GenericTableFilters.tsx
import type { FilterConfig } from './GenericTable';

interface GenericTableFiltersProps<T extends Record<string, unknown>> {
  filters: Partial<Record<Extract<keyof T, string>, string | number>>;
  setFilters: (val: Partial<Record<Extract<keyof T, string>, string | number>>) => void;
  filterConfig: FilterConfig<T>[];
}

function GenericTableFilters<T extends Record<string, unknown>>({
  filters,
  setFilters,
  filterConfig,
}: GenericTableFiltersProps<T>) {
  const handleChange = (field: Extract<keyof T, string>, value: string | number) => {
    setFilters({ ...filters, [field]: value });
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center bg-white p-2 shadow-md">
      {filterConfig.map(({ field, label, type = 'text', options }) => {
        const value = filters[field] ?? '';

        if (type === 'select') {
          return (
            <div key={field}>
              <label className="block text-sm">{label || field}</label>
              <select
                className="border px-2 py-1 rounded"
                value={value}
                onChange={(e) => handleChange(field, e.target.value)}
              >
                <option value="">Todos</option>
                {options?.map((opt) => (
                  <option key={String(opt)} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        return (
          <div key={field}>
            <label className="block text-sm">{label || field}</label>
            <input
              type={type}
              className="border px-2 py-1 rounded"
              placeholder={label || field}
              value={value}
              onChange={(e) => handleChange(field, e.target.value)}
            />
          </div>
        );
      })}
    </div>
  );
}

export default GenericTableFilters;
