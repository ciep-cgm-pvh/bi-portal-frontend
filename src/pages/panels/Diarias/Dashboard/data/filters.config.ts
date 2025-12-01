import type { FilterConfig } from "../../../../../types/filters";

// IDs alinhados com getDiariasFiltersOptions
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
    placeholder: 'Todas as unidades',
    type: "select", 
    options: [] 
  },
  { 
    id: "status", 
    label: "Status",
    placeholder: 'Todas os status',
    type: "select", 
    options: [] 
  },
  { 
    id: "employee", 
    label: "Funcionário",
    placeholder: 'Todas os funcionários',
    type: "select", 
    options: [] 
  },
  { 
    id: "processNumber", 
    label: "Nº do Processo",
    placeholder: 'Todas os processos',
    type: "select", 
    options: [] 
  }
];

export const initialFilterValues = {
  from: "2025-01-01", 
  to: "2025-06-30" ,
  departmentCode: "",
  status: "",
  processNumber: "",
  employee: "",
};

