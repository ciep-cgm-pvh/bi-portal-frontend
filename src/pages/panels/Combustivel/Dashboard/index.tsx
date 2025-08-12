// Importando o novo template
import { useEffect, useRef, useState } from 'react';
import { DashboardPanelTemplate } from '../../../../templates/DashboardPanelTemplate';

// Importando componentes e configs locais
import { AbastecimentoFilters } from './components/Filters'; // pending graphql integration
import { AbastecimentoTable } from './components/Table'; // with graphql integration, no filters yet
import { initialFilterValues } from './data/filters.config';
import { useChartData } from './hooks/useChartData'; // with graphql integration, no filters yet
import { useKpiData } from './hooks/useKpiData'; // with graphql integration, no filters yet

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

// ADICIONE ESTE LOG PARA VERIFICAR A ATUALIZAÇÃO DO ESTADO PRINCIPAL
  useEffect(() => {
    console.log('%c[DASHBOARD] 2. Estado de filtros foi atualizado (pai):', 'color: green; font-weight: bold;', filters);
  }, [filters]);

  const handleApplyFilters = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    // Agora, "Limpar" reseta para o período padrão, não para valores vazios.
    setFilters({
      ...initialFilterValues,
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
        <>
          <AbastecimentoFilters
            initialValues={filters} // Passa os filtros (com as datas) para o componente
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