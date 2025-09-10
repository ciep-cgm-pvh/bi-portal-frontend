import { Car } from 'lucide-react';
import { DataSourcePanelTemplate, type DataSourceConfig } from '../../../../templates/DataSourcePanelTemplate';

const GET_ALL_ABASTECIMENTOS_DETALHADO_QUERY = `
  query DownloadAbastecimentos {
    getAbastecimentosTable {
      id
      data: datetime
      custo: cost
      quantidadeAbastecida: fuelVolume
      tipoCombustivel: fuelType
      motorista: driverName
      departamento: department
      veiculo: vehicle {
        placa: plate
        modelo: model
        marca: brand
      }
      posto:gasStation {
        nome: name
        cidade: city
      }
    }
  }
`;

const GET_VEHICLE_SUMMARY_QUERY = `
  query GetVehicleSummary {
    vehicleSummary { 
      departamento: department
      custoTotal: totalCost
      quantidadeAbastecimento: supplyCount
      veiculo: vehicle {
        placa: plate
        modelo: model
        marca: brand
      }
    }
  }
`;

const abastecimentoDataSources: DataSourceConfig[] = [
  {
    id: 'all-supplies-detailed',
    title: 'Relatório Completo de Abastecimentos',
    description: 'Baixe o relatório detalhado com todos os registros de abastecimento.',
    filename: 'relatorio_abastecimentos_completo',
    query: GET_ALL_ABASTECIMENTOS_DETALHADO_QUERY,
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

const DataSourceAbastecimento = () => {
  return (
    <DataSourcePanelTemplate
      pageTitle="Fontes de Dados - Abastecimento"
      overviewText={<p>Acesse os dados brutos ou consolidados referentes aos abastecimentos.</p>}
      dataSources={abastecimentoDataSources}
    />
  );
};

export default DataSourceAbastecimento;