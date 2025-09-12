import { BeakerIcon, CalendarIcon, CarIcon, DollarSign, FuelIcon } from 'lucide-react';
import { useMemo } from 'react';
import { useQuery } from 'urql';
import type { ChartConfig } from '../../../../../types/charts';
import { GET_COMBUSTIVEL_DASHBOARD_DATA_QUERY } from '../../queries/CombustivelQueries';

/**
 * @description Hook centralizado para buscar e processar todos os dados do dashboard de Manutenção.
 * Executa uma única query para obter KPIs, dados de gráficos, opções de filtros e dados da tabela.
 *
 * @param filters - O estado atual dos filtros aplicados no dashboard.
 * @returns Um objeto contendo todos os dados prontos para serem consumidos pelos componentes.
 */

// Helpers
const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);

const sortKeyMapping: { [key: string]: string } = {};


export const useAbastecimentoDashboardData = ({ filters, tableFilters, pagination, sort }: any) => {

  const queryVariables = useMemo(() => {
    // Traduz a chave de ordenação, se necessário. Caso contrário, usa a chave original.
    const sortByBackend = sortKeyMapping[sort.key] || sort.key;
    const cleanedFilters = {
      dateRange: {
        from: filters.from ?? "",
        to: filters.to ?? "",
      },
      fuelType: filters.fuelType ?? "",
      vehiclePlate: filters.vehiclePlate ?? "",
      vehicleBrand: filters.vehicleBrand ?? "",
      vehicleModel: filters.vehicleModel ?? "",
      driverName: filters.driverName ?? "",
      department: filters.department ?? "",
      gasStationCity: filters.gasStationCity ?? "",
      gasStationName: filters.gasStationName ?? "",
      excludePostoInterno: Boolean(filters.excludePostoInterno),
    }
    const tableFilterKeyMap: Record<string, string> = {
      'vehicle.plate': 'vehiclePlate',
      'vehicle.brand': 'vehicleBrand',
      'vehicle.model': 'vehicleModel',
      'gasStation.name': 'gasStationName',
      'gasStation.city': 'gasStationCity',
    };

    function mapTableFiltersForGraphQL(filters: Record<string, string>) {
      const mapped: Record<string, string> = {};
      Object.entries(filters).forEach(([key, value]) => {
        const mappedKey = tableFilterKeyMap[key] || key;
        mapped[mappedKey] = value ?? '';
      });
      return mapped;
    }

    const cleanedTableFilters = mapTableFiltersForGraphQL(tableFilters);

    return {
      filters: cleanedFilters,
      tableFilters: cleanedTableFilters,
      limit: pagination.itemsPerPage,
      offset: (pagination.currentPage - 1) * pagination.itemsPerPage,
      sortBy: sortByBackend,
      sortDirection: sort.direction,
    };
  }, [filters, tableFilters, pagination, sort]);

  const [result] = useQuery({ 
    query: GET_COMBUSTIVEL_DASHBOARD_DATA_QUERY, 
    variables: queryVariables 
  });
  
  const { data, fetching: isLoading, error } = result;

  const kpiData = useMemo(() => {
    const kpis = data?.kpis;
    if (!kpis) return [
        { title: 'Gastos Totais', value: '...', icon: <FuelIcon /> },
        { title: 'Média Diária', value: '...', icon: <CalendarIcon /> },
        { title: 'Abastecimentos', value: '...', icon: <BeakerIcon /> },
      ];
    return [
      { 
        title: 'Gastos Totais',
        value: formatCurrency(kpis.totalCost),
        icon: <DollarSign color='#4CAF50' />
      },
      { title: 'Combustível Consumido  (litros)', 
        value: `${kpis.fuelConsumed.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} L`,
        icon: <FuelIcon color='#FF9800' /> },
      { title: 'Numero de Veículos', 
        value: `${kpis.vehiclesCount.toLocaleString('pt-BR')}`,
        icon: <CarIcon color='#9C27B0' /> },
    ];
  }, [data?.kpis]);

  // Memoiza a configuração dos gráficos
  const chartConfig = useMemo((): ChartConfig[] => {
  return [
    {
      id: 'custo-por-tempo',
      title: 'Gasto ao longo do tempo',
      type: 'line',
      data: data?.costOverTime || [],
      config: { dataKey: 'total', categoryKey: 'date' },
    },
    {
      id: 'custo-por-secretaria',
      title: 'Gasto por Secretaria',
      type: 'pie',
      data: data?.costByDepartment || [],
      config: { dataKey: 'total', nameKey: 'department' },
    },
    {
      id: 'custo-por-veiculo',
      title: 'Gasto por Veículo',
      type: 'bar-vertical',
      data: data?.costByVehicle || [],
      config: { dataKey: 'total', categoryKey: 'vehicle', color: '#82ca9d' },
    },
  ];
}, [data?.costOverTime, data?.costByDepartment, data?.costByVehicle]);


    // Extrai os dados da tabela e a contagem total
  const tableData = useMemo(() => ({
      rows: data?.tableData || [],
      totalCount: data?.totalCount || 0,
  }), [data?.tableData, data?.totalCount]);

  return {
    kpiData,
    chartConfig,
    filterOptions: [
      data?.departmentOptions, 
      data?.vehiclePlateOptions, 
      data?.vehicleModelOptions,
      data?.gasStationCityOptions,
      data?.gasStationNameOptions
    ],
    tableData,
    columns: data?.columns,
    lastUpdate: data?.kpis?.lastUpdate,
    isLoading,
    error,
  };
}