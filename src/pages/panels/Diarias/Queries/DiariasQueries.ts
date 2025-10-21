// Local: src/pages/panels/Manutencao/queries/ManutencaoQueries.ts

// =================================================
//      PAINEL DE MANUTENÇÃO - DASHBOARD
// ================================================

/**
 * @description Query principal que busca todos os dados necessários para o dashboard de manutenção.
 * Inclui KPIs, dados para gráficos, opções de filtros dinâmicos e a primeira página da tabela.
 * O objetivo é carregar o estado inicial do painel com uma única requisição.
 */
export const GET_DIARIAS_DASHBOARD_DATA_QUERY = `
  query Diarias(
  $limit: Int
  $offset: Int
  $sortBy: String
  $sortDirection: String
  $filters: DiariasFilters
	$tableFilters: DiariasTableFilters
){
  getDiarias(filters: $filters) {
    employee
    paymentDate
    processNumber
    department
    defaultDate
    approvedDate
    canceledDate
  }

  getDiariasTable(
    limit: $limit
    offset: $offset
    sortBy: $sortBy
    sortDirection: $sortDirection
    filters: $filters
    tableFilters: $tableFilters
  ){
    employee
    department
    amountGranted
    status
    paymentDate
    processNumber
  }

  getDiariasKpi(filters: $filters) {
    totalGasto
    totalDiarias
  }

  getDiariasCharts(filters: $filters) {
    GastoMesDiaria {
      month
      total
    }
    OrgaoGastoDiaria {
      name
      total
    }
  }
  getDiariasTableCount(filters: $filters tableFilters: $tableFilters)
  getDiariasLastUpdate
}
`;
// =================================================
//      Dynamic Filters
// ================================================

/**
 * @description Query para buscar as opções dinâmicas para os filtros do dashboard de manutenção.
 * É chamada toda vez que um filtro é alterado para atualizar as opções dos outros.
 */

export const GET_DIARIAS_FILTER_OPTIONS_QUERY = `
  query GetDiariasFilterOptions($filtersOptions: DiariasFiltersOptions) {
    getDiariasFiltersOptions(filters: $filtersOptions) {
      department {
        value
        label
      }
      status {
        value
        label
      }
      processNumber {
        value
        label
      }
    }
  }
`;


/**
 * @description Query para baixar o relatório completo e detalhado das manutenções.
 */
export const DOWNLOAD_ALL_DIARIAS_QUERY_by_gemini = `
  query DownloadAllManutencoes {
    getManutencao {
      id
      os
      datetime
      plate
      numCard
      prefixo
      typeFrota
      brand
      model
      year
      patrimony
      kmHorimetro
      estabelecimento
      city
      uf
      cnpj
      department
      typeOs
      categoryOs
      nomeAprovador
      cpfAprovador
      nfPecas
      nfMdo
      nfConjugada
      declaracao
      correcao
      condutorEntregou
      condutorRetirou
      responsavelTecnico
      totalMdo
      discountTaxaMdo
      mdoDiscount
      totalPecas
      discountTaxaPecas
      pecasWithDiscount
      totalWithoutDiscount
      totalCost
      client
      secretaria
      period
      archive
    }
`;

/**
 * @description Query para baixar um resumo de custos por veículo.
 */
export const DOWNLOAD_VEHICLE_SUMMARY_QUERY = `
  query DownloadVehicleSummary {
    getManutencaoVehicleSummary {
      placa
      modelo
      marca
      secretaria
      totalCost
      serviceOrderCount
    }
  }
`;
