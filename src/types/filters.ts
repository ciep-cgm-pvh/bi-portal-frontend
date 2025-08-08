// Define a estrutura para uma opção de um campo 'select'
export interface FilterOption {
  value: string | number;
  label: string;
}

// Define a configuração para um único filtro
export interface FilterConfig {
  id: string; // Identificador único, ex: 'status' ou 'vehicleId'
  label: string; // O que aparece para o usuário, ex: "Status"
  type: 'select' | 'date' | 'text' | 'daterange'; // O tipo de input a ser renderizado
  placeholder?: string;
  options?: FilterOption[]; // Obrigatório apenas se o type for 'select'
}

// Define o formato do objeto que guarda os valores de todos os filtros
export type FilterValues = {
  [ key: string ]: string | number;
};