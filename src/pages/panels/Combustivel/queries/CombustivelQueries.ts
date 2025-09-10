// =================================================
//      PAINEL DE MANUTENÇÃO - DASHBOARD
// ================================================

/**
 * @description Query principal que busca todos os dados necessários para o dashboard de manutenção.
 * Inclui KPIs, dados para gráficos, opções de filtros dinâmicos e a primeira página da tabela.
 * O objetivo é carregar o estado inicial do painel com uma única requisição.
 */
export const GET_COMBUSTIVEL_DASHBOARD_DATA_QUERY = `

    # 1 Query para obter as opções de filtros dinâmicos da tabela
    query GetAbastecimentosTableConfig {
    abastecimentosColumns {
      headerLabel
      accessor
      isSortable
      dataType
      isFilterable
      filterKey
    }
  }

    # 2 Query principal que busca todos os dados necessários para o dashboard
query Abastecimentos(
  $limit: Int,
  $offset: Int,
  $sortBy: String,
  $sortDirection: String,
  $filters: AbastecimentoFiltersInput
  $tableFilters: AbastecimentoTableFiltersInput
) {
  getAbastecimentos(filters: $filters) {
    id
    datetime
    vehicle {
      plate
      model
    }
    gasStation {
      name
      city
    }
    department
  }

  getAbastecimentosTable(
    limit: $limit
    offset: $offset
    sortBy: $sortBy
    sortDirection: $sortDirection
    filters: $filters  
    tableFilters: $tableFilters
  ) {
    id
    datetime
    cost
    fuelVolume
    fuelType
    driverName
    vehicle {
      plate
      model
      brand
    }
    gasStation {
      name
      city
    }
    department
  }

  abastecimentosCount(filters: $filters, tableFilters: $tableFilters)
}

    # 3 Query para obter os dados para gráficos e KPIs
query GetChartData($filters: AbastecimentoFiltersInput) {
    costByDepartment(filters: $filters) { department total }
    costByPlate(filters: $filters) { plate total }
    costOverTime(filters: $filters) { date total }
    rankingByDate(filters: $filters) { date total }
    rankingByPlate(filters: $filters) { plate total quantity }
    rankingByDepartment(filters: $filters) { department total }
  }

    # 4 Query para obter as opções de filtros dinâmicos
   query GetFilterOptions($filters: AbastecimentoFiltersOptionsInput) {
   departmentOptions(filters: $filters) { value, label }
   vehiclePlateOptions(filters: $filters) { value, label }
   vehicleModelOptions(filters: $filters) { value, label }
   gasStationCityOptions(filters: $filters) { value, label }
   gasStationNameOptions(filters: $filters) { value, label }
 }

    # 5 Query para obter os KPIs
query GetAbastecimentoKpis($filters: AbastecimentoFiltersInput) {
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
