import { Database, LayoutDashboard, TrafficCone } from 'lucide-react';
import { HomePanelTemplate } from '../../../../templates/HomePanelTemplate';
import type { ActionLink } from '../../../../types/home';

const panelTitle = "Painel de Obras";
const panelSubtitle = "Acompanhamento da execução das obras públicas municipais";
const panelDescription = (
  <>
    Este painel oferece uma visão consolidada <strong>sobre as obras públicas do município</strong>, permitindo acompanhar valores contratados, valores pagos e o percentual de execução de cada empreendimento. Explore <strong>gráficos interativos, KPIs financeiros e tabelas dinâmicas</strong> para apoiar a transparência e o controle social sobre os investimentos em infraestrutura.
  </>
);

const panelActionLinks: ActionLink[] = [
  {
    text: 'Acessar Painel',
    path: '/painel/obras/dashboard',
    variant: 'primary',
    icon: <LayoutDashboard size={18} />,
  },
  {
    text: 'Fonte de Dados',
    path: '/painel/obras/datasource',
    variant: 'secondary',
    icon: <Database size={18} />,
  },
];

const HomeObras = () => {
  return (
    <HomePanelTemplate
      icon={<TrafficCone size={48} />}
      title={panelTitle}
      subtitle={panelSubtitle}
      description={panelDescription}
      actionLinks={panelActionLinks}
    />
  );
};

export default HomeObras;
