import { Database, FileCheck2, LayoutDashboard } from 'lucide-react';
import { HomePanelTemplate } from '../../../../templates/HomePanelTemplate';
import type { ActionLink } from '../../../../types/home';

const panelTitle = "Painel de Contratos de Repasses e Convênios";
const panelSubtitle = "Repasses e convênios firmados pela Prefeitura de Porto Velho";
const panelDescription = (
  <>
    Este painel acompanha os <strong>contratos de repasses e convênios</strong> do município, detalhando o <strong>valor repassado, a contrapartida municipal e o valor global</strong> de cada instrumento. Explore a distribuição por <strong>secretaria, origem do repasse, fonte do recurso, área de aplicação e bairro</strong>, além da situação de cada contrato, para apoiar a transparência e o acompanhamento dos investimentos.
  </>
);

const panelActionLinks: ActionLink[] = [
  {
    text: 'Acessar Painel',
    path: '/painel/contratos/dashboard',
    variant: 'primary',
    icon: <LayoutDashboard size={18} />,
  },
  {
    text: 'Fonte de Dados',
    path: '/painel/contratos/datasource',
    variant: 'secondary',
    icon: <Database size={18} />,
  },
];

const HomeContratos = () => {
  return (
    <HomePanelTemplate
      icon={<FileCheck2 size={48} />}
      title={panelTitle}
      subtitle={panelSubtitle}
      description={panelDescription}
      actionLinks={panelActionLinks}
    />
  );
};

export default HomeContratos;
