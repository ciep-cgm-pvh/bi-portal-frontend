// =================================================
//      PAINEL DE COMBUSTIVEL - DASHBOARD
// ================================================

/**
 * @description Query principal que busca todos os dados necessários para o dashboard de abastecimento.
 * Inclui KPIs, dados para gráficos, opções de filtros dinâmicos e a primeira página da tabela.
 * O objetivo é carregar o estado inicial do painel com uma única requisição.
 */ 
export const GET_COMBUSTIVEL_KPI_DATA_QUERY = `
  query GetAbastecimentoKpiData($filters: AbastecimentoFiltersInput) {
    kpis: getAbastecimentoKpi(filters: $filters) {
    fuelConsumed
    totalCost
    vehiclesCount
    lastUpdate
  }
}
`
export const GET_COMBUSTIVEL_CHARTS_DATA_QUERY = `
  query GetAbastecimentoCharts (
  $filters: AbastecimentoFiltersInput
  $vehicleLimit: Int
) {
  # 2. Charts Data
  getAbastecimentoCharts(vehicleLimit: $vehicleLimit filters: $filters) {
    costByDepartment{
      department
      total
    }
    costByPlate{
      plate
      total
    }
    costOverTime{
      date
      total
    }
    rankingByDate{
      date
      total
    }
    rankingByPlate{
      plate
      quantity
      total
    }
    rankingByDepartment{
      department
      total
    }
  }
}
`
export const GET_COMBUSTIVEL_TABLE_DATA_QUERY = `
  query GetAbastecimentoDashboardData (
  $filters: AbastecimentoFiltersInput
  $limit: Int
  $offset: Int
  $sortBy: String
  $sortDirection: String
  $tableFilters: AbastecimentoTableFiltersInput
) {
  # 3. Dados da Tabela (paginados e com novo campo 'id')
  tableData: getAbastecimentosTable(
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

  columns: getAbastecimentosColumns {
    header
    accessor
    sortable
    dataType
    isFilterable
    filterKey
  }

  totalCount: getAbastecimentosTableCount(
    filters:$filters
    tableFilters: $tableFilters
  )
}
`
/**
 * @description Query para buscar as opções dinâmicas para os filtros do dashboard de manutenção.
 * É chamada toda vez que um filtro é alterado para atualizar as opções dos outros.
 */
export const GET_COMBUSTIVEL_FILTER_OPTIONS_QUERY = `
query GetAbastecimentoFiltersOptions($filters: AbastecimentoFiltersOptionsInput) {
  AbastecimentoFilterOptions(filters: $filters) {
    departmentOptions {
      value
      label
    }
    vehiclePlateOptions{
      value
      label
    }
    vehicleModelOptions{
      value
      label
    }
    gasStationCityOptions{
      value
      label
    }
    gasStationNameOptions{
      value
      label
    }
  }
}
`
// =================================================
//      FONTES DE DADOS (DATA SOURCES)
// ================================================

/**
 * @description Query para baixar o relatório completo e detalhado dos abastecimentos.
 */
export const DOWNLOAD_ALL_COMBUSTIVEL_QUERY = `
  query DownloadAllAbastecimento {
  getAbastecimentos {
    data: datetime
    custo: cost
    quantidadeAbastecida: fuelVolume
    tipoCombustivel: fuelType
    motorista: driverName
    departamento: department
    veiculo: vehicle {
      placa: plate
      modelo: model
      marca: brand
    }
    posto:gasStation {
      nome: name
      cidade: city
    }
  }
}`

export const DOWNLOAD_VEHICLE_SUMMARY_QUERY = `
query DownloadVehicleSummary {
  getAbastecimentoVehicleSummary {
    departamento: department
    custoTotal: totalCost
    quantidadeAbastecimento: supplyCount
    veiculo: vehicle {
      placa: plate
      modelo: model
      marca: brand
    }
  }
} 
`