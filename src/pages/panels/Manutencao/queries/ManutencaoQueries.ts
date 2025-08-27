export const GET_MANUTENCAO_DASHBOARD_DATA_QUERY /*by clara*/ = `
  query GetManutencaoDashboardData(
    $filters: ManutencaoFiltersInput,
    $limit: Int,
    $offset: Int,
    $sortBy: String,
    $sortDirection: String
    # A variável $tableFilters não é usada aqui porque os filtros gerais ($filters)
    # já são aplicados a todos os campos (KPIs, Gráficos e Tabela)
  ) {
    # 1. KPIs
    ManutencaoKpis(filters: $filters) {
      totalCost
      serviceOrderCount
      averageCostPerOs
      lastUpdate
    }

    # 2. Dados para Gráficos
    ManutencaoCharts(filters: $filters) {
      costByDepartment {
        name: department # Usando alias para padronizar com o componente
        value: total      # Usando alias para padronizar
      }
      costByTypeOfManutencao {
        name: categoryOs # Usando alias
        value: total       # Usando alias
      }
    }

    # 3. Dados da Tabela (paginados)
    tableData:getManutencaoTable(
      limit: $limit,
      offset: $offset,
      sortBy: $sortBy,
      sortDirection: $sortDirection,
      filters: $filters
    ) {
      # O backend deve retornar um array de objetos aqui
      os
      secretaria: department # Corrigindo para o nome de campo correto
      placa: plate     # Corrigindo para o nome de campo correto
      data: datetime     # Corrigindo para o nome de campo correto
      categoriaOs: categoryOs
      total: totalCost
    }

    # 4. Contagem Total de Itens para Paginação
    TableCount(filters: $filters)
  }
`;


// =================================================
//      PAINEL DE MANUTENÇÃO - DASHBOARD
// ================================================

/**
 * @description Query principal que busca todos os dados necessários para o dashboard de manutenção.
 * Inclui KPIs, dados para gráficos, opções de filtros dinâmicos e a primeira página da tabela.
 * O objetivo é carregar o estado inicial do painel com uma única requisição.
 */
export const GET_MANUTENCAO_DASHBOARD_DATA_QUERY_ /*by gemini*/ = `
  query GetManutencaoDashboardData(
    $filters: ManutencaoFiltersInput,
    $limit: Int,
    $offset: Int,
    $sortBy: String,
    $sortDirection: String
  ) {
    # 1. KPIs
    kpis: manutencaoKpis(filters: $filters) {
      totalCost
      serviceOrderCount
      averageCostPerServiceOrder
      lastUpdate
    }

    # 2. Dados para Gráficos
    charts: manutencaoCharts(filters: $filters) {
      costBySecretaria { name: secretaria, value: total }
      costByTipoManutencao { name: categoriaOs, value: total }
    }

    # 3. Opções para os Filtros
    filterOptions {
      secretarias { value: id, label: nome }
      categoriasOs { value: id, label: nome }
      placas { value: placa, label: placa }
    }

    # 4. Dados da Tabela (paginados)
    tableData: getManutencoesTable(
      limit: $limit,
      offset: $offset,
      sortBy: $sortBy,
      sortDirection: $sortDirection,
      filters: $filters
    ) {
      rows {
        os
        secretaria
        placa
        data
        categoriaOs
        total
      }
      totalCount
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