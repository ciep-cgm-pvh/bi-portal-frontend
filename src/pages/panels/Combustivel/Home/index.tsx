import { Database, Fuel, LayoutDashboard } from 'lucide-react';
import { HomePanelTemplate } from '../../../../templates/HomePanelTemplate';
import type { ActionLink } from '../../../../types/home';


// Configuração específica para a Home do painel de Combustível
const panelTitle = "Painel de Abastecimento";
const panelSubtitle = "Análise e Acompanhamento de Gastos com Combustível";
const panelDescription = (
  <>
    Esta seção oferece uma visão completa sobre os dados de abastecimento da frota. 
    Utilize o <strong>Dashboard</strong> para visualizações interativas e a <strong>Fonte de Dados</strong> para downloads de relatórios completos.
  </>
);

const panelActionLinks: ActionLink[] = [
  {
    text: 'Acessar Dashboard',
    path: '/painel/abastecimento/dashboard', // Caminho correto para o dashboard
    variant: 'primary',
    icon: <LayoutDashboard size={18} />,
  },
  {
    text: 'Ver Fontes de Dados',
    path: '/painel/abastecimento/datasource', // Caminho correto para a fonte de dados
    variant: 'secondary',
    icon: <Database size={18} />,
  }
];

const HomeAbastecimento = () => {
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

export default HomeAbastecimento;