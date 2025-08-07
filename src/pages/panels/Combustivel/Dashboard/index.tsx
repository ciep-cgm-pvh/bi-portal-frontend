// Importando o novo template
import { DashboardPanelTemplate } from '../../../../templates/DashboardPanelTemplate';

// Importando componentes e configs locais
import { SupplyFilters } from './components/Filters';
import { SupplyTable } from './components/Table';
import { chartConfiguration } from './data/charts.config';
import { kpiData } from './data/kpi.config';

const DashboardCombustivel = () => {
  return (
    <DashboardPanelTemplate
      title="Abastecimento"
      description="Visualize e filtre os dados de gastos com combustível."
      lastUpdate="07/08/2025"
      kpiData={kpiData}
      chartConfig={chartConfiguration}
      filtersComponent={<SupplyFilters />}
      tableComponent={<SupplyTable />}
    />
  );
};

export default DashboardCombustivel;