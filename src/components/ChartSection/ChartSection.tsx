import { Bar, BarChart, CartesianGrid, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts';
import type { ChartConfig } from '../../types/charts';
import { ChartCard } from '../Charts/ChartCard/ChartCard';

// Função para formatar valores como moeda BRL
const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

// Cores para o gráfico de pizza
const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

interface ChartsSectionProps {
  charts: ChartConfig[];
  isLoading?: boolean;
}

export const ChartsSection = ({ charts, isLoading = false }: ChartsSectionProps) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {charts.map((chart) => (
        <ChartCard key={chart.id} title={chart.title} isLoading={isLoading} hasData={chart.data && chart.data.length > 0}>
          
          {/* --- INÍCIO DA CORREÇÃO --- */}

          {/* Renderiza Gráfico de Barras */}
          {(chart.type === 'bar-vertical' || chart.type === 'bar-horizontal') && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chart.data} layout={chart.type === 'bar-horizontal' ? 'vertical' : 'horizontal'}>
                <CartesianGrid strokeDasharray="3 3" vertical={chart.type === 'bar-horizontal'} horizontal={chart.type === 'bar-vertical'} />
                <XAxis type={chart.type === 'bar-horizontal' ? 'number' : 'category'} dataKey={chart.type === 'bar-vertical' ? chart.config.categoryKey : undefined} />
                <YAxis type={chart.type === 'bar-vertical' ? 'number' : 'category'} dataKey={chart.type === 'bar-horizontal' ? chart.config.categoryKey : undefined} width={80} />
                <Tooltip formatter={(value: number) => [new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value), 'Total']} />
                <Bar dataKey={chart.config.dataKey} fill={chart.config.color} />
              </BarChart>
            </ResponsiveContainer>
          )}

          {/* Renderiza Gráfico de Pizza */}
          {chart.type === 'pie' && (
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Tooltip formatter={(value: number) => [new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value), 'Total']} />
                <Pie data={chart.data} dataKey={chart.config.dataKey} nameKey={chart.config.nameKey} cx="50%" cy="50%" outerRadius={100} label>
                  {chart.data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'][index % 5]} />
                  ))}
                </Pie>
              </RechartsPieChart>
            </ResponsiveContainer>
          )}
          
          {/* --- FIM DA CORREÇÃO --- */}
          
        </ChartCard>
      ))}
    </section>
  );
};