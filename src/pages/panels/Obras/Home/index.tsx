import { Database, LayoutDashboard, TrafficCone } from 'lucide-react';
import { HomePanelTemplate } from '../../../../templates/HomePanelTemplate';
import type { ActionLink } from '../../../../types/home';

const panelTitle = "Painel de Obras";
const panelSubtitle = "Execução orçamentária de obras e serviços de engenharia";
const panelDescription = (
  <>
    Este painel apresenta a <strong>execução orçamentária das obras e serviços de engenharia</strong> do município, acompanhando os valores <strong>empenhado, liquidado e pago</strong> por secretaria, programa, atividade/projeto e credor. Os dados têm origem nos empenhos dos elementos de despesa <em>4490.51 — Obras e Instalações</em>, <em>3390.39-16</em> e <em>3390.39-21</em>. Cada processo pode reunir mais de um empenho.
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
