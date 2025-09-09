// Importando os componentes e configs de DIÁRIAS
import { DashboardPanelTemplate } from '../../../../templates/DashboardPanelTemplate';
import { Filters } from './components/Filters';
import { Table } from './components/Table';
import { kpiData } from './data/kpi.config';
import { chartConfiguration } from './data/charts.config';

const DashboardDiarias = () => {
  return (
    <DashboardPanelTemplate
      title="Diárias"
      description="Acompanhe os gastos e solicitações de diárias."
      lastUpdate="07/08/2025"
      kpiData={kpiData}
      chartConfig={chartConfiguration}
      filtersComponent={<Filters />}
      tableComponent={<Table />} mockData={false} panelStatus={false} panelStatusPhasesData={{}}    />
  );
};

export default DashboardDiarias;