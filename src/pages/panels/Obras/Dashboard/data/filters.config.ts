import type { FilterConfig } from "../../../../../types/filters";

// IDs alinhados com getObrasFiltersOptions
export const baseFilterConfig: FilterConfig[] = [
  {
    id: 'from',
    label: 'Data Inicial',
    type: 'date',
  },
  {
    id: 'to',
    label: 'Data Final',
    type: 'date',
  },
  {
    id: "departmentCode",
    label: "Secretaria",
    placeholder: 'Todas as secretarias',
    type: "select",
    options: []
  },
  {
    id: "program",
    label: "Programa",
    placeholder: 'Todos os programas',
    type: "select",
    options: []
  },
  {
    id: "projectActivity",
    label: "Atividade / Projeto",
    placeholder: 'Todas as atividades',
    type: "select",
    options: []
  },
  {
    id: "creditor",
    label: "Credor",
    placeholder: 'Todos os credores',
    type: "select",
    options: []
  },
  {
    id: "processNumber",
    label: "Nº do Processo",
    placeholder: 'Todos os processos',
    type: "select",
    options: []
  }
];

export const initialFilterValues = {
  from: "2023-01-01",
  to: "2026-12-31",
  departmentCode: "",
  program: "",
  projectActivity: "",
  creditor: "",
  processNumber: "",
};
