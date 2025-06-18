// exemplo de uso no final do componente
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { Cell, Legend, Pie, PieChart as RePieChart, ResponsiveContainer, Tooltip } from 'recharts';

type DataItem = {
  label: string;
  value: number;
};

type PieChartProps = {
  title: string
  data: DataItem[]
  colors?: readonly string[]
  sizeLegend?: number
  sizeTitle?: number
  showLegend?: boolean
  donut?: boolean
  chartHeight?: number
  chartWidth?: number
  className?: string
};;

export const PieChartRecharts = ({
  title = "Titulo do Gráfico",
  data,
  colors = [ '#8884d8', '#82ca9d', '#ffc658', '#ff8042' ],
  chartHeight = 200,
  chartWidth = 350,
  sizeLegend = 16,
  sizeTitle = 16,
  showLegend = true,
  donut = false,
  className = ''
}: PieChartProps) => {

  return (
    <div
      className={`flex flex-col items-center justify-center px-2 py-3 ${className}`}
    >
      <p
        className='font-semibold'
        style={{ fontSize: sizeTitle }}
      >{title}</p>
      <ResponsiveContainer width="100%" height="100%">
        <RePieChart
          width={chartWidth}
          height={chartHeight}
        >
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            outerRadius={chartHeight / 4}
            innerRadius={donut ? chartHeight / 8 : 0}
            label={({ percent, name }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[ index % colors.length ]} />
            ))}
          </Pie>
          <Tooltip />
          {showLegend &&
            <Legend
              wrapperStyle={{
                fontSize: (sizeLegend),
              }}
            />}
        </RePieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const PieChartD3 = ({
  data,
  colors = d3.schemeTableau10,
  sizeLegend = 16,
  sizeTitle = 16,
  showLegend = true,
  donut = false,
  chartHeight = 230,
  chartWidth = 350,
  title,
  className = ''
}: PieChartProps) => {
  const ref = useRef<SVGSVGElement | null>(null);

  // Ajustar raios para respeitar largura e altura
  const radius = Math.min(chartWidth, chartHeight) / 2;

  useEffect(() => {
    if (!ref.current) return;

    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    const pie = d3.pie<DataItem>().value(d => d.value);
    const innerRadius = donut ? radius / 2 : 0;
    const arc = d3.arc<d3.PieArcDatum<DataItem>>()
      .innerRadius(innerRadius)
      .outerRadius(radius - 10);

    const arcs = pie(data);

    const g = svg.append('g').attr('transform', `translate(${chartWidth / 2},${chartHeight / 2})`);

    g.selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr('d', arc as never)
      .attr('fill', (_, i) => colors[ i % colors.length ])
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
      .append('title')
      .text(d => `${d.data.label}: ${d.data.value}`);

    // Labels dentro da fatia
    g.selectAll('text')
      .data(arcs)
      .enter()
      .append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('font-size', '10px')
      .text(d => `${Math.round((d.value / d3.sum(data, d => d.value)) * 100)}%`);
  }, [ data, colors, radius, donut, chartWidth, chartHeight ]);

  return (
    <div className={`w-fit flex flex-col items-center border border-amber-400 ${className}`}>
      {title && <h2
        className={`font-semibold py-2`}
        style={{ fontSize: sizeTitle }}
      >{title}</h2>}
      <svg ref={ref} width={chartWidth} height={chartHeight} />

      {showLegend && (
        <ul
          className="flex gap-3 my-3 text-sm"
          style={{ fontSize: sizeLegend }}
        >
          {data.map((item, i) => (
            <li key={i} className="flex items-center space-x-1">
              <span
                className="w-3 h-3 inline-block rounded"
                style={{ backgroundColor: colors[ i % colors.length ] }}
              />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Exemplo de database, e componente

// const sampleDataPieChart = [
//   { label: 'React', value: 40 },
//   { label: 'Vue', value: 30 },
//   { label: 'Angular', value: 20 },
//   { label: 'Svelte', value: 10 },
// ];

{/* <PieChartRecharts
  data={sampleDataPieChart}
  donut={true}
  title="Gráfico de Teste com D3js"
  showLegend={true}
  sizeLegend={12}
  sizeTitle={24}
  height={230}
  width={350}
  colors={[ '#0088FE', '#00C49F', '#FFBB28', '#ff3e00' ]}
/>  */}


{/* <PieChartD3
  data={sampleDataPieChart}
  donut={true}
  title="Gráfico de Teste com D3js"
  showLegend={true}
  sizeLegend={12}
  sizeTitle={24}
  height={230}
  width={350}
  colors={[ '#0088FE', '#00C49F', '#FFBB28', '#ff3e00' ]}
/> */}