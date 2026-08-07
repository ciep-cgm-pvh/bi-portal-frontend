import { Building2 } from 'lucide-react';
import { DataSourcePanelTemplate, type DataSourceConfig } from '../../../../templates/DataSourcePanelTemplate';
import { DOWNLOAD_ALL_OBRAS_QUERY, DOWNLOAD_OBRAS_SUMMARY_QUERY } from '../Queries/ObrasQueries';

const obrasDataSources: DataSourceConfig[] = [
  {
    id: 'all-obras-detailed',
    title: 'Relatório Completo de Obras',
    description: 'Baixe o relatório detalhado com todos os registros de obras públicas municipais.',
    filename: 'relatorio_obras_completo',
    query: DOWNLOAD_ALL_OBRAS_QUERY,
  },
  {
    id: 'obras-department-summary',
    title: 'Resumo por Secretaria',
    description: 'Dados agregados de valor contratado, valor pago e quantidade de obras por secretaria.',
    filename: 'resumo_obras_por_secretaria',
    icon: <Building2 className="h-6 w-6 mb-2" color="purple" />,
    query: DOWNLOAD_OBRAS_SUMMARY_QUERY,
  },
];

const DataSourceObras = () => {
  return (
    <DataSourcePanelTemplate
      pageTitle="Fontes de Dados - Obras"
      overviewText={<p>Acesse os dados brutos ou consolidados referentes às obras públicas municipais.</p>}
      dataSources={obrasDataSources}
    />
  );
};

export default DataSourceObras;
