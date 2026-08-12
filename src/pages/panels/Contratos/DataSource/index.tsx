import { Building2 } from 'lucide-react';
import { DataSourcePanelTemplate, type DataSourceConfig } from '../../../../templates/DataSourcePanelTemplate';
import { DOWNLOAD_ALL_CONTRATOS_QUERY, DOWNLOAD_CONTRATOS_SUMMARY_QUERY } from '../Queries/ContratosQueries';

const contratosDataSources: DataSourceConfig[] = [
  {
    id: 'all-contratos-detailed',
    title: 'Relatório Completo de Contratos',
    description: 'Baixe o relatório detalhado com todos os contratos de repasses e convênios.',
    filename: 'relatorio_contratos_completo',
    query: DOWNLOAD_ALL_CONTRATOS_QUERY,
  },
  {
    id: 'contratos-secretaria-summary',
    title: 'Resumo por Secretaria',
    description: 'Repasse, contrapartida e valor global consolidados por secretaria.',
    filename: 'resumo_contratos_por_secretaria',
    icon: <Building2 className="h-6 w-6 mb-2" color="purple" />,
    query: DOWNLOAD_CONTRATOS_SUMMARY_QUERY,
  },
];

const DataSourceContratos = () => {
  return (
    <DataSourcePanelTemplate
      pageTitle="Fontes de Dados - Contratos e Convênios"
      overviewText={<p>Acesse os dados brutos ou consolidados dos contratos de repasses e convênios.</p>}
      dataSources={contratosDataSources}
    />
  );
};

export default DataSourceContratos;
