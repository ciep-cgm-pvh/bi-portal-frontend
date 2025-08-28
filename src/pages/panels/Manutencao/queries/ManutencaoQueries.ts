

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
  ) {
    id # NOVO
    os
    secretaria: department
    placa: plate
    data: datetime
    categoriaOs: categoryOs
    total: totalCost
  }

  # 5. Contagem Total de Itens para Paginação
  totalCount: TableCount(filters: $filters)
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
    getAllManutencoes {
      id
      os
      data
      placa
      kmHorimetro
      estabelecimento
      cidade
      tipoOs
      categoriaOs
      total
      secretaria
      # Adicionar outros campos detalhados conforme necessário
    }
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