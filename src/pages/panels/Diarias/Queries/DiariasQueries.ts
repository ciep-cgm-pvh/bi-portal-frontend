// Local: src/pages/panels/Diarias/Queries/DiariasQueries.ts

// =================================================
//      PAINEL DE DIÁRIAS - DASHBOARD
// ================================================

/**
 * @description Query principal (remove 'approvedDate' do getDiariasTable).
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
      # approvedDate REMOVIDO
      amountGranted
      status
      paymentDate
      processNumber
    }

    getDiariasTableCount(filters: $filters, tableFilters: $tableFilters)

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

    getDiariasLastUpdate
  }
`;

// =================================================
//      Dynamic Filters
// ================================================

/**
 * @description Query dedicada para buscar as opções dinâmicas (remove 'paymentDate').
 */
export const GET_DIARIAS_FILTER_OPTIONS_QUERY = `
  query GetDiariasFiltersOptions($filters: DiariasFiltersOptions) {
    getDiariasFiltersOptions(filters: $filters) {
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
      # paymentDate REMOVIDO
    }
  }
`;
// ... (DOWNLOAD_ALL_DIARIAS_QUERY permanece inalterado)
/**
 * @description Query para baixar o relatório completo e detalhado das diárias.
 * Mantemos os campos originais aqui, caso sejam usados no relatório.
 */
export const DOWNLOAD_ALL_DIARIAS_QUERY = `
  query DownloadAllDiarias($filters: DiariasFilters) {
    getDiarias(filters: $filters) {
      department
      budgetUnit
      action
      expensePlan
      resourceSource
      expenseType
      payment
      paymentDate
      settlement
      commitment
      employee
      history
      processNumber
      defaultDate
      delayDays
      approvedDate
      canceledDate
      amountToApprove
      amountApproved
      amountCanceled
      amountGranted
      balance
    }
  }
`;
