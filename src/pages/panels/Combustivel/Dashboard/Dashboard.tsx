import { FuelIcon } from 'lucide-react';
import type { JSX, Key } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../../components/Header/Header';
import { KPICard, KPISection } from '../../../../components/KPI/KPISection';


const buttonFunction = () => {
  const navigate = useNavigate();
  navigate('/hub');
};
const lastUpdate = 'dd/mm/yyyy';
const KPIData = [
  {
    title: 'Gastos Totais',
    value: 'R$ 10.000,00',
    icon: <FuelIcon />,
  },
  {
    title: 'Média Diária',
    value: 'R$ 500,00',
    icon: <FuelIcon />,
  },
  {
    title: 'Abastecimentos',
    value: '20',
    icon: <FuelIcon />,
  },
];

const AbastecimentoConfig = {
  title: 'Abastecimento',
  description: 'Visualize e filtre os dados de gastos com combustível.',
  buttonFunction: buttonFunction,
  lastUpdate: lastUpdate,
  icon: <FuelIcon />,
  kpiData: KPIData,
};
const KPIAbastecimento = ({ kpiDataList }: { kpiDataList: { icon: JSX.Element; title: string; value: string; }[] }) => {
  return (
    <KPISection>
      {kpiDataList.map((kpi: { icon: JSX.Element; title: string; value: string; }, index: Key | null | undefined) => (
        <KPICard
          key={index}
          icon={kpi.icon}
          title={kpi.title}
          value={kpi.value}
        />
      ))}
    </KPISection>
  );
}

const DashboardAbastecimento = () => {

  return (
    <div>
      <Header title={AbastecimentoConfig.title} description={AbastecimentoConfig.description} onBackToHub={AbastecimentoConfig.buttonFunction} lastUpdate={AbastecimentoConfig.lastUpdate}/>
      <KPIAbastecimento kpiDataList={AbastecimentoConfig.kpiData} />
    </div>

  );
}

export default DashboardAbastecimento;