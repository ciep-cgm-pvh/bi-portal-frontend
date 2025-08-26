import { DataSourcePanelTemplate, type DataSourceConfig } from '../../../../templates/DataSourcePanelTemplate';

const GET_ALL_ABASTECIMENTOS_DETALHADO_QUERY = `
  query DownloadAbastecimentos {
    getAbastecimentosTable {
      id
      datetime
      cost
      fuelVolume
      fuelType
      driverName
      department
      vehicle {
        plate
        model
        brand
      }
      gasStation {
        name
        city
      }
    }
  }
`;

const GET_VEHICLE_SUMMARY_QUERY = `
  query GetVehicleSummary {
    vehicleSummary {
      department
      totalCost
      supplyCount
      vehicle {
        plate
        model
        brand
      }
    }
  }
`;

const abastecimentoDataSources: DataSourceConfig[] = [
  {
    id: 'all-supplies-detailed',
    title: 'Relatório Completo de Abastecimentos',
    description: 'Baixe o relatório detalhado com todos os registros de abastecimento, incluindo informações do veículo, motorista e posto.',
    filename: 'relatorio_abastecimentos_completo',
    query: GET_ALL_ABASTECIMENTOS_DETALHADO_QUERY,
  },
  {
    id: 'vehicle-summary',
    title: 'Resumo por Veículo',
    description: 'Dados agregados de custo total e contagem de abastecimentos por veículo.',
    filename: 'resumo_por_veiculo',
    query: GET_VEHICLE_SUMMARY_QUERY,
  },
];

const DataSourceAbastecimento = () => {
  return (
    <DataSourcePanelTemplate
      pageTitle="Fontes de Dados - Abastecimento"
      overviewText={<p>Acesse os dados brutos ou consolidados referentes aos abastecimentos. Use os botões abaixo para baixar o conjunto de dados completo no formato desejado.</p>}
      dataSources={abastecimentoDataSources}
    />
  );
};

export default DataSourceAbastecimento;