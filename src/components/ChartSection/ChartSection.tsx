import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart as RechartsPieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import useIsMobile from '../../hooks/useIsMobile';
import type { BarChartConfig, ChartConfig, LineChartConfig, PieChartConfig, RankingTableConfig } from '../../types/charts';
import { ChartCard } from '../Charts/ChartCard/ChartCard';
import { RankingTable } from '../Rankingtable/RankingTable';

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

/**
 * Abrevia valores no eixo em escala pt-BR (mil / mi / bi). Sem isso o eixo
 * imprime o número cru, incluindo o resíduo de ponto flutuante das somas.
 */
const formatAxisCurrency = (value: number): string => {
  const v = Number(value) || 0;
  const abs = Math.abs(v);
  const ptBR = (n: number, digits: number) =>
    n.toLocaleString('pt-BR', { maximumFractionDigits: digits });

  if (abs >= 1_000_000_000) return `R$ ${ptBR(v / 1_000_000_000, 1)} bi`;
  if (abs >= 1_000_000) return `R$ ${ptBR(v / 1_000_000, 1)} mi`;
  if (abs >= 1_000) return `R$ ${ptBR(v / 1_000, 0)} mil`;
  return `R$ ${ptBR(v, 0)}`;
};

/**
 * Nomes de categoria como "329 - ATENÇÃO ESPECIALIZADA, AMBULATORIAL E
 * HOSPITALAR" não cabem no eixo nem na legenda. O valor completo continua
 * disponível no tooltip.
 */
const truncateLabel = (value: unknown, max: number): string => {
  const text = String(value ?? '');
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
};

/** Remove o resíduo de ponto flutuante das somas, preservando os centavos. */
const roundToCents = (value: number) => Math.round(value * 100) / 100;

/**
 * Eixo com o número cru: não formata como moeda, só tira o resíduo de ponto
 * flutuante do rótulo. Definir o domain não basta — o Recharts refaz a conta
 * ao gerar a marca e o resíduo volta (183504318.42000005).
 */
const formatRawTick = (value: number): string => String(roundToCents(Number(value) || 0));

/** Rótulo de eixo em reais, com separador de milhar pt-BR. */
const formatAxisPtBR = (value: number): string =>
  `R$ ${new Intl.NumberFormat('pt-BR').format(roundToCents(Number(value) || 0))}`;

/** Largura do eixo de categorias proporcional ao maior rótulo, com teto. */
const categoryAxisWidth = (data: Record<string, unknown>[], categoryKey: string) => {
  const longest = data.reduce(
    (max, item) => Math.max(max, String(item?.[categoryKey] ?? '').length),
    0
  );
  return Math.min(Math.max(longest * 6.5, 60), 170);
};
const processBarData = (data: any[], categoryKey: string, dataKey: string) => {
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
      [categoryKey]: 'Outros',
      [dataKey]: othersSum,
    };
    return [...top9, othersSlice];
  }

  return top9;
};
const renderBarChart = (chart: BarChartConfig, currencyAxis: boolean = false) => {
  const data = processBarData(chart.data, chart.config.categoryKey, chart.config.dataKey);
  const axisWidth = categoryAxisWidth(data, chart.config.categoryKey);
  // O eixo termina no maior valor da série. Somas de ponto flutuante trazem
  // resíduo (25598452.000000004), então arredonda-se para centavos.
  const domainMax = roundToCents(
    data.reduce((max, item) => Math.max(max, Number(item?.[chart.config.dataKey]) || 0), 0)
  );
  // ~6.5px por caractere: converte a largura reservada em nº de caracteres.
  const maxChars = Math.floor(axisWidth / 6.5);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 5, right: 40, left: 8, bottom: 5 }}
      >
        <CartesianGrid horizontal={false} stroke="#e5e7eb" />
        <XAxis
          type="number"
          domain={[0, domainMax]}
          tickFormatter={
            currencyAxis ? formatAxisCurrency : (chart.config.tickFormatter ?? formatRawTick)
          }
          tick={{ fontSize: 11 }}
        />
        <YAxis
          type="category"
          dataKey={chart.config.categoryKey}
          width={axisWidth}
          interval={0}
          tick={{ fontSize: 11 }}
          tickFormatter={(value) => truncateLabel(value, maxChars)}
        />
        <Tooltip formatter={(value: number) => [formatCurrency(value), 'Total']} />
        <Bar dataKey={chart.config.dataKey} fill={chart.config.color || '#155dfc'} barSize={18} radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

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
        wrapperStyle: { paddingTop: '15px', width: '100%', fontSize: 12, lineHeight: '22px' }
      }
    : {
        layout: 'vertical' as const,
        verticalAlign: 'middle' as const,
        align: 'right' as const,
        // maxWidth reserva a faixa da legenda; paddingLeft afasta do gráfico.
        wrapperStyle: { paddingLeft: '16px', fontSize: 13, lineHeight: '24px', maxWidth: '42%' }
      };

  // cx é relativo à ÁREA DO GRÁFICO, não ao card: a legenda já reservou a
  // faixa dela antes desse cálculo. Por isso o centro fica em 50% — deslocar
  // para a esquerda jogava a pizza contra a borda, e o rótulo de percentual,
  // que é desenhado fora do raio, era cortado.
  const pieCx = '50%';
  const pieOuterRadius = isMobile ? 68 : 80;

  return (
    <ResponsiveContainer width="100%" height="100%">
      {/* Ajusta a margem inferior no mobile para dar espaço à legenda */}
      <RechartsPieChart margin={{ top: 12, right: 12, left: 12, bottom: isMobile ? 60 : 12 }}>
        <Tooltip formatter={(value: number, name: string) => [formatCurrency(value), name]} />
        <Legend
          {...legendProps}
          // Só encurta nomes realmente longos (os de programa passam de 50
          // caracteres); nomes curtos como "TRANSPORTE ESCOLAR" ficam inteiros.
          formatter={(value: string) => truncateLabel(value, isMobile ? 28 : 40)}
        />
        <Pie
          data={processedData}
          dataKey={chart.config.dataKey}
          nameKey={chart.config.nameKey}
          cx={pieCx} // Posição X dinâmica
          cy="50%"
          outerRadius={pieOuterRadius} // Raio dinâmico
          labelLine={false}
          // Percentual fora da fatia, na cor dela. Fatias abaixo de 2% saem sem
          // rótulo para não empilhar números uns sobre os outros; o valor
          // continua no tooltip.
          label={({ percent }: { percent: number }) =>
            percent >= 0.02 ? `${(percent * 100).toFixed(1)}%` : ''
          }
        >
          {processedData.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={PIE_COLORS[index % PIE_COLORS.length]}
              // Fresta de 2px entre fatias, na cor da superfície.
              stroke="#fff"
              strokeWidth={2}
            />
          ))}
        </Pie>
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

/**
 * Renders a Line Chart.
 */
/** "MM/YYYY" -> chave ordenável "YYYYMM". Outros formatos passam direto. */
const monthSortKey = (label: unknown): string => {
  const match = String(label ?? '').match(/^(\d{2})\/(\d{4})$/);
  return match ? `${match[2]}${match[1]}` : String(label ?? '');
};

/**
 * Ordena a série temporal de fato por data.
 *
 * Antes, o localeCompare era aplicado sobre o rótulo "MM/YYYY", o que ordena
 * por mês e só depois por ano (09/2025 vinha antes de 10/2023). Os meses
 * excedentes ainda eram somados num ponto "Outros" — que, sobre a ordem
 * errada, agregava meses espalhados e criava um pico inexistente no início da
 * linha. Numa série temporal cada período é um ponto: o eixo X rareia os
 * rótulos sozinho via interval="preserveStartEnd".
 */
const processLineChartData = (data: any[], categoryKey: string) => {
  if (!Array.isArray(data) || data.length === 0) return [];

  return [...data].sort((a, b) =>
    monthSortKey(a[categoryKey]).localeCompare(monthSortKey(b[categoryKey]))
  );
};

const renderLineChart = (chart: LineChartConfig) => {
  const processedData = processLineChartData(chart.data, chart.config.categoryKey);

  // Reserva a largura do maior rótulo do eixo. Sem isso "R$ 300.000.000"
  // quebrava em duas linhas e ficava cortado na borda do card.
  const maxValue = processedData.reduce(
    (max, item) => Math.max(max, Number(item?.[chart.config.dataKey]) || 0),
    0
  );
  const widestLabel = formatAxisPtBR(maxValue);
  const yAxisWidth = Math.min(Math.max(widestLabel.length * 6.4 + 10, 60), 130);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={processedData} margin={{ top: 5, right: 20, left: 8, bottom: 5 }}>
        <CartesianGrid stroke="#e5e7eb" />
        <XAxis
          dataKey={chart.config.categoryKey}
          tickFormatter={undefined}
          interval={"preserveStartEnd"}
          tick={{ fontSize: 11 }}
        />
        <YAxis
          tickFormatter={formatAxisPtBR}
          tick={{ fontSize: 11 }}
          width={yAxisWidth}
        />
        <Tooltip formatter={(value: number) => [formatCurrency(value), 'Total']} />
        <Line
          type="monotone"
          dataKey={chart.config.dataKey}
          stroke={chart.config.color || '#82ca9d'}
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

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
