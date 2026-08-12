// Local: src/pages/panels/Contratos/Queries/ContratosQueries.ts

// =================================================
//      PAINEL DE CONTRATOS DE REPASSES / CONVÊNIOS
// =================================================
//
// Fonte: aba PRATA da planilha "TOP - OBRAS BI", a mesma que alimentava o
// painel no Looker Studio. O grão de cada registro é um contrato/convênio.
//
// A origem não tem coluna de data, só o ano — por isso o período é filtrado
// por ano e a série temporal é anual.

/**
 * Query para buscar os dados paginados da tabela de Contratos
 */
export const GET_CONTRATOS_TABLE_DATA_QUERY = `
  query ContratosTable(
    $limit: Int
    $offset: Int
    $sortBy: String
    $sortDirection: String
    $filters: ContratosFilters
    $tableFilters: ContratosTableFilters
  ) {
    getContratosTable(
      limit: $limit
      offset: $offset
      sortBy: $sortBy
      sortDirection: $sortDirection
      filters: $filters
      tableFilters: $tableFilters
    ) {
      data {
        id
        processNumber
        year
        departmentCode
        parliamentarian
        resourceSource
        area
        neighborhood
        description
        transferAmount
        counterpartAmount
        globalAmount
        status
      }
      totalCount
    }
  }
`;

/**
 * Query para buscar os KPIs e a data de referência da carga
 */
export const GET_CONTRATOS_KPIS_DATA_QUERY = `
  query ContratosKpis($filters: ContratosFilters) {
    getContratosKpi(filters: $filters) {
      totalRepasse
      totalContrapartida
      totalGlobal
      totalContratos
      totalProcessos
    }

    getContratosLastUpdate
  }
`;

/**
 * Query para buscar os dados dos gráficos
 */
export const GET_CONTRATOS_CHARTS_DATA_QUERY = `
  query ContratosCharts($filters: ContratosFilters) {
    getContratosCharts(filters: $filters) {
      ValorPorAno {
        name
        total
      }
      ValorPorSecretaria {
        name
        total
      }
      ValorPorParlamentar {
        name
        total
      }
      ValorPorArea {
        name
        total
      }
      ValorPorFonte {
        name
        total
      }
      ContratosPorStatus {
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
 * Query para buscar as opções dinâmicas dos filtros.
 * O backend aplica cascata: cada filtro lista opções sem se auto-restringir.
 */
export const GET_CONTRATOS_FILTER_OPTIONS_QUERY = `
  query GetContratosFilterOptions($filters: ContratosFiltersOptions) {
    getContratosFiltersOptions(filters: $filters) {
      year {
        value
        label
      }
      processNumber {
        value
        label
      }
      resourceSource {
        value
        label
      }
      parliamentarian {
        value
        label
      }
      departmentCode {
        value
        label
      }
      neighborhood {
        value
        label
      }
      area {
        value
        label
      }
      status {
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
 * Query para baixar o relatório completo dos contratos.
 */
export const DOWNLOAD_ALL_CONTRATOS_QUERY = `
  query DownloadAllContratos {
    getContratos {
      processNumber
      year
      departmentCode
      parliamentarian
      resourceSource
      area
      neighborhood
      description
      transferAmount
      counterpartAmount
      globalAmount
      status
      statusRaw
    }
  }
`;

/**
 * Query para baixar o consolidado por secretaria.
 */
export const DOWNLOAD_CONTRATOS_SUMMARY_QUERY = `
  query DownloadContratosSummary {
    getContratosSecretariaSummary {
      departmentCode
      totalRepasse
      totalContrapartida
      totalGlobal
      contratoCount
    }
  }
`;
