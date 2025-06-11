export const OverView = () => {
  return (
    <>
      <h1 
      className='text-2xl font-bold bg-lime-500 rounded-md p-2 mb-4 text-left'
      >VISÃO GERAL</h1>
      <OverViewKpiCards/>
      <div className="mb-4 grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <OverViewTimeLine />
        </div>
        <div className="col-span-1">
          <OverViewPizzaDistribution />
        </div>
      </div>
    </>
  )
}

const OverViewKpiCards = () => {

  // Sample data for KPI cards
  const kpiCardsData = [
    { title: "Total de OS", value: "24.5K", change: "+12.3%", color: "emerald-500" },
    { title: "Valor Total", value: "1.2K", change: "+8.1%", color: "emerald-500" },
    { title: "Custo Médio por OS", value: "$15.4K", change: "+10.5%", color: "emerald-500" },
    { title: "Total de Veículos distintos", value: "3.2K", change: "+5.0%", color: "emerald-500" }
  ]

  return (
    <>
    <div className="mb-4 grid grid-cols-4 gap-4">
      {/* Generate KPI Cards */}
      {kpiCardsData.map((card, index) => (
        <div key={index} className="rounded-lg bg-slate-900 p-8 shadow-md flex flex-col items-start">
          <p className="text-xs font-medium text-slate-400">{card.title}</p>
          <p className="text-lg font-semibold text-white">{card.value}</p>
          <span className={`text-xs font-medium text-${card.color}`}>{card.change}</span>
        </div>
      ))}
    </div>
    </>
  )
}

const OverViewTimeLine = () => {
  return (
    <>
      <h2 className='text-xl font-semibold mb-4'>Linha do Tempo</h2>
      <div className="bg-slate-900 p-4 rounded-lg shadow-md">
        {/* Sample Timeline Content */}
        <p className="text-white">Aqui estará a linha do tempo dos eventos...</p>
      </div>
    </>
  )
}
const OverViewPizzaDistribution = () => {
  return (
    <>
    </>
  )
}