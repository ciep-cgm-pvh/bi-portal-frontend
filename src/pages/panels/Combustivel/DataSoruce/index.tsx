import { DataSourcePanelTemplate, type DataSourceConfig } from '../../../../templates/DataSourcePanelTemplate';

// Defina as queries GraphQL para cada fonte de dados
const GET_ALL_SUPPLIES_QUERY = `
  query GetAllSupplies {
    supplies { id date vehicle driver cost status }
  }
`;

const GET_VEHICLE_SUMMARY_QUERY = `
  query GetVehicleSummary {
    vehicleSummary { vehicle totalCost supplyCount }
  }
`;

// Crie a configuração para os cards desta página
const abastecimentoDataSources: DataSourceConfig[] = [
  {
    id: 'all-supplies',
    title: 'Todos os Abastecimentos',
    description: 'Relatório detalhado com todos os registros de abastecimento.',
    filename: 'relatorio_abastecimentos_completo',
    query: GET_ALL_SUPPLIES_QUERY,
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