import type { FilterConfig } from '../../../../../types/filters';


export const filterConfiguration: FilterConfig[] = [
  // diarias -> Nº Processo	Órgão	Data Pagamento	Funcionário	Valor Concedido	Situação

  {
    id: 'orgao',
    label: 'Órgão',
    type: 'select',
    placeholder: 'Todos os órgãos',
    options: [
      { value: 'orgao1', label: 'Órgão 1' },
      { value: 'orgao2', label: 'Órgão 2' },
      { value: 'orgao3', label: 'Órgão 3' },
    ],
  },
  {
    id: 'status',
    label: 'Status',
    type: 'select',
    placeholder: 'Todos os status',
    options: [
      { value: 'aprovado', label: 'Aprovado' },
      { value: 'pendente', label: 'Pendente' },
      { value: 'rejeitado', label: 'Rejeitado' },
    ],
  },
  {
    id: 'startDate',
    label: 'Data Inicial',
    type: 'date',
  },
  {
    id: 'endDate',
    label: 'Data Final',
    type: 'date',
  },
];

export const initialFilterValues = { orgao: '', status: '', from: '', to: '' };