import { VerticalBarChartRecharts } from '../../../components/Charts/BarChart';
import { LineChartRecharts } from '../../../components/Charts/LineChart';
import GenericTable from '../../../components/Table/GenericTable';

const SuppliersSection = ({isMobile}:{isMobile:boolean}) => {
  return (
      <>
        <h1 
        className='text-2xl font-bold bg-official-yellow rounded-md p-2 mb-4 text-left'
        >ESTABELECIMENTOS E FORNECEDORES</h1>
        
        <h2 className='text-xl font-semibold bg-chart-title rounded-t-md p-2 text-center'>Estabelecimentos com mais Ordem de Serviço (OS)</h2>
        <SuppliersTable isMobile={isMobile} />
        <div className={`mb-4 grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-4'}`}>
          <div className={isMobile ? '' : 'col-span-2'}>
            <h2 className='text-xl font-semibold bg-chart-title rounded-t-md p-2 text-center'>Gasto Total por Estabelecimento</h2>
            <SuppliersBarChart isMobile={isMobile} className={'bg-white'} />
          </div>
          <div className={isMobile ? '' : 'col-span-2'}>
            <h2 className='text-xl font-semibold bg-chart-title rounded-t-md p-2 text-center'>Evolução de custo por CNPJ</h2>
            <SuppliersTimeLine className={'bg-white '} />
          </div>
        </div>
      </>
  );
}

const SuppliersTable = ({ isMobile, className }: { isMobile: boolean; className?: string }) => {
  const sampleData = [
    { placa: 'ABC-1234', modelo: 'Fiat Uno', ano: 2015, os: 12, custo: 5200 },
    { placa: 'XYZ-5678', modelo: 'Chevrolet Onix', ano: 2018, os: 8, custo: 3400 },
    { placa: 'DEF-9101', modelo: 'Toyota Corolla', ano: 2020, os: 15, custo: 7800 },
    { placa: 'GHI-1121', modelo: 'Ford Ka', ano: 2016, os: 5, custo: 2100 },
  ];

  const anos = [...new Set(sampleData.map((d) => d.ano))];

  return (
    <GenericTable
      data={sampleData}
      columns={[
        { field: 'placa' },
        { field: 'modelo' },
        { field: 'ano' },
        { field: 'os', label: 'Nº de OS' },
        { field: 'custo', label: 'Custo Total (R$)' },
      ]}
      filtersConfig={[
        { field: 'modelo', label: 'Modelo', type: 'text' },
        { field: 'ano', label: 'Ano', type: 'select', options: anos },
        { field: 'custo', label: 'Custo', type: 'number' },
      ]}
      isMobile={isMobile}
      className={className}
    />
  );
};

const SuppliersBarChart = ({isMobile, className}:{isMobile:boolean, className:string}) => {
  const sampleDataBarChart = [
      { label: 'Janeiro', vendas: 300, lucro: 240, margemErro: 20 },
      { label: 'Fevereiro', vendas: 350, lucro: 221, margemErro: 40 },
      { label: 'Março', vendas: 100, lucro: 29, margemErro: 200 },
      { label: 'Março', vendas: 250, lucro: 129, margemErro: 70 },
      { label: 'Março', vendas: 200, lucro: 246, margemErro: 120 },
  ];

  return (
    <>
    <div className={`${className} p-4 rounded-b-lg shadow-md ${isMobile? 'max-h-72':'max-h-96'} h-full overflow-y-auto flex items-center justify-center`}>
      <VerticalBarChartRecharts
        data={sampleDataBarChart}
        title={""}
        showLegend={true}
        sizeLegend={12}
        sizeTitle={20}
        height={230}
        width={350}
        colors={[ '#61dafb', '#dd1b16', '#FFBB28' ]}
        className={`text-white w-full h-full ${isMobile? 'text-sm': 'text-base'}`}
      />
      </div>
    </>
  )
}

const SuppliersTimeLine = ({className}:{className:string}) => {
  const sampleDataLineChart = [
      {
        "label": "2022",
        "uv": 4000,
        "pv": 2400,
        "amt": 2400
      },
      {
        "label": "2023",
        "uv": 3000,
        "pv": 1398,
        "amt": 2210
      },
      {
        "label": "2024",
        "uv": 2000,
        "pv": 9800,
        "amt": 2290
      },
      {
        "label": "2025",
        "uv": 2780,
        "pv": 3908,
        "amt": 2000
      },
    ]
  return (
    <>
      <div className={`${className} p-4 rounded-b-lg shadow-md max-h-96 h-full overflow-y-auto flex items-center justify-center`}>
        <LineChartRecharts
          data={sampleDataLineChart}
          title=""
          showLegend={true}
          sizeLegend={16}
          sizeTitle={20}
          height={300}
          width={1250}
          colors={[ "#8884d8", "#82ca9d", "#FFBB28" ]}
          className='text-white w-full h-full'
        />
      </div>
    </>
  )
}

export default SuppliersSection;