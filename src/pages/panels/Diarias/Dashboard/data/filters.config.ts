import type { FilterConfig } from "../../../../../types/filters";

// IDs alinhados com getDiariasFiltersOptions
export const baseFilterConfig: FilterConfig[] = [
  { id: "department", label: "Secretaria", type: "select", options: [] },
  { id: "status", label: "Status", type: "select", options: [] },
  { id: "processNumber", label: "Nº do Processo", type: "select", options: [] }, // pode trocar para 'text' se preferir digitação livre
  { id: "dateRange", label: "Período", type: "daterange" }, // usa from/to
];

export const initialFilterValues = {
  department: "",
  status: "",
  processNumber: "",
  dateRange: { from: "2025-01-01", to: "2025-06-30" }, // ISO 'YYYY-MM-DD' quando houver valor
};

