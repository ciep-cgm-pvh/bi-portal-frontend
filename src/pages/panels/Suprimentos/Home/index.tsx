import { LayoutDashboard, Wrench } from 'lucide-react';
import { HomePanelTemplate } from '../../../../templates/HomePanelTemplate';
import type { ActionLink } from '../../../../types/home';


// Configuração específica para a Home do painel de Combustível
const panelTitle = "Painel de Suprimento de Fundos";
const panelSubtitle = "Análise e acompanhamento dos dados de suprimento de fundos";
const panelDescription = (
  <>
    Este painel oferece uma visão consolidada <strong>sobre os dados de suprimento de fundos</strong>, possibilitando acompanhar valores aprovados, concedidos e cancelados. Explore <strong>gráficos interativos, KPIs financeiros e tabelas dinâmicas</strong> para apoiar a transparência, o controle e a tomada de decisão na gestão de recursos públicos.
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