import { BeakerIcon, CalendarIcon, CarIcon, DollarSign, FuelIcon } from 'lucide-react';
import { useMemo } from 'react';
import { useQuery } from 'urql';
import type { ChartConfig } from '../../../../../types/charts';
import { formatCurrency } from '../../../../../utils/helpers';
import {
  GET_COMBUSTIVEL_CHARTS_DATA_QUERY,
  GET_COMBUSTIVEL_KPI_DATA_QUERY,
  GET_COMBUSTIVEL_TABLE_DATA_QUERY
} from '../../queries/CombustivelQueries';

function formatDatePtBR(date: string) {
  // espera yyyy-mm-dd
  const [ yyyy, mm, dd ] = date.split('-');
  return `${dd}/${mm}/${yyyy}`;
}

function groupByMonth(data: { date: string; total: number }[]) {
  const map = new Map<string, number>();

  data.forEach(item => {
    // date: yyyy-mm-dd
    const [ yyyy, mm ] = item.date.split('-');
    const key = `${yyyy}-${mm}`; // chave técnica

    map.set(key, (map.get(key) || 0) + (item.total || 0));
  });

  return Array.from(map.entries())
    .sort((a, b) => a[ 0 ].localeCompare(b[ 0 ]))
    .map(([ key, total ]) => {
      const [ yyyy, mm ] = key.split('-');
      return {
        date: `${mm}/${yyyy}`, // saída pt-BR
        total
      };
    });
}

export const useAbastecimentoDashboardData = ({ filters, tableFilters, pagination, sort }: any) => {

  const cleanedFilters = useMemo(() => ({
    dateRange: { from: filters.from, to: filters.to },
    vehiclePlate: filters.vehiclePlate,
    vehicleModel: filters.vehicleModel,
    department: filters.department,
    gasStationCity: filters.gasStationCity,
    gasStationName: filters.gasStationName,
    excludePostoInterno: filters.excludePostoInterno,
  }), [ filters ]);

  const cleanedTableFilters = useMemo(() => {
    const map: Record<string, string> = {
      'vehicle.plate': 'vehiclePlate',
      'vehicle.brand': 'vehicleBrand',
      'vehicle.model': 'vehicleModel',
      'gasStation.name': 'gasStationName',
      'gasStation.city': 'gasStationCity',
    };
    return Object.entries(tableFilters).reduce<Record<string, string>>((acc, [ key, value ]) => {
      acc[ map[ key ] || key ] = (value as string) ?? '';
      return acc;
    }, {} as Record<string, string>);
  }, [ tableFilters ]);

  // -------- KPIs
  const [ kpiResult ] = useQuery({
    query: GET_COMBUSTIVEL_KPI_DATA_QUERY,
    variables: { filters: cleanedFilters },
    requestPolicy: 'cache-and-network'
  });
  const { data: kpiDataRaw, fetching: loadingKpi } = kpiResult;

  const kpiData = useMemo(() => {
    const kpis = kpiDataRaw?.kpis;
    console.log('KPI Data Raw:', kpiDataRaw);
    if (!kpis) return [
      { title: 'Gastos Totais', value: '...', icon: <FuelIcon /> },
      { title: 'Média Diária', value: '...', icon: <CalendarIcon /> },
      { title: 'Abastecimentos', value: '...', icon: <BeakerIcon /> },
    ];
    return [
      { title: 'Gastos Totais', value: formatCurrency(kpis.totalCost), icon: <DollarSign color='#4CAF50' /> },
      { title: 'Combustível Consumido (L)', value: `${kpis.fuelConsumed.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} L`, icon: <FuelIcon color='#FF9800' /> },
      { title: 'Número de Veículos', value: `${kpis.vehiclesCount.toLocaleString('pt-BR')}`, icon: <CarIcon color='#9C27B0' /> },
    ];
  }, [ kpiDataRaw ]);

  // ------ Gráficos
  const [ chartsResult ] = useQuery({
    query: GET_COMBUSTIVEL_CHARTS_DATA_QUERY,
    variables: { filters: cleanedFilters, vehicleLimit: 10 },
    requestPolicy: 'cache-and-network'
  });
  const { data: chartsDataRaw, fetching: loadingCharts } = chartsResult;

  const chartConfig = useMemo((): ChartConfig[] => {
    const charts = chartsDataRaw?.getAbastecimentoCharts;
    if (!charts) return [];
    return [
      {
        id: 'custo-por-tempo',
        title: 'Gasto ao longo do tempo',
        type: 'line',
        data: groupByMonth(charts.costOverTime || []),
        config: { dataKey: 'total', categoryKey: 'date' }
      },
      {
        id: 'custo-por-secretaria',
        title: 'Gasto por Secretaria',
        type: 'pie',
        data: charts.costByDepartment || [],
        config: { dataKey: 'total', nameKey: 'department' }
      },
      {
        id: 'custo-por-veiculo',
        title: 'Gasto por Veículo',
        type: 'bar-vertical',
        data: charts.costByPlate || [],
        config: { dataKey: 'total', categoryKey: 'plate', color: '#82ca9d' }
      },
      {
        id: 'ranking-por-date',
        title: 'Ranking por Data',
        type: 'ranking-table',
        data: charts.rankingByDate || [],
        config: {
          columns: [
            {
              header: 'Data',
              accessor: 'date',
              className: 'text-left', 
              render: (value: string) => formatDatePtBR(value)
            }, 
            {
              header: 'Total Gasto', 
              accessor: 'total',
              className: 'text-right', 
              render: formatCurrency
            } 
          ]
        }
      },
      {
        id: 'ranking-por-department',
        title: 'Ranking por Secretaria',
        type: 'ranking-table',
        data: charts.rankingByDepartment || [],
        config: {
          columns: [
            {
              header: 'Secretaria',
              accessor: 'department',
              className: 'text-left'
            },
            {
              header: 'Total Gasto',
              accessor: 'total',
              className: 'text-right',
              render: formatCurrency
            }
          ]
        }
      },
      {
        id: 'ranking-por-veiculo', title: 'Ranking por Veículo', type: 'ranking-table', data: charts.rankingByPlate || [], config: { columns: [ { header: 'Placa', accessor: 'plate', className: 'text-left' }, { header: 'Qtde.', accessor: 'quantity', className: 'text-center' }, { header: 'Total Gasto', accessor: 'total', className: 'text-right', render: formatCurrency } ] }
      },
    ];
  }, [ chartsDataRaw ]);

  // ----- Tabela
  const [ tableResult ] = useQuery({
    query: GET_COMBUSTIVEL_TABLE_DATA_QUERY,
    variables: {
      filters: cleanedFilters,
      tableFilters: cleanedTableFilters,
      limit: pagination.itemsPerPage,
      offset: (pagination.currentPage - 1) * pagination.itemsPerPage,
      sortBy: sort.key,
      sortDirection: sort.direction
    },
    requestPolicy: 'network-only'
  });
  const { data: tableDataRaw, fetching: loadingTable } = tableResult;


  const tableData = useMemo(() => ({
    rows: tableDataRaw?.tableData || [],
    totalCount: tableDataRaw?.totalCount || 0,
  }), [ tableDataRaw ]);

  const columns = tableDataRaw?.columns;

  return {
    kpiData,
    chartConfig,
    tableData,
    columns,
    lastUpdate: kpiDataRaw?.kpis?.lastUpdate,
    isLoading: { loadingKpi, loadingCharts, loadingTable },
    error: kpiResult.error || chartsResult.error || tableResult.error,
  };
};