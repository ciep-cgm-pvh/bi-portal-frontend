import { Car } from 'lucide-react';
import { DataSourcePanelTemplate, type DataSourceConfig } from '../../../../templates/DataSourcePanelTemplate';
import { DOWNLOAD_ALL_COMBUSTIVEL_QUERY, DOWNLOAD_VEHICLE_SUMMARY_QUERY } from '../queries/CombustivelQueries';

const abastecimentoDataSources: DataSourceConfig[] = [
  {
    id: 'all-supplies-detailed',
    title: 'Relatório Completo de Abastecimentos',
    description: 'Baixe o relatório detalhado com todos os registros de abastecimento.',
    filename: 'relatorio_abastecimentos_completo',
    query: DOWNLOAD_ALL_COMBUSTIVEL_QUERY,
  },
  {
    id: 'vehicle-summary',
    title: 'Resumo por Veículo',
    description: 'Dados agregados de custo total e contagem de abastecimentos por veículo.',
    filename: 'resumo_por_veiculo',
    icon: <Car className="h-6 w-6 mb-2" color='purple'/>,
    query: DOWNLOAD_VEHICLE_SUMMARY_QUERY,
  },
];

const DataSourceAbastecimento = () => {
  return (
    <DataSourcePanelTemplate
      pageTitle="Fontes de Dados - Abastecimento"
      overviewText={"Acesse os dados brutos ou consolidados referentes aos abastecimentos."}
      dataSources={abastecimentoDataSources}
    />
  );
};

export default DataSourceAbastecimento;