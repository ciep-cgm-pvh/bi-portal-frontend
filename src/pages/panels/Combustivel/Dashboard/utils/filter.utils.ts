// src/pages/panels/Combustivel/Dashboard/utils/filter.utils.ts

/**
 * Prepara o objeto de filtros do frontend para ser enviado como variável
 * para a query GraphQL, tratando datas e removendo valores nulos/vazios.
 * @param rawFilters - O estado bruto dos filtros do formulário.
 * @returns Um objeto de filtros limpo e formatado para a API.
 */
export const prepareGqlFilters = (rawFilters: any) => {
  const gqlFilters: { [ key: string ]: any } = {};

  // Itera sobre todas as chaves do objeto de filtros
  for (const key in rawFilters) {
    // Ignora as chaves de data, pois serão tratadas separadamente
    if (key === 'startDate' || key === 'endDate') {
      continue;
    }
    // Adiciona o filtro à nova estrutura apenas se ele tiver um valor
    if (rawFilters[ key ]) {
      gqlFilters[ key ] = rawFilters[ key ];
    }
  }

  // Trata o filtro de período (daterange) de forma especial
  if (rawFilters.startDate && rawFilters.endDate) {
    gqlFilters.dateRange = {
      from: new Date(rawFilters.startDate).toISOString(),
      to: new Date(rawFilters.endDate).toISOString(),
    };
  }

  return gqlFilters;
};