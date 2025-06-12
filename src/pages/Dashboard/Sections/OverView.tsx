import { LineChartRecharts } from "../../../components/Charts/LineChart";
import { PieChartRecharts } from "../../../components/Charts/PieChart";

export const OverView = ({ isMobile }: { isMobile: boolean }) => {
  const screenMode = ["bg-slate-800", "bg-white"];
  const x = 1;
  return (
    <>
      <h1 className="text-2xl font-bold bg-official-yellow rounded-md p-2 mb-4 text-left">
        VISÃO GERAL
      </h1>
      <OverViewKpiCards
        className={
          screenMode[x] === "bg-white"
            ? "bg-white text-black"
            : "bg-slate-800 text-white"
        }
        isMobile={isMobile}
      />
      <div
        className={`mb-4 grid gap-4 ${
          isMobile ? "grid-cols-1" : "grid-cols-4"
        }`}
      >
        <div className={isMobile ? "" : "col-span-1"}>
          <OverViewPizzaDistribution
            className={screenMode[x]}
            isMobile={isMobile}
          />
        </div>
        <div className={isMobile ? "" : "col-span-3"}>
          <OverViewTimeLine className={screenMode[x]} isMobile={isMobile} />
        </div>
      </div>
    </>
  );
};

const OverViewKpiCards = ({
  className,
  isMobile,
}: {
  className: string;
  isMobile: boolean;
}) => {
  // Sample data for KPI cards
  const kpiCardsData = [
    {
      title: "Total de OS",
      value: "24.5K",
      change: "+12.3%",
      color: "emerald-500",
    },
    {
      title: "Valor Total",
      value: "1.2K",
      change: "+8.1%",
      color: "emerald-500",
    },
    {
      title: "Custo Médio por OS",
      value: "$15.4K",
      change: "+10.5%",
      color: "emerald-500",
    },
    {
      title: "Total de Veículos distintos",
      value: "3.2K",
      change: "+5.0%",
      color: "emerald-500",
    },
  ];
  console.log("isMobile:", isMobile);

  return (
    <>
      <div
        className={`mb-4 grid ${
          isMobile ? `grid-cols-2 gap-2` : `grid-cols-4 gap-4`
        }`}
      >
        {/* Generate KPI Cards */}
        {kpiCardsData.map((card, index) => (
          <div
            key={index}
            className={`rounded-lg ${className} ${
              isMobile ? "p-4" : "p-8"
            }  shadow-md flex flex-col items-ce`}
          >
            <p className="text-md font-medium">{card.title}</p>
            <p className="text-3xl font-semibold ">{card.value}</p>
            <span className={`text-md font-medium text-${card.color}`}>
              {card.change}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

const OverViewTimeLine = ({
  className,
  isMobile,
}: {
  className: string;
  isMobile: boolean;
}) => {
  const sampleDataLineChart = [
    {
      label: "2022",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      label: "2023",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      label: "2024",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      label: "2025",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
  ];
  return (
    <>
      <h2 className="text-xl font-semibold mb-4 bg-lime-500 rounded-md p-2">
        Linha do Tempo
      </h2>
      <div
        className={`${className} p-4 rounded-lg shadow-md max-h-96 h-full overflow-y-auto flex items-center justify-center`}
      >
        <LineChartRecharts
          data={sampleDataLineChart}
          title=""
          showLegend={true}
          sizeLegend={16}
          sizeTitle={20}
          height={300}
          width={1250}
          colors={["#8884d8", "#82ca9d", "#FFBB28"]}
          className="text-white w-full h-full"
        />
      </div>
    </>
  );
};
const OverViewPizzaDistribution = ({
  className,
  isMobile,
}: {
  className: string;
  isMobile: boolean;
}) => {
  const sampleDataPieChart = [
    { label: "React", value: 40 },
    { label: "Vue", value: 30 },
    { label: "Angular", value: 20 },
    { label: "Svelte", value: 10 },
  ];

  return (
    <>
      <h2 className="text-xl font-semibold mb-4 bg-lime-500 rounded-md p-2">
        Proporção por Tipo de OS
      </h2>
      <div
        className={`${className} p-4 rounded-lg shadow-md ${
          isMobile ? "max-h-72" : "max-h-96"
        } h-full overflow-y-auto flex items-center justify-center`}
      >
        <PieChartRecharts
          data={sampleDataPieChart}
          donut={true}
          title=""
          showLegend={true}
          sizeLegend={12}
          sizeTitle={24}
          chartHeight={isMobile ? 300 : 350}
          chartWidth={isMobile ? 125 : 350}
          colors={["#0088FE", "#00C49F", "#FFBB28", "#ff3e00"]}
          className="text-white w-full h-full"
        />
      </div>
    </>
  );
};
