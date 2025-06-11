// exemplo de uso no final do componente
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type DataItem = {
  label: string;
  [ key: string ]: string | number;
};

type LineChartProps = {
  title: string
  data: DataItem[];
  keys?: string[];
  colors: readonly string[];
  sizeLegend?: number;
  sizeTitle?: number,
  showLegend?: boolean;
  height: number
  width: number
};;

export const LineChartRecharts = ({
  title,
  data,
  height,
  keys,
  width,
  sizeLegend,
  sizeTitle,
  colors,
  showLegend
}: LineChartProps) => {
  const dataKeys = keys ?? Object.keys(data[ 0 ] ?? {}).filter(k => k !== 'label');
  return (
    <div
      className={`flex flex-col w-fit items-center justify-center py-3`}
      style={{ width, height: height + 20 }}
    >
      <p
        className='font-semibold pb-2'
        style={{ fontSize: sizeTitle }}
      >{title}</p>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          {showLegend && (
            <Legend
              wrapperStyle={{
                fontSize: sizeLegend,
              }}
            />
          )}
          {dataKeys.map((key, i) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={colors[ i % colors.length ]}
              name={key}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// Exemplo do componente e sua database

// const sampleDataLineChart = [
//   {
//     "label": "2022",
//     "uv": 4000,
//     "pv": 2400,
//     "amt": 2400
//   },
//   {
//     "label": "2023",
//     "uv": 3000,
//     "pv": 1398,
//     "amt": 2210
//   },
//   {
//     "label": "2024",
//     "uv": 2000,
//     "pv": 9800,
//     "amt": 2290
//   },
//   {
//     "label": "2025",
//     "uv": 2780,
//     "pv": 3908,
//     "amt": 2000
//   },
// ]

{/* <LineChartRecharts
  data={sampleDataLineChart}
  title="Gráfico de Linhas"
  showLegend={true}
  sizeLegend={16}
  sizeTitle={20}
  height={300}
  width={400}
  colors={[ "#8884d8", "#82ca9d", "#FFBB28" ]}
/> */}