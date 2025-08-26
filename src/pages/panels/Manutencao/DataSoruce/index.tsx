import { Car } from 'lucide-react';
import { DataSourcePanelTemplate, type DataSourceConfig } from '../../../../templates/DataSourcePanelTemplate';

const GET_ALL_MANUTENCOES_DETALHADO_QUERY = `
  query DownloadManutencaos {
    getManutencaosTable {
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
    title: 'Relatório Completo de Manutencaos',
    description: 'Baixe o relatório detalhado com todos os registros de abastecimento.',
    filename: 'relatorio_abastecimentos_completo',
    query: GET_ALL_MANUTENCOES_DETALHADO_QUERY,
  },
  {
    id: 'vehicle-summary',
    title: 'Resumo por Veículo',
    description: 'Dados agregados de custo total e contagem de abastecimentos por veículo.',
    filename: 'resumo_por_veiculo',
    icon: <Car className="h-6 w-6 mb-2" color='purple'/>,
    query: GET_VEHICLE_SUMMARY_QUERY,
  },
];

const DataSourceManutencao = () => {
  return (
    <DataSourcePanelTemplate
      pageTitle="Fontes de Dados - Manutencao"
      overviewText={<p>Acesse os dados brutos ou consolidados referentes aos abastecimentos.</p>}
      dataSources={abastecimentoDataSources}
    />
  );
};

export default DataSourceManutencao;