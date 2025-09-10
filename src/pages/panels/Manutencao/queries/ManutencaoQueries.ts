// Local: src/pages/panels/Manutencao/queries/ManutencaoQueries.ts

// =================================================
//      PAINEL DE MANUTENÇÃO - DASHBOARD
// ================================================

/**
 * @description Query principal que busca todos os dados necessários para o dashboard de manutenção.
 * Inclui KPIs, dados para gráficos, opções de filtros dinâmicos e a primeira página da tabela.
 * O objetivo é carregar o estado inicial do painel com uma única requisição.
 */
export const GET_MANUTENCAO_DASHBOARD_DATA_QUERY = `
  query GetManutencaoDashboardData(
  $filters: ManutencaoFiltersInput
  $limit: Int
  $offset: Int
  $sortBy: String
  $sortDirection: String
  $tableFilter: ManutencaoFilterTableInput
) {
  # 1. KPIs
  kpis: ManutencaoKpis(filters: $filters) {
    totalCost
    serviceOrderCount
    averageCostPerOs
    lastUpdate
  }

  # 2. Dados para Gráficos
  charts: ManutencaoCharts(filters: $filters) {
    costByDepartment {
      name: department
      value: total
    }
    costByTypeOfManutencao {
      name: categoryOs
      value: total
    }
  }

  # 3. Opções para os Filtros (NOVO)
  filterOptions: FilterOptions {
    department {
      value
      label
    }
    categoryOs {
      value
      label
    }
    plate {
      value
      label
    }
  }

  # 4. Dados da Tabela (paginados e com novo campo 'id')
  tableData: getManutencaoTable(
    limit: $limit
    offset: $offset
    sortBy: $sortBy
    sortDirection: $sortDirection
    filters: $filters
    tableFilters: $tableFilter
  ) {
    id
    os
    department
    plate
    datetime
    categoryOs
    totalCost
  }

  # 5. Contagem Total de Itens para Paginação
  totalCount: TableCount(filters: $filters tableFilters: $tableFilter)
}
`;
// =================================================
//      Dynamic Filters
// ================================================

/**
 * @description Query para buscar as opções dinâmicas para os filtros do dashboard de manutenção.
 * É chamada toda vez que um filtro é alterado para atualizar as opções dos outros.
 */
export const GET_MANUTENCAO_FILTER_OPTIONS_QUERY = `
  query GetManutencaoFilterOptions($filters: ManutencaoFiltersInput) {
    filterOptions: FilterOptions(filters: $filters) {
      department {
        value
        label
      }
      categoryOs {
        value
        label
      }
      plate {
        value
        label
      }
    }
  }
`;


// =================================================
//      FONTES DE DADOS (DATA SOURCES)
// ================================================

/**
 * @description Query para baixar o relatório completo e detalhado das manutenções.
 */
export const DOWNLOAD_ALL_MANUTENCOES_QUERY_by_gemini = `
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