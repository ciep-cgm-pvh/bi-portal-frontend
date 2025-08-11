import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { ChartConfig } from '../../types/charts';
import { ChartCard } from '../Charts/ChartCard/ChartCard';

// Função para formatar valores como moeda BRL
const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

// Cores para o gráfico de pizza
const PIE_COLORS = [
  '#0088FE', '#FF8042', '#AF19FF', '#00C49F', '#FFBB28', 
  '#F44336', '#3F51B5', '#4CAF50', '#9C27B0', '#795548'
];

interface ChartsSectionProps {
  charts: ChartConfig[];
  isLoading?: boolean;
}

export const ChartsSection = ({ charts, isLoading = false }: ChartsSectionProps) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {charts.map((chart) => (
        <ChartCard key={chart.id} title={chart.title} isLoading={isLoading} hasData={chart.data && chart.data.length > 0}>

          {/* Renderiza Gráfico de Barras Verticais ou Horizontais */}
          {(chart.type === 'bar-vertical' || chart.type === 'bar-horizontal') && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chart.data} layout={chart.type === 'bar-horizontal' ? 'vertical' : 'horizontal'}>
                <CartesianGrid strokeDasharray="3 3" vertical={chart.type === 'bar-horizontal'} horizontal={chart.type === 'bar-vertical'} />
                <XAxis 
                  type={chart.type === 'bar-horizontal' ? 'number' : 'category'} 
                  dataKey={chart.type === 'bar-vertical' ? chart.config.categoryKey : undefined}
                  // 1. Aplica a função de formatação, se ela existir na config
                  tickFormatter={chart.config.tickFormatter}
                />
                <YAxis 
                  type={chart.type === 'bar-vertical' ? 'number' : 'category'} 
                  dataKey={chart.type === 'bar-horizontal' ? chart.config.categoryKey : undefined} 
                  width={80}
                  // 2. Garante que todos os 10 labels sejam exibidos
                  interval={0} 
                />
                <Tooltip formatter={(value: number) => [new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value), 'Total']} />
                <Bar dataKey={chart.config.dataKey} fill={chart.config.color} />
              </BarChart>
            </ResponsiveContainer>
          )}

          {/* Renderiza Gráfico de Pizza */}
          {chart.type === 'pie' && (
            <ResponsiveContainer width="100%" height="100%">
              {/* Ajuste de margem para acomodar a legenda */}
              <RechartsPieChart margin={{ top: 5, right: 30, left: 30, bottom: 5 }}>
                
                {/* ================================================================= */}
                {/* 1. TOOLTIP ATUALIZADO                                             */}
                {/* ================================================================= */}
                <Tooltip 
                  formatter={(value: number, name: string) => {
                    const formattedValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
                    // Retorna o valor formatado e usa o nome da secretaria como label
                    return [formattedValue, name];
                  }} 
                />

                {/* ================================================================= */}
                {/* 2. LEGENDA REPOSICIONADA                                          */}
                {/* ================================================================= */}
                <Legend 
                  layout="vertical" 
                  verticalAlign="middle" 
                  align="right" 
                  wrapperStyle={{ paddingLeft: "10px" }}
                />
                {/* ================================================================= */}
                {/* 3. GRÁFICO MOVIDO PARA A ESQUERDA                                 */}
                {/* ================================================================= */}
                <Pie 
                  data={chart.data} 
                  dataKey={chart.config.dataKey} 
                  nameKey={chart.config.nameKey}
                  cx="40%" // Move o centro do gráfico para 40% da largura (para a esquerda)
                  cy="50%" 
                  outerRadius={100} 
                  labelLine={false}
                  label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
                >
                  {chart.data.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
              </RechartsPieChart>
            </ResponsiveContainer>
          )}

          {/* Renderiza Tabela de Ranking */}

        </ChartCard>
      ))}
    </section>
  );
};