// Local: src/pages/panels/Obras/Queries/ObrasQueries.ts

// =================================================
//      PAINEL DE OBRAS - DASHBOARD
// =================================================
//
// Fonte: GPI módulo CPE -> Listagem de Empenho, filtrada pelos elementos de
// despesa 4490.51 (Obras e Instalações), 3390.39-16 e 3390.39-21.
// O grão de cada registro é um EMPENHO — um mesmo processo pode ter vários.
//
// Valores (conforme mapeamento da fonte):
//   Empenhado = Vlr Empenho Líquido
//   Liquidado = Vlr Empenho Liquidado - Vlr Empenho Liquidado Anulado
//   Pago      = Vlr Empenho Pago + Vlr Empenho Liquidado Desconto
//               - Vlr Empenho Pago Anulado - Vlr Empenho Liquidado Desconto Anulado

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
        empenhoNumber
        empenhoDate
        departmentCode
        program
        projectActivity
        creditor
        processNumber
        subject
        committedAmount
        settledAmount
        paidAmount
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
      totalEmpenhado
      totalLiquidado
      totalPago
      totalProcessos
      totalEmpenhos
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
      EmpenhadoOrgao {
        name
        total
      }
      EmpenhadoMes {
        name
        total
      }
      EmpenhadoPrograma {
        name
        total
      }
      EmpenhadoCredor {
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
 * O backend aplica cascata: cada filtro lista opções sem se auto-restringir.
 */
export const GET_OBRAS_FILTER_OPTIONS_QUERY = `
  query GetObrasFilterOptions($filters: ObrasFiltersOptions) {
    getObrasFiltersOptions(filters: $filters) {
      departmentCode {
        value
        label
      }
      program {
        value
        label
      }
      projectActivity {
        value
        label
      }
      creditor {
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

// =================================================
//      FONTE DE DADOS - DOWNLOADS
// =================================================

/**
 * Query para baixar o relatório completo e detalhado dos empenhos de obras.
 */
export const DOWNLOAD_ALL_OBRAS_QUERY = `
  query DownloadAllObras {
    getObras {
      empenhoNumber
      empenhoYear
      empenhoDate
      empenhoType
      departmentCode
      budgetUnit
      program
      projectActivity
      expenseElement
      fundingSource
      subElement
      creditor
      creditorCode
      creditorDocument
      processNumber
      subject
      contractNumber
      contractYear
      committedAmount
      settledAmount
      paidAmount
    }
  }
`;

/**
 * Query para baixar um resumo consolidado por secretaria.
 */
export const DOWNLOAD_OBRAS_SUMMARY_QUERY = `
  query DownloadObrasSummary {
    getObrasDepartmentSummary {
      departmentCode
      totalEmpenhado
      totalLiquidado
      totalPago
      empenhoCount
    }
  }
`;
