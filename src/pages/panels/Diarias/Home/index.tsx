import { LayoutDashboard, Wrench } from 'lucide-react';
import { HomePanelTemplate } from '../../../../templates/HomePanelTemplate';
import type { ActionLink } from '../../../../types/home';


// Configuração específica para a Home do painel de Combustível
const panelTitle = "Painel de Manutenção";
const panelSubtitle = "Análise e acompanhamento dos dados de manutenção da frota";
const panelDescription = (
  <>
    Este painel oferece uma visão abrangente sobre os dados de <strong>manutenção da frota</strong>, permitindo análises detalhadas e acompanhamento eficiente. Explore <strong>gráficos interativos, KPIs essenciais e tabelas dinâmicas</strong> para tomar decisões informadas e otimizar a gestão da manutenção veicular.
  </>
);

const panelActionLinks: ActionLink[] = [
  {
    text: 'Acessar Painel',
    path: '/painel/diarias/dashboard', // Caminho correto para o dashboard
    variant: 'primary',
    icon: <LayoutDashboard size={18} />,
  },
];

const HomeDiarias = () => {
  return (
    <HomePanelTemplate
      icon={<Wrench size={48} />}
      title={panelTitle}
      subtitle={panelSubtitle}
      description={panelDescription}
      actionLinks={panelActionLinks}
    />
  );
};

export default HomeDiarias;