import { useNavigate } from 'react-router-dom';
import Header from '../../../../components/HeaderSection/Header';
import { KPICard, KPISection } from '../../../../components/KPISection/KPISection';
import { ChartsSection } from '../../../../components/ChartSection/ChartSection';

// Importando componentes e configs locais
import { SupplyFilters } from './components/Filters';
import { SupplyTable } from './components/Table';
import { kpiData } from './data/kpi.config';
import { chartConfiguration } from './data/charts.config';

const DashboardCombustivel = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 my-4">
      <Header
        title="Abastecimento"
        description="Visualize e filtre os dados de gastos com combustível."
        onBackToHub={() => navigate('/hub')}
        lastUpdate="06/08/2025"
      />

      <KPISection>
        {kpiData.map((kpi, index) => <KPICard key={index} {...kpi} />)}
      </KPISection>
      
      <SupplyFilters />
      
      <ChartsSection charts={chartConfiguration} />
      
      <SupplyTable />
    </div>
  );
};

export default DashboardCombustivel;