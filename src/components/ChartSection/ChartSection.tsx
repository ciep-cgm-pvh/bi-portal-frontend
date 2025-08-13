import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { BarChartConfig, ChartConfig, LineChartConfig, PieChartConfig, RankingTableConfig } from '../../types/charts';
import { ChartCard } from '../Charts/ChartCard/ChartCard';
import { RankingTable } from '../Rankingtable/RankingTable';
import useIsMobile from '../../hooks/useIsMobile';

// --- HELPERS (No changes) ---
const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

const PIE_COLORS = [
  '#0088FE', '#FF8042', '#AF19FF', '#00C49F', '#FFBB28', 
  '#F44336', '#3F51B5', '#4CAF50', '#9C27B0', '#000'
];

// --- DEDICATED RENDER FUNCTIONS ---

/**
 * Renders a Bar Chart (vertical or horizontal).
 */

const formatAxisCurrency = (value: number): string => {
  if (value >= 1000000) {
    return `R$ ${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `R$ ${(value / 1000)}k`;
  }
  return `R$ ${value}`;
};

const renderBarChart = (chart: BarChartConfig, currencyAxis: boolean = false) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart 
      data={chart.data.slice().reverse()} // <-- 1. REVERTE A ORDEM PARA EXIBIR O MAIOR EM CIMA
      layout="vertical"
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }} // Ajuste de margem
    >
      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
      <XAxis 
        type="number"
        domain={[0, 'dataMax']} // <-- 2. DEFINE O VALOR MÁXIMO AUTOMATICAMENTE
        tickFormatter={currencyAxis ? formatAxisCurrency : chart.config.tickFormatter} // <-- 3. FORMATA OS VALORES EM REAIS (R$)
        tick={{ fontSize: 12 }}
      />
      <YAxis 
        type="category" 
        dataKey={chart.config.categoryKey}
        width={80}
        interval={0} // Garante que todos os 10 labels sejam exibidos
        tick={{ fontSize: 12 }}
      />
      <Tooltip formatter={(value: number) => [formatCurrency(value), 'Total']} />
      <Bar dataKey={chart.config.dataKey} fill={chart.config.color || '#155dfc'} barSize={20} />
    </BarChart>
  </ResponsiveContainer>
);

/**
 * Renders a Pie Chart.
 */

const processPieData = (data: any[], nameKey: string, dataKey: string) => {
  if (data.length <= 10) {
    return data;
  }

  // Sort data by value in descending order to find the top items
  const sortedData = [...data].sort((a, b) => b[dataKey] - a[dataKey]);

  // Get the top 9
  const top9 = sortedData.slice(0, 9);

  // Sum the values of all other items
  const othersSum = sortedData.slice(9).reduce((acc, item) => acc + item[dataKey], 0);

  // Create the 'Outros' slice if there's a sum
  if (othersSum > 0) {
    const othersSlice = {
      [nameKey]: 'Outros',
      [dataKey]: othersSum,
    };
    return [...top9, othersSlice];
  }
  
  return top9;
};
const renderPieChart = (chart: PieChartConfig) => {
  // --- INÍCIO DAS ALTERAÇÕES ---

  // 2. Chama o hook para verificar o tamanho da tela
  const isMobile = useIsMobile();
  
  const processedData = processPieData(chart.data, chart.config.nameKey, chart.config.dataKey);

  // 3. Define props dinâmicas com base em isMobile
  const legendProps = isMobile
    ? {
        layout: 'horizontal' as const,
        verticalAlign: 'bottom' as const,
        align: 'center' as const,
        wrapperStyle: { paddingTop: '15px', width: '100%' }
      }
    : {
        layout: 'vertical' as const,
        verticalAlign: 'middle' as const,
        align: 'right' as const,
        wrapperStyle: { paddingLeft: "10px" }
      };

  const pieCx = isMobile ? '50%' : '40%';
  const pieOuterRadius = isMobile ? 80 : 100;

  return (
    <ResponsiveContainer width="100%" height="100%">
      {/* Ajusta a margem inferior no mobile para dar espaço à legenda */}
      <RechartsPieChart margin={{ top: 5, right: 20, left: 20, bottom: isMobile ? 60 : 5 }}>
        <Tooltip formatter={(value: number, name: string) => [formatCurrency(value), name]} />
        {/* Aplica as props da legenda dinamicamente */}
        <Legend {...legendProps} />
        <Pie
          data={processedData}
          dataKey={chart.config.dataKey}
          nameKey={chart.config.nameKey}
          cx={pieCx} // Posição X dinâmica
          cy="50%"
          outerRadius={pieOuterRadius} // Raio dinâmico
          labelLine={false}
          label={({ percent }) => `${(percent * 100).toFixed(1)}%`}
        >
          {processedData.map((_, index) => (
            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
          ))}
        </Pie>
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

/**
 * Renders a Line Chart.
 */
const renderLineChart = (chart: LineChartConfig) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={chart.data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis 
        dataKey={chart.config.categoryKey}
        tickFormatter={chart.config.tickFormatter}
        interval={Math.ceil(chart.data.length / 10)}
        tick={{ fontSize: 12 }}
      />
      <YAxis tickFormatter={(value) => `R$ ${new Intl.NumberFormat('pt-BR').format(value)}`} tick={{ fontSize: 12 }} />
      <Tooltip formatter={(value: number) => [formatCurrency(value), 'Total']} />
      <Line type="monotone" dataKey={chart.config.dataKey} stroke={chart.config.color || '#82ca9d'} strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
    </LineChart>
  </ResponsiveContainer>
);

/**
 * Renders a Ranking Table.
 */
const renderRankingTable = (chart: RankingTableConfig) => (
  <RankingTable 
    data={chart.data} 
    columns={chart.config.columns} 
  />
);

// --- MAIN COMPONENT ---

interface ChartsSectionProps {
  charts: ChartConfig[];
  isLoading?: boolean;
}

export const ChartsSection = ({ charts, isLoading = false }: ChartsSectionProps) => {
  
  // This function determines which chart component to render based on the type.
  const renderChart = (chart: ChartConfig) => {
    switch (chart.type) {
      case 'bar-vertical':
      case 'bar-horizontal':
        return renderBarChart(chart);
      case 'pie':
        return renderPieChart(chart);
      case 'line':
        return renderLineChart(chart);
      case 'ranking-table':
        return renderRankingTable(chart);
      default:
        return null; // Or a placeholder for unknown chart types
    }
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {charts.map((chart) => (
        <ChartCard key={chart.id} title={chart.title} isLoading={isLoading} hasData={chart.data && chart.data.length > 0}>
          {renderChart(chart)}
        </ChartCard>
      ))}
    </section>
  );
};
