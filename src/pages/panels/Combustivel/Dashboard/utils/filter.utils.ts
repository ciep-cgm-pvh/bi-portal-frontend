export const prepareGqlFilters = (raw: any) => {
  const filters: Record<string, any> = {};
  const tableFilters: Record<string, any> = {};

  if (!raw) return { filters, tableFilters };

  // dateRange só no geral
  if (raw.startDate && raw.endDate) {
    filters.dateRange = {
      from: new Date(raw.startDate).toISOString(),
      to: new Date(raw.endDate).toISOString()
    };
  }

  const TABLE_ONLY = new Set([ 'datetime', 'cost', 'fuelVolume' ]);
  const SHARED = new Set([
    'fuelType',
    'vehiclePlate',
    'driverName',
    'department',
    'vehicleModel',
    'vehicleBrand',
    'gasStationCity',
    'gasStationName',
  ]);

  const isEmpty = (v: any) =>
    v === null || v === undefined || v === '' || (Array.isArray(v) && v.length === 0);

  for (const [ key, value ] of Object.entries(raw)) {
    if (key === 'startDate' || key === 'endDate') continue;
    if (isEmpty(value)) continue;

    if (TABLE_ONLY.has(key)) {
      tableFilters[ key ] = value;
    } else if (SHARED.has(key)) {
      filters[ key ] = value;
      tableFilters[ key ] = value;
    } else {
      filters[ key ] = value;
    }
  }

  return { filters, tableFilters };
};
