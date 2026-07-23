export const prepareGqlFilters = (raw: any) => {
  const filters: Record<string, any> = {};
  const tableFilters: Record<string, any> = {};

  if (!raw) return { filters, tableFilters };

  const SHARED = new Set([
    'employee',
    'processNumber',
    'status',
    'departmentCode',
  ]);

  const isEmpty = (v: any) =>
    v === null || v === undefined || v === '' || (Array.isArray(v) && v.length === 0);

  for (const [ key, value ] of Object.entries(raw)) {
    if (key === 'startDate' || key === 'endDate') continue;
    if (isEmpty(value)) continue;

    if (SHARED.has(key)) {
      filters[ key ] = value;
      tableFilters[ key ] = value;
    } else {
      filters[ key ] = value;
    }
  }

  return { filters, tableFilters };
};

/**
 * @description Prepara o objeto de filtros do estado do frontend para ser enviado à API GraphQL.
 * - Remove chaves com valores nulos, indefinidos ou vazios.
 * - Formata o range de datas para o formato esperado pela API.
 * @param rawFilters - O objeto de filtros vindo do estado do React.
 * @returns Um objeto de filtros limpo e formatado.
 */