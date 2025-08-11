// Importando o novo template
import { useEffect, useState } from 'react';
import { DashboardPanelTemplate } from '../../../../templates/DashboardPanelTemplate';

// Importando componentes e configs locais
import { AbastecimentoFilters } from './components/Filters'; // pending graphql integration
import { AbastecimentoTable } from './components/Table'; // with graphql integration, no filters yet
import { initialFilterValues } from './data/filters.config';
import { useChartData } from './hooks/useChartData'; // with graphql integration, no filters yet
import { useKpiData } from './hooks/useKpiData'; // with graphql integration, no filters yet

// Função auxiliar para formatar a data no padrão YYYY-MM-DD para o input 'date'
const formatDateForInput = (dateString: string | Date): string => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

const DashboardCombustivel = () => {
  const [filters, setFilters] = useState(initialFilterValues);

  const { kpiData, lastUpdate  } = useKpiData({ filters });
  const { chartConfig } = useChartData({ filters });

  useEffect(() => {
    if (lastUpdate) {
      const currentYear = new Date().getFullYear();
      const firstDayOfYear = formatDateForInput(new Date(currentYear, 0, 1));
      const lastUpdateDate = formatDateForInput(lastUpdate);

      setFilters({
        ...initialFilterValues,
        startDate: firstDayOfYear,
        endDate: lastUpdateDate,
      });
    }
  }, [lastUpdate]);
  
  // A função para aplicar os filtros é passada para o componente filho.
  const handleApplyFilters = (newFilters: any) => {
    setFilters(newFilters);
  };
  
  const handleClearFilters = () => {
    const currentYear = new Date().getFullYear();
    const firstDayOfYear = formatDateForInput(new Date(currentYear, 0, 1));
    const lastUpdateDate = lastUpdate ? formatDateForInput(lastUpdate) : '';
    
    setFilters({
      ...initialFilterValues,
      startDate: firstDayOfYear,
      endDate: lastUpdateDate,
    });
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
          initialValues={filters}
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