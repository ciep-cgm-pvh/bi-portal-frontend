import { Check } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChartsSection } from '../components/ChartSection/ChartSection';
import Header from '../components/HeaderSection/Header';
import { KPICard, KPISection } from '../components/KPISection/KPISection';

import type { JSX, ReactNode } from 'react';
import type { ChartConfig } from '../types/charts';

type PhaseStatus = 'done' | 'in-progress' | 'pending';

const ProjectPhases = ({ mockData, phasesData }: { mockData: boolean, phasesData: { [key: string]: PhaseStatus } }) => {
  // Define the status for each phase
  const phases = {
    'Dados de Abastecimento': !mockData ? 'done' : 'in-progress',
    ...phasesData
  };

  const phasesArray = Object.entries(phases);

  const getStatusStyles = (status: PhaseStatus) => {
    switch (status) {
      case 'done':
        return {
          bgColor: 'bg-green-500',
          borderColor: 'border-green-500',
          icon: <Check className="w-6 h-6 text-white" />,
        };
      case 'in-progress':
        return {
          bgColor: 'bg-yellow-400',
          borderColor: 'border-yellow-400',
          icon: <div className="w-3 h-3 bg-white rounded-full animate-pulse" />,
        };
      case 'pending':
      default:
        return {
          bgColor: 'bg-white',
          borderColor: 'border-gray-300',
          icon: <div className="w-4 h-4 rounded-full bg-gray-300" />,
        };
    }
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-bold text-gray-700 mb-6 text-center md:text-left">Progresso do Desenvolvimento do Painel</h3>
      <div className="flex items-start">
        {phasesArray.map(([name, status], index) => {
          const isLastItem = index === phasesArray.length - 1;
          const { bgColor, borderColor, icon } = getStatusStyles(status as PhaseStatus);
          // The connector is green only if the current step is fully 'done'
          const connectorColor = status === 'done' ? 'bg-green-500' : 'bg-gray-300';

          return (
            <React.Fragment key={name}>
              {/* Step Item */}
              <div className="flex flex-col items-center w-24">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${bgColor} ${borderColor}`}>
                  {icon}
                </div>
                <p className="mt-2 text-xs font-medium text-center text-gray-600">{name}</p>
              </div>

              {/* Connector Line */}
              {!isLastItem && (
                <div className="flex-1 mt-5 h-1.5 rounded-full" style={{ background: connectorColor }}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};


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
  mockData: boolean;
  panelStatus: boolean;
  panelStatusPhasesData: { [key: string]: PhaseStatus };
  title: string;
  description: string;
  lastUpdate?: string;
  kpiData: { icon: JSX.Element; title: string; value: string }[];
  chartConfig: ChartConfig[];
  filtersComponent: ReactNode;
  tableComponent: ReactNode;
}

export const DashboardPanelTemplate = ({
  mockData = true,
  panelStatus = false,
  panelStatusPhasesData = {},
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
      {mockData && mockDataWarning()}

      {/* Development Progress Timeline */}
      {panelStatus && <ProjectPhases mockData={mockData} phasesData={panelStatusPhasesData}/>}

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

const mockDataWarning = () => {
  return (<>
    <div className='bg-red-500 text-white p-4 rounded-md mb-4'>
      <h1 className='text-center font-bold'>Atenção: Esta página contém dados fictícios para demonstração de layout da página.</h1>
    </div>
  </>)
}
export default DashboardPanelTemplate;