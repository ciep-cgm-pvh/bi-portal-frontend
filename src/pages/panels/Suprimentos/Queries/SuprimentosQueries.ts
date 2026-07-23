// Local: src/pages/panels/Suprimentos/Queries/SuprimentosQueries.ts

// =================================================
//      PAINEL DE SUPRIMENTOS - DASHBOARD
// ================================================

/**
 * Query para buscar os dados paginados da tabela de Suprimentos
 */
export const GET_SUPRIMENTOS_TABLE_DATA_QUERY = `
  query SuprimentosTable(
    $limit: Int
    $offset: Int
    $sortBy: String
    $sortDirection: String
    $filters: SuprimentoFiltersInput
    $tableFilters: SuprimentoTableFiltersInput
  ) {
    getSuprimentoTable(
      limit: $limit
      offset: $offset
      sortBy: $sortBy
      sortDirection: $sortDirection
      filters: $filters
      tableFilters: $tableFilters
    ) {
      data {
        departmentCode
        grantedAmount
        status
        employee
        approvalDate
        processNumber
      }
      totalCount
    }
  }
`;

/**
 * Query para buscar os KPIs de Suprimentos e a data da última atualização
 */
export const GET_SUPRIMENTOS_KPIS_DATA_QUERY = `
  query SuprimentosKpis($filters: SuprimentoFiltersInput) {
    SuprimentoKpis(filters: $filters) {
      totalConcedido
      totalAprovado
      totalProcessos
      lastUpdate
    }
    getSuprimentoLastUpdate
  }
`;

/**
 * Query para buscar os dados dos gráficos de Suprimentos
 */
export const GET_SUPRIMENTOS_CHARTS_DATA_QUERY = `
  query SuprimentosCharts($filters: SuprimentoFiltersInput) {
    SuprimentoCharts(filters: $filters) {
      GastoOrgao {
        name
        total
      }
      GastoMes {
        name
        total
      }
      GastoFuncionario {
        name
        total
      }
    }
  }
`;

/**
 * Query para buscar as opções dinâmicas de filtros do dashboard de Suprimentos
 */
export const GET_SUPRIMENTOS_FILTER_OPTIONS_QUERY = `
  query GetSuprimentosFilterOptions($filters: SuprimentoFiltersInput) {
    SuprimentoFilterOptions(filters: $filters) {
      departmentCode {
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
      employee {
        value
        label
      }
    }
  }
`;
