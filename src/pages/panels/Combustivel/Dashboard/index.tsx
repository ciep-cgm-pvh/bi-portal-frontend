// Importando o novo template
import { useState } from 'react';
import { DashboardPanelTemplate } from '../../../../templates/DashboardPanelTemplate';

// Importando componentes e configs locais
import { AbastecimentoFilters } from './components/Filters'; // pending graphql integration
import { AbastecimentoTable } from './components/Table'; // with graphql integration, no filters yet
import { initialFilterValues } from './data/filters.config';
import { useChartData } from './hooks/useChartData'; // with graphql integration, no filters yet
import { useKpiData } from './hooks/useKpiData'; // with graphql integration, no filters yet


const DashboardCombustivel = () => {
  const [filters, setFilters] = useState(initialFilterValues);

  const { kpiData, lastUpdate  } = useKpiData({ filters });
  const { chartConfig } = useChartData({ filters });
  
  // A função para aplicar os filtros é passada para o componente filho.
  const handleApplyFilters = (newFilters: any) => {
    setFilters(newFilters);
  };
  
  const handleClearFilters = () => {
    setFilters(initialFilterValues);
  };

  return (
    <DashboardPanelTemplate
      title="Abastecimento"
      description="Visualize e filtre os dados de gastos com combustível."
      lastUpdate={lastUpdate}
      kpiData={kpiData}
      chartConfig={chartConfig}
      filtersComponent={
        <AbastecimentoFilters 
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
        />
      }
      // Passe os filtros para a tabela também
      tableComponent={<AbastecimentoTable filters={filters} />}
    />
  );
};

export default DashboardCombustivel;