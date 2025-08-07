import type { ChartConfig } from '../../../../../types/charts';


// Mock de dados para os gráficos
const Top10Orgaos = [
  { orgao: 'SEMAGRIC', total: 4500.50 },
  { orgao: 'SEMED', total: 3200.00 },
  { orgao: 'SEMIAS', total: 5100.75 },
  { orgao: 'SEMUSA', total: 4800.00 },
  { orgao: 'SGG', total: 4500.50 },
  { orgao: 'SEMUSB', total: 3200.00 },
  { orgao: 'SEINFRA', total: 5100.75 },
  { orgao: 'SEMAD', total: 4800.00 },
  { orgao: 'SEMDESTUR', total: 4500.50 },
  { orgao: 'SEMTEL', total: 3200.00 },
  { orgao: 'SEMA', total: 5100.75 },
  { orgao: 'SMCL', total: 4800.00 },
  { orgao: 'CGM', total: 4500.50 },
  { orgao: 'SEMEC', total: 3200.00 },
  { orgao: 'PGM', total: 5100.75 },
  { orgao: 'SEMTRAN', total: 4800.00 },
  { orgao: 'SEMPOG', total: 4500.50 },
];

const gastoMensal = [
  { month: 'Jan', total: 12000.00 },
  { month: 'Feb', total: 15000.00 },
  { month: 'Mar', total: 13000.00 },
  { month: 'Apr', total: 14000.00 },
  { month: 'May', total: 16000.00 },
  { month: 'Jun', total: 17000.00 },
  { month: 'Jul', total: 18000.00 },
];

export const chartConfiguration: ChartConfig[] = [
  {
    id: 'top-10-orgaos',
    title: 'Top 10 Órgãos por Gasto',
    type: 'bar-horizontal',
    data: Top10Orgaos,
    config: { dataKey: 'total', categoryKey: 'orgao', color: '#155dfc' },
  },
  {
    id: 'gasto-mensal',
    title: 'Gasto Mensal',
    type: 'bar-vertical',
    data: gastoMensal,
    config: { dataKey: 'total', categoryKey: 'month', color: 'green' },
  },
];