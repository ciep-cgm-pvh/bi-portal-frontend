// exemplo de uso no final do componente
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type DataItem = {
  label: string;
  [ key: string ]: string | number;
};

type BarChartProps = {
  title: string;
  data: DataItem[];
  keys?: string[];
  colors: readonly string[];
  sizeLegend?: number;
  sizeTitle?: number,
  showLegend?: boolean;
  height: number
  width: number
  className:string
};;

export const BarChartRecharts = ({
  title,
  data,
  height,
  keys,
  width,
  sizeLegend,
  sizeTitle,
  colors,
  showLegend,
  className
}: BarChartProps) => {
  const dataKeys = keys ?? Object.keys(data[ 0 ] ?? {}).filter(k => k !== 'label');

  return (
    <div
      className={`flex flex-col w-fit items-center justify-center py-3 ${className}`}
    >
      <p
        className='font-semibold pb-2'
        style={{ fontSize: sizeTitle }}
      >{title}</p>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={width} height={height} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip />
          {showLegend &&
            <Legend
              wrapperStyle={{
                fontSize: (sizeLegend),
              }}
            />}
          {dataKeys.map((key, i) => (
            <Bar
              key={key}
              dataKey={key}
              fill={colors[ i % colors.length ]}
              name={key}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export const VerticalBarChartRecharts = ({
  title,
  data,
  height,
  keys,
  width,
  sizeLegend,
  sizeTitle,
  colors,
  showLegend,
  className
}: BarChartProps) => {
  const dataKeys = keys ?? Object.keys(data[ 0 ] ?? {}).filter(k => k !== 'label');

  return (
    <div
      className={`flex flex-col w-fit items-center justify-center py-3 ${className}`}
    >
      <p
        className='font-semibold pb-2'
        style={{ fontSize: sizeTitle }}
      >{title}</p>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={width} height={height} data={data} layout='vertical'>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="label" />
          <Tooltip />
          {showLegend &&
            <Legend
              wrapperStyle={{
                fontSize: (sizeLegend),
              }}
            />}
          {dataKeys.map((key, i) => (
            <Bar
              key={key}
              dataKey={key}
              fill={colors[ i % colors.length ]}
              name={key}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

// Exemplo do componente e sua database

// const sampleDataBarChart = [
//   { label: 'Janeiro', vendas: 300, lucro: 240, margemErro: 20 },
//   { label: 'Fevereiro', vendas: 350, lucro: 221, margemErro: 40 },
//   { label: 'Março', vendas: 100, lucro: 29, margemErro: 200 },
//   { label: 'Março', vendas: 250, lucro: 129, margemErro: 70 },
//   { label: 'Março', vendas: 200, lucro: 246, margemErro: 120 },
// ];

{/* <BarChartRecharts
  data={sampleDataBarChart}
  title={"Gráfico de barras com Rechart"}
  showLegend={true}
  sizeLegend={12}
  sizeTitle={20}
  height={230}
  width={350}
  colors={[ '#61dafb', '#dd1b16', '#FFBB28' ]}
/> */}