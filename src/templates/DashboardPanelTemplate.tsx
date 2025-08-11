import { useNavigate } from 'react-router-dom';
import { ChartsSection } from '../components/ChartSection/ChartSection';
import Header from '../components/HeaderSection/Header';
import { KPICard, KPISection } from '../components/KPISection/KPISection';

import type { JSX, ReactNode } from 'react';
import type { ChartConfig } from '../types/charts';

// Função para formatar a data no padrão pt-BR
const formatBrDate = (dateString?: string): string | undefined => {
  if (!dateString) return undefined;
  // Converte a string ISO para um objeto Date e formata
  return new Date(dateString).toLocaleDateString('pt-BR', {
    timeZone: 'UTC', // Garante que a data não mude por causa do fuso horário
  });
};

// Props que o nosso template de painel vai receber
interface DashboardPanelTemplateProps {
  title: string;
  description: string;
  lastUpdate?: string;
  kpiData: { icon: JSX.Element; title: string; value: string }[];
  chartConfig: ChartConfig[];
  filtersComponent: ReactNode;
  tableComponent: ReactNode;
}

export const DashboardPanelTemplate = ({
  title,
  description,
  lastUpdate,
  kpiData,
  chartConfig,
  filtersComponent,
  tableComponent,
}: DashboardPanelTemplateProps) => {
  const navigate = useNavigate();
  const formattedLastUpdate = formatBrDate(lastUpdate);

  return (
    <div className="space-y-6 my-4">
      <Header
        title={title}
        description={description}
        onBackToHub={() => navigate('/hub')}
        lastUpdate={formattedLastUpdate}
      />
      <KPISection>
        {kpiData.map((kpi, index) => <KPICard key={index} {...kpi} />)}
      </KPISection>

      {filtersComponent}

      <ChartsSection charts={chartConfig} />

      {tableComponent}
    </div>
  );
};