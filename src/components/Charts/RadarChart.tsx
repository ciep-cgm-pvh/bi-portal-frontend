// exemplo de uso no final do componente
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer
} from 'recharts';

type DataItem = {
  label: string;
  [ key: string ]: string | number;
};

type RadarChartProps = {
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

export const RadarChartRecharts = ({
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
}: RadarChartProps) => {
  const dataKeys = keys ?? Object.keys(data[ 0 ] ?? {}).filter(k => k !== 'label');

  return (
    <div className={`flex flex-col items-center justify-center py-3 ${className}`} style={{ width, height }}>
      <p className="font-semibold pb-2" style={{ fontSize: sizeTitle }}>
        {title}
      </p>

      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="80%">
          <PolarGrid />
          <PolarAngleAxis dataKey="label" />
          <PolarRadiusAxis />
          {dataKeys.map((key, i) => (
            <Radar
              key={key}
              name={key}
              dataKey={key}
              stroke={colors[ i % colors.length ]}
              fill={colors[ i % colors.length ]}
              fillOpacity={0.4}
            />
          ))}
          {showLegend && (
            <Legend wrapperStyle={{ fontSize: sizeLegend }} />
          )}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Exemplo de database, e componente

// const radarData = [
//   {
//     label: 'Math',
//     A: 120,
//     B: 110,
//     fullMark: 150,
//   },
//   {
//     label: 'Chinese',
//     A: 98,
//     B: 130,
//     fullMark: 150,
//   },
//   {
//     label: 'English',
//     A: 86,
//     B: 130,
//     fullMark: 150,
//   },
//   {
//     label: 'Geography',
//     A: 99,
//     B: 100,
//     fullMark: 150,
//   },
//   {
//     label: 'Physics',
//     A: 85,
//     B: 90,
//     fullMark: 150,
//   },
//   {
//     label: 'History',
//     A: 65,
//     B: 85,
//     fullMark: 150,
//   },
// ];

// <RadarChartRecharts
//   title="Radar Chart"
//   data={radarData}
//   height={300}
//   width={500}
//   showLegend={true}
//   sizeLegend={12}
//   sizeTitle={18}
//   colors={[ '#8884d8', '#82ca9d' ]}
// />
