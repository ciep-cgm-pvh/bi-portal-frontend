// =================================================
// Queries para painel de manutenção
// ================================================

// Query GraphQL para buscar dados de manutenção
export const GET_MANUTENCAO_DATA_FILTERED_QUERY = `
query GetManutencaos($limit: Int, $offset: Int, $sortBy: String, $sortDirection: String, $filters: AbastecimentoFilterInput, $tableFilters: AbastecimentoTableFilterInput) {
  getManutencaosTable(limit: $limit, offset: $offset, sortBy: $sortBy, sortDirection: $sortDirection, filters: $filters, tableFilters: $tableFilters) {
    id
    vehicle
    description
    cost
    date
    datetime
    mileage
    createdAt
    updatedAt
  }
  abastecimentosCount(filters: $filters, tableFilters: $tableFilters)
}
`;

export const GET_MANUTENCAO_KPIS_DATA_FILTERED_QUERY = `
query GetManutencaoKpis($filters: ManutencaoFiltersInput) {
  abastecimentoKpis(filters: $filters) {
    totalCost
    fuelConsumed
    kilometersDriven
    vehiclesCount
    dailyAverageCost
    suppliesCount
    lastUpdate
  }
}
`;

export const GET_FILTER_OPTIONS_QUERY = `
query GetFilterOptions($filters: ManutencaoFiltersOptionsInput) {
 departmentOptions(filters: $filters) { value, label }
 vehiclePlateOptions(filters: $filters) { value, label }
 vehicleModelOptions(filters: $filters) { value, label }
 gasStationCityOptions(filters: $filters) { value, label }
 gasStationNameOptions(filters: $filters) { value, label }
}
`;

export const GET_CHART_DATA_FILTERED_QUERY = `
query GetChartData($filters: ManutencaoFiltersInput) {
  costByDepartment(filters: $filters) { department total }
  costByPlate(filters: $filters) { plate total }
  costOverTime(filters: $filters) { date total }
  rankingByDate(filters: $filters) { date total }
  rankingByPlate(filters: $filters) { plate total quantity }
  rankingByDepartment(filters: $filters) { department total }
}
`;

// =================================================
// Queries para download de dados
// ================================================

export const GET_ALL_MAUNTENCAO_DATA_QUERY = `
  query DownloadManutencaos {
    getManutencaosTable {
      id
      datetime
      cost
      fuelVolume
      fuelType
      driverName
      department
      vehicle {
        plate
        model
        brand
      }
      gasStation {
        name
        city
      }
    }
  }
`;

export const GET_VEHICLE_SUMMARY_QUERY = `
  query GetVehicleSummary {
    vehicleSummary {
      department
      totalCost
      supplyCount
      vehicle {
        plate
        model
        brand
      }
    }
  }
`;