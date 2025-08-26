import { useEffect, useRef, useState } from 'react';
import { DashboardPanelTemplate } from '../../../../templates/DashboardPanelTemplate';

import { AbastecimentoFilters } from './components/Filters';
import { AbastecimentoTable } from './components/Table';
import { initialFilterValues } from './data/filters.config';
import { useChartData } from './hooks/useChartData';
import { useKpiData } from './hooks/useKpiData';

// Função auxiliar para formatar a data no padrão YYYY-MM-DD para o input 'date'
const formatDateForInput = (dateString: string | Date): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  // Pega o ano, mês e dia em UTC para evitar deslocamento por fuso horário
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const DashboardCombustivel = () => {
  const [filters, setFilters] = useState(initialFilterValues);
  const hasInitialized = useRef(false);

  const { kpiData, lastUpdate } = useKpiData({ filters });
  const { chartConfig } = useChartData({ filters });

  useEffect(() => {
    // Roda apenas se 'lastUpdate' existir E se a inicialização ainda não ocorreu
    if (lastUpdate && !hasInitialized.current) {
      const currentYear = new Date().getFullYear();
      const firstDayOfYear = formatDateForInput(new Date(currentYear, 0, 1));
      const lastUpdateDate = formatDateForInput(lastUpdate);

      setFilters({
        ...initialFilterValues,
        startDate: firstDayOfYear,
        endDate: lastUpdateDate,
      });

      // Marca como inicializado para não executar novamente
      hasInitialized.current = true;
    }
  }, [lastUpdate]); // A dependência continua a mesma, mas a lógica interna impede re-execução

  useEffect(() => {
    console.log('%c[DASHBOARD] 2. Estado de filtros foi atualizado (pai):', 'color: green; font-weight: bold;', filters);
  }, [filters]);
  
  const handleApplyFilters = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    if (lastUpdate) {
        const currentYear = new Date().getFullYear();
        const firstDayOfYear = formatDateForInput(new Date(currentYear, 0, 1));
        const lastUpdateDate = formatDateForInput(lastUpdate);
        setFilters({
            ...initialFilterValues,
            startDate: firstDayOfYear,
            endDate: lastUpdateDate,
        });
    } else {
        setFilters(initialFilterValues);
    }
  };

  const phaseData: { [key: string]: 'done' | 'in-progress' | 'pending' } = {
    "KPI's": 'done',
    'Filtros': 'done',
    'Gráficos': 'done',
    'Tabela de Ranking': 'done',
    'Responsividade': 'done',
    'Filtros por Coluna': 'done'
  };

  // if all done panelStatus will receive false
  const showPanelStatus = !Object.values(phaseData).every((phase) => phase === 'done');


  return (
    <DashboardPanelTemplate
      mockData={false}
      panelStatus={showPanelStatus}
      panelStatusPhasesData={phaseData}
      title="Abastecimento"
      description="Visualize e filtre os dados de gastos com combustível."
      lastUpdate={lastUpdate}
      kpiData={kpiData}
      chartConfig={chartConfig}
      filtersComponent={
        <>
          <AbastecimentoFilters
            initialValues={filters}
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
          />
        </>
      }
      tableComponent={<AbastecimentoTable filters={filters} />}
    />
  );
};

export default DashboardCombustivel;