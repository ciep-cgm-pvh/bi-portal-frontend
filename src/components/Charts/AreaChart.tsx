// exemplo de uso no final do componente
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

type DataItem = {
  label: string;
  [ key: string ]: string | number;
};

type AreaChartProps = {
  title: string;
  data: DataItem[];
  keys?: string[];
  colors: readonly string[];
  sizeLegend?: number;
  sizeTitle?: number;
  showLegend?: boolean;
  height: number;
  width: number;
  className?: string;
};

export const AreaChartRecharts = ({
  title,
  data,
  keys,
  colors,
  sizeLegend,
  sizeTitle,
  showLegend,
  height,
  width,
  className
}: AreaChartProps) => {
  const dataKeys = keys ?? Object.keys(data[ 0 ] ?? {}).filter(k => k !== 'label');

  return (
    <div
      className={`flex flex-col items-center justify-center py-3 ${className}`}
      style={{ width, height: height + 10 }}
    >
      <p className="font-semibold pb-2" style={{ fontSize: sizeTitle }}>
        {title}
      </p>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            {dataKeys.map((key, i) => (
              <linearGradient id={`color-${key}`} key={key} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors[ i % colors.length ]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={colors[ i % colors.length ]} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>

          <XAxis dataKey="label" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          {showLegend && (
            <Legend
              wrapperStyle={{
                fontSize: sizeLegend,
              }}
            />
          )}
          {dataKeys.map((key, i) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[ i % colors.length ]}
              fillOpacity={1}
              fill={`url(#color-${key})`}
              name={key}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

// Exemplo do componente e sua database

// const sampleAreaData = [
//   { label: "Page A", uv: 4000, pv: 2400, amt: 2400 },
//   { label: "Page B", uv: 3000, pv: 1398, amt: 2210 },
//   { label: "Page C", uv: 2000, pv: 9800, amt: 2290 },
//   { label: "Page D", uv: 2780, pv: 3908, amt: 2000 },
//   { label: "Page E", uv: 1890, pv: 4800, amt: 2181 },
//   { label: "Page F", uv: 2390, pv: 3800, amt: 2500 },
//   { label: "Page G", uv: 3490, pv: 4300, amt: 2100 }
// ];

// <AreaChartRecharts
//   title="Gráfico de Área"
//   data={sampleAreaData}
//   height={300}
//   width={500}
//   showLegend={true}
//   sizeLegend={12}
//   sizeTitle={20}
//   colors={[ "#8884d8", "#82ca9d", "#FFBB28" ]}
// />
