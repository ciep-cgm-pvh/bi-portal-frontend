// Tipos base existentes (sem alterações)
interface BaseChartConfig {
  id: string;
  title: string;
  data: any[];
}

export interface BarChartConfig extends BaseChartConfig {
  type: 'bar-vertical' | 'bar-horizontal';
  config: {
    dataKey: string;
    categoryKey: string;
    color?: string;
    tickFormatter?: (value: any) => string;
  };
}

export interface PieChartConfig extends BaseChartConfig {
  type: 'pie';
  config: {
    dataKey: string;
    nameKey: string;
  };
}

// --- NOVOS TIPOS ADICIONADOS ---

// 1. Definição para o Gráfico de Linha
export interface LineChartConfig extends BaseChartConfig {
  type: 'line';
  config: {
    dataKey: string;
    categoryKey: string;
    color?: string;
    tickFormatter?: (value: any) => string;
  };
}

// 2. Definição para as colunas da Tabela de Ranking
export interface RankingTableColumn {
  header: string;
  accessor: string;
  className?: string;
  render?: (value: any) => React.ReactNode;
}

// 3. Definição para a Tabela de Ranking
export interface RankingTableConfig extends BaseChartConfig {
  type: 'ranking-table';
  config: {
    columns: RankingTableColumn[];
  };
}

// 4. Atualize o tipo unificado para incluir os novos tipos
export type ChartConfig = BarChartConfig | PieChartConfig | LineChartConfig | RankingTableConfig;