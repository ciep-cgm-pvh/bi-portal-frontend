// Local: src/pages/panels/Obras/Queries/ObrasQueries.ts

// =================================================
//      PAINEL DE OBRAS - DASHBOARD
// =================================================

/**
 * Query para buscar os dados paginados da tabela de Obras
 */
export const GET_OBRAS_TABLE_DATA_QUERY = `
  query ObrasTable(
    $limit: Int
    $offset: Int
    $sortBy: String
    $sortDirection: String
    $filters: ObrasFilters
    $tableFilters: ObrasTableFilters
  ) {
    getObrasTable(
      limit: $limit
      offset: $offset
      sortBy: $sortBy
      sortDirection: $sortDirection
      filters: $filters
      tableFilters: $tableFilters
    ) {
      data {
        id
        name
        departmentCode
        contractor
        status
        contractedAmount
        paidAmount
        executionPercentage
        neighborhood
        startDate
        expectedEndDate
      }
      totalCount
    }
  }
`;

/**
 * Query para buscar os KPIs de Obras e a data da última atualização
 */
export const GET_OBRAS_KPIS_DATA_QUERY = `
  query ObrasKpis($filters: ObrasFilters) {
    getObrasKpi(filters: $filters) {
      totalContratado
      totalPago
      totalObras
      percentualExecucaoMedio
    }

    getObrasLastUpdate
  }
`;

/**
 * Query para buscar os dados dos gráficos de Obras
 */
export const GET_OBRAS_CHARTS_DATA_QUERY = `
  query ObrasCharts($filters: ObrasFilters) {
    getObrasCharts(filters: $filters) {
      InvestimentoOrgao {
        name
        total
      }
      InvestimentoMes {
        name
        total
      }
      ObrasPorStatus {
        name
        total
      }
      InvestimentoBairro {
        name
        total
      }
    }
  }
`;

// =================================================
//      Dynamic Filters
// =================================================

/**
 * Query para buscar as opções dinâmicas dos filtros do dashboard de Obras.
 * É chamada a cada alteração de filtro para atualizar as opções dos demais.
 */
export const GET_OBRAS_FILTER_OPTIONS_QUERY = `
  query GetObrasFilterOptions($filters: ObrasFiltersOptions) {
    getObrasFiltersOptions(filters: $filters) {
      departmentCode {
        value
        label
      }
      status {
        value
        label
      }
      contractor {
        value
        label
      }
      neighborhood {
        value
        label
      }
    }
  }
`;

// =================================================
//      FONTE DE DADOS - DOWNLOADS
// =================================================

/**
 * Query para baixar o relatório completo e detalhado das obras.
 */
export const DOWNLOAD_ALL_OBRAS_QUERY = `
  query DownloadAllObras {
    getObras {
      id
      name
      departmentCode
      contractor
      status
      contractedAmount
      paidAmount
      executionPercentage
      neighborhood
      startDate
      expectedEndDate
    }
  }
`;

/**
 * Query para baixar um resumo de investimento por secretaria.
 */
export const DOWNLOAD_OBRAS_SUMMARY_QUERY = `
  query DownloadObrasSummary {
    getObrasDepartmentSummary {
      departmentCode
      totalContratado
      totalPago
      obraCount
    }
  }
`;
