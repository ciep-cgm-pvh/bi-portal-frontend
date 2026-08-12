import type { FilterConfig } from "../../../../../types/filters";

/**
 * IDs alinhados com getContratosFiltersOptions.
 *
 * O período usa dois selects de ano, e não campos de data, porque a origem
 * não tem coluna de data — só o ano do contrato.
 */
export const baseFilterConfig: FilterConfig[] = [
  {
    id: 'yearFrom',
    label: 'Ano Inicial',
    placeholder: 'Desde o início',
    type: 'select',
    options: [],
  },
  {
    id: 'yearTo',
    label: 'Ano Final',
    placeholder: 'Até o mais recente',
    type: 'select',
    options: [],
  },
  {
    id: "departmentCode",
    label: "Secretaria",
    placeholder: 'Todas as secretarias',
    type: "select",
    options: []
  },
  {
    id: "parliamentarian",
    label: "Origem do Repasse",
    placeholder: 'Todas as origens',
    type: "select",
    options: []
  },
  {
    id: "resourceSource",
    label: "Fonte do Recurso",
    placeholder: 'Todas as fontes',
    type: "select",
    options: []
  },
  {
    id: "area",
    label: "Área",
    placeholder: 'Todas as áreas',
    type: "select",
    options: []
  },
  {
    id: "neighborhood",
    label: "Bairro / Distrito",
    placeholder: 'Todos os bairros',
    type: "select",
    options: []
  },
  {
    id: "status",
    label: "Status",
    placeholder: 'Todos os status',
    type: "select",
    options: []
  },
  {
    id: "processNumber",
    label: "Processo",
    placeholder: 'Todos os processos',
    type: "select",
    options: []
  }
];

export const initialFilterValues = {
  yearFrom: "",
  yearTo: "",
  departmentCode: "",
  parliamentarian: "",
  resourceSource: "",
  area: "",
  neighborhood: "",
  status: "",
  processNumber: "",
};
