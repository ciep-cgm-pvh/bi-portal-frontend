import { Fuel, LayoutDashboard } from 'lucide-react';
import { HomePanelTemplate } from '../../../../templates/HomePanelTemplate';
import type { ActionLink } from '../../../../types/home';


// Configuração específica para a Home do painel de Combustível
const panelTitle = "Painel de Manutencao";
const panelSubtitle = "Análise e Acompanhamento de Gastos com Combustível";
const panelDescription = (
  <>
    Esta seção oferece uma visão completa sobre os dados de abastecimento da frota. 
    Utilize o <strong>Painel</strong> para visualizações interativas, a aba de <strong>Fonte de Dados</strong> para downloads dos dados utilizados completos está em fase de construção
  </>
);

const panelActionLinks: ActionLink[] = [
  {
    text: 'Acessar Painel',
    path: '/painel/abastecimento/dashboard', // Caminho correto para o dashboard
    variant: 'primary',
    icon: <LayoutDashboard size={18} />,
  },
];

const HomeManutencao = () => {
  return (
    <HomePanelTemplate
      icon={<Fuel size={48} />}
      title={panelTitle}
      subtitle={panelSubtitle}
      description={panelDescription}
      actionLinks={panelActionLinks}
    />
  );
};

export default HomeManutencao;