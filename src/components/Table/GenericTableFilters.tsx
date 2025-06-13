type FilterConfig = {
  field: string;
  label?: string;
  type?: 'text' | 'number' | 'select' | 'range';
  options?: (string | number)[];
};

const GenericTableFilters = ({
  filters,
  setFilters,
  filterConfig,
}: {
  filters: never;
  setFilters: (val: never) => void;
  filterConfig: FilterConfig[];
}) => {
  return (
    <div className="flex flex-wrap gap-3  justify-center bg-white p-2 shadow-md">
      {filterConfig.map(({ field, label, type = 'text', options }) => {
        const value = filters[field] ?? '';

        if (type === 'select') {
          return (
            <div key={field}>
              <label className="block text-sm">{label || field}</label>
              <select
                className="border px-2 py-1 rounded"
                value={value}
                onChange={(e) => setFilters({ ...filters, [field]: e.target.value })}
              >
                <option value="">Todos</option>
                {options?.map((opt) => (
                  <option key={opt} value={opt}>
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
              onChange={(e) => setFilters({ ...filters, [field]: e.target.value })}
            />
          </div>
        );
      })}
    </div>
  );
};

export default GenericTableFilters;