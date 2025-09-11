// DiariasQueries.ts
// Estrutura centralizada de queries para o Painel de Diárias
// Segue o mesmo padrão do ManutencaoQueries.ts

import { gql } from "urql";

export const GET_DIARIAS_DASHBOARD_DATA_QUERY = gql`
  query Diarias(
    $filters: DiariasFilterInput
    $tableFilter: TableFilterInput
    $limit: Int
    $offset: Int
    $sortBy: String
    $sortDirection: String
  ) {
    getDiarias(
      filters: $filters
      tableFilter: $tableFilter
      limit: $limit
      offset: $offset
      sortBy: $sortBy
      sortDirection: $sortDirection
    ) {
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
    getDiariasKpi {
      totalGasto
      totalDiarias
    }
    getDiariasCharts {
      GastoMesDiaria {
        month
        total
      }
      OrgaoGastoDiaria {
        name
        total
      }
    }
    getDiariasFiltersOptions {
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
      paymentDate {
        value
        label
      }
    }
    getDiariasTableCount
    getDiariasLastUpdate
  }
`;
