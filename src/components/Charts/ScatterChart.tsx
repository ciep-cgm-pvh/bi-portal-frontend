// exemplo de uso no final do componente
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from 'recharts';

type ScatterDataItem = {
  x: number;
  y: number;
  z?: number;
};

type ScatterDataset = {
  name: string;
  data: ScatterDataItem[];
};

type ScatterChartProps = {
  title: string;
  data: ScatterDataset[];
  height: number;
  width: number;
  showLegend?: boolean;
  sizeTitle?: number;
  colors: readonly string[];
  xAxisLabel?: string;
  yAxisLabel?: string;
  zAxisLabel?: string;
  xUnit?: string;
  yUnit?: string;
  zUnit?: string;
  zRange?: [ number, number ];
  xTickInterval?: number;
  yTickInterval?: number;
  xTicks?: number[];
  yTicks?: number[];
  xData?: [ number, number ];
  yData?: [ number, number ];
  xTickMargin?: number;
  yTickMargin?: number;
  className?: string;
};

export const ScatterChartRecharts = ({
  title,
  data,
  height,
  width,
  showLegend = true,
  sizeTitle = 18,
  colors,
  xAxisLabel = 'x',
  yAxisLabel = 'y',
  zAxisLabel = 'z',
  xUnit = '',
  yUnit = '',
  zUnit = '',
  zRange = [ 50, 150 ],
  xTickInterval,
  yTickInterval,
  xTicks,
  yTicks,
  xData,
  yData,
  xTickMargin = 5,
  yTickMargin = 5,
  className
}: ScatterChartProps) => {
  const generateTicks = (min: number, max: number, interval: number): number[] => {
    const ticks = [];
    for (let i = min; i <= max; i += interval) {
      ticks.push(i);
    }
    return ticks;
  };

  const allX = data.flatMap(d => d.data.map(p => p.x));
  const allY = data.flatMap(d => d.data.map(p => p.y));

  const xMin = xData?.[ 0 ] ?? Math.min(...allX);
  const xMax = xData?.[ 1 ] ?? Math.max(...allX);
  const yMin = yData?.[ 0 ] ?? Math.min(...allY);
  const yMax = yData?.[ 1 ] ?? Math.max(...allY);

  const xDomain: [ number, number ] = [ xMin - xTickMargin, xMax + xTickMargin ];
  const yDomain: [ number, number ] = [ yMin - yTickMargin, yMax + yTickMargin ];

  const xTickValues = xTicks ?? (xTickInterval ? generateTicks(xDomain[ 0 ], xDomain[ 1 ], xTickInterval) : undefined);
  const yTickValues = yTicks ?? (yTickInterval ? generateTicks(yDomain[ 0 ], yDomain[ 1 ], yTickInterval) : undefined);


  return (
    <div
      className={`flex flex-col items-center justify-center ${className}`}
      style={{ width, height }}
    >
      <p className="font-semibold pt-2" style={{ fontSize: sizeTitle }}>
        {title}
      </p>

      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 5, right: 10, bottom: 15, left: 15 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="x"
            name={xAxisLabel}
            unit={xUnit}
            domain={[ xMin, xMax ]}
            ticks={xTickValues}
            label={{
              value: xAxisLabel,
              position: 'bottom',
              offset: -2,
              style: { textAnchor: 'middle', fontSize: 14 },
            }}
          />
          <YAxis
            type="number"
            dataKey="y"
            name={yAxisLabel}
            unit={yUnit}
            domain={[ yMin, yMax ]}
            ticks={yTickValues}
            label={{
              value: yAxisLabel,
              position: 'insideLeft',
              angle: -90,
              offset: -5,
              style: { textAnchor: 'middle', fontSize: 14 },
            }}
          />
          <ZAxis
            type="number"
            dataKey="z"
            name={zAxisLabel}
            unit={zUnit}
            range={zRange}
          />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          {showLegend && <Legend
            layout="horizontal"
            verticalAlign="top"
            align="center"
            wrapperStyle={{
              paddingBottom: "8px"
            }}
          />
          }
          {data.map((dataset, index) => (
            <Scatter
              key={dataset.name}
              name={dataset.name}
              data={dataset.data}
              fill={colors[ index % colors.length ]}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};
// Exemplo de database, e componente

// const data01 = [
//   { x: 150, y: 50, z: 200 },
//   { x: 163, y: 64, z: 260 },
//   { x: 170, y: 80, z: 400 },
//   { x: 143, y: 45, z: 200 },
//   { x: 169, y: 75, z: 260 },
//   { x: 175, y: 89, z: 400 },
//   { x: 157, y: 64, z: 200 },
//   { x: 166, y: 69, z: 260 },
//   { x: 181, y: 97, z: 400 },
// ];

// const data02 = [
//   { x: 165, y: 68, z: 240 },
//   { x: 176, y: 94, z: 220 },
//   { x: 149, y: 58, z: 250 },
//   { x: 181, y: 86, z: 240 },
//   { x: 171, y: 96, z: 220 },
//   { x: 147, y: 48, z: 250 },
//   { x: 169, y: 86, z: 240 },
//   { x: 165, y: 90, z: 220 },
//   { x: 158, y: 68, z: 250 },
// ];

// const sampleScatterData = [
//   { name: 'Escola A', data: data01 },
//   { name: 'Escola B', data: data02 },
// ];

// <ScatterChartRecharts
//   title="Exemplo de Scatter Chart"
//   data={sampleScatterData}
//   xAxisLabel="Altura"
//   yAxisLabel="Peso"
//   zAxisLabel="Pontuação"
//   xUnit="cm"
//   yUnit="kg"
//   zUnit="pts"
//   xTickInterval={8}
//   yTickInterval={10}
//   width={600}
//   height={300}
//   colors={[ '#8884d8', '#82ca9d' ]}
// />