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
    placeholder: 'Todas as unidades',
    type: "select",
    options: []
  },
  {
    id: "status",
    label: "Status da Obra",
    placeholder: 'Todos os status',
    type: "select",
    options: []
  },
  {
    id: "contractor",
    label: "Empresa Contratada",
    placeholder: 'Todas as empresas',
    type: "select",
    options: []
  },
  {
    id: "neighborhood",
    label: "Bairro",
    placeholder: 'Todos os bairros',
    type: "select",
    options: []
  }
];

export const initialFilterValues = {
  from: "2025-01-01",
  to: "2025-12-31",
  departmentCode: "",
  status: "",
  contractor: "",
  neighborhood: "",
};
