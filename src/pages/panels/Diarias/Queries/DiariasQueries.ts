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
  query Diarias{
  getDiarias {
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
// =================================================
//      Dynamic Filters
// ================================================

/**
 * @description Query para buscar as opções dinâmicas para os filtros do dashboard de manutenção.
 * É chamada toda vez que um filtro é alterado para atualizar as opções dos outros.
 */

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
