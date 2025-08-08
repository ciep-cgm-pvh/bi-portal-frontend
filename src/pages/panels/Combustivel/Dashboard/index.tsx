// Importando o novo template
import { DashboardPanelTemplate } from '../../../../templates/DashboardPanelTemplate';

// Importando componentes e configs locais
import { AbastecimentoFilters } from './components/Filters'; // pending graphql integration
import { AbastecimentoTable } from './components/Table'; // with graphql integration, no filters yet
import { useChartData } from './hooks/useChartData'; // with graphql integration, no filters yet
import { useKpiData } from './hooks/useKpiData'; // with graphql integration, no filters yet


const DashboardCombustivel = () => {
  const { kpiData, lastUpdate  } = useKpiData();
  const { chartConfig } = useChartData();
  
  return (
    <DashboardPanelTemplate
      title="Abastecimento"
      description="Visualize e filtre os dados de gastos com combustível."
      lastUpdate={lastUpdate} // needs to be dynamic and reflect the last update from the API source Data, the last register, the most recent date
      kpiData={kpiData}
      chartConfig={chartConfig}
      filtersComponent={<AbastecimentoFilters />}
      tableComponent={<AbastecimentoTable />}
    />
  );
};

export default DashboardCombustivel;