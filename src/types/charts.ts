// Um item de dado genérico para qualquer gráfico
export type ChartDataItem = {
  [ key: string ]: string | number;
};

// Configuração base para qualquer gráfico
interface BaseChartConfig {
  id: string; // Identificador único para o `key` do React
  title: string;
  type: 'bar-vertical' | 'bar-horizontal' | 'pie';
  data: ChartDataItem[];
}

// Configuração específica para gráficos de barra
export interface BarChartConfig extends BaseChartConfig {
  type: 'bar-vertical' | 'bar-horizontal';
  config: {
    dataKey: string;    // A chave do valor numérico (ex: 'total')
    categoryKey: string; // A chave da categoria/label (ex: 'month')
    color: string;      // A cor das barras (ex: '#8884d8')
    tickFormatter?: (value: any) => string;
  };
}

// Configuração específica para gráficos de pizza/donut
export interface PieChartConfig extends BaseChartConfig {
  type: 'pie';
  config: {
    dataKey: string; // A chave do valor numérico (ex: 'value')
    nameKey: string; // A chave do nome da fatia (ex: 'name')
  };
}

// União de todos os tipos de configuração de gráfico possíveis
export type ChartConfig = BarChartConfig | PieChartConfig;