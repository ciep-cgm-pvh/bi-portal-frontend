import type { ChartConfig } from '../../../../../types/charts';


// Mock de dados para os gráficos
const gastoPorVeiculoData = [
  { vehicle: 'Fiat Strada', total: 4500.50 },
  { vehicle: 'VW Gol', total: 3200.00 },
  { vehicle: 'Honda Civic', total: 5100.75 },
  { vehicle: 'Toyota Corolla', total: 4800.00 },
];

const gastoPorStatusData = [
  { name: 'Aprovado', value: 15000 },
  { name: 'Pendente', value: 2100 },
  { name: 'Rejeitado', value: 500 },
];

export const chartConfiguration: ChartConfig[] = [
  {
    id: 'gasto-por-veiculo',
    title: 'Gasto Total por Veículo',
    type: 'bar-horizontal',
    data: gastoPorVeiculoData,
    config: { dataKey: 'total', categoryKey: 'vehicle', color: '#8884d8' },
  },
  {
    id: 'gasto-por-status',
    title: 'Distribuição de Gasto por Status',
    type: 'pie',
    data: gastoPorStatusData,
    config: { dataKey: 'value', nameKey: 'name' },
  },
];