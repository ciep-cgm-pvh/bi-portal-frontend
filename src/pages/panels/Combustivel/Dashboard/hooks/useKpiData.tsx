// src/pages/DashboardCombustivel/hooks/useKpiData.ts

import { BeakerIcon, CalendarIcon, CarIcon, DollarSign, FuelIcon, Gauge } from 'lucide-react';
import { useMemo } from 'react';
import { useQuery } from 'urql';
import { prepareGqlFilters } from '../utils/filter.utils'; // <-- 1. IMPORTE A FUNÇÃO


// 1. Defina a query
const GET_ABASTECIMENTO_KPIS_QUERY = `
  query GetAbastecimentoKpis($filters: AbastecimentoFiltersInput) {
    abastecimentoKpis(filters: $filters) {
      totalCost
      fuelConsumed
      kilometersDriven
      vehiclesCount
      dailyAverageCost
      suppliesCount
      lastUpdate
    }
  }
`;

// Helper para formatar moeda
const formatCurrency = (value: number) => {
  if (typeof value !== 'number') return 'R$ 0,00';
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export const useKpiData = ({ filters }: { filters: any }) => {
  console.log('%c[HOOK-KPI] 3. Hook de KPI recebeu filtros:', 'color: orange; font-weight: bold;', filters);
  // 2. Busque os dados da API
  const [ result ] = useQuery({ 
    query: GET_ABASTECIMENTO_KPIS_QUERY, 
    variables: { filters: prepareGqlFilters(filters) }, 
  });
  const { data, fetching: isLoading, error } = result;

  // 3. Transforme os dados brutos no formato esperado pelo componente
  const kpiData = useMemo(() => {
    const kpis = data?.abastecimentoKpis;

    if (!kpis) {
      // Retorna uma estrutura vazia ou com placeholders enquanto carrega
      return [
        { title: 'Gastos Totais', value: '...', icon: <FuelIcon /> },
        { title: 'Média Diária', value: '...', icon: <CalendarIcon /> },
        { title: 'Abastecimentos', value: '...', icon: <BeakerIcon /> },
      ];
    }

    // Formata os dados recebidos da API
    return [
      { title: 'Gastos Totais', value: formatCurrency(kpis.totalCost), icon: <DollarSign color='#4CAF50' /> },
      { title: 'Combustível Consumido  (litros)', value: formatCurrency(kpis.fuelConsumed), icon: <FuelIcon color='#FF9800' /> },
      { title: 'Kilometros Rodados', value: parseFloat(kpis.kilometersDriven).toFixed(2), icon: <Gauge color='#2196F3' /> },
      { title: 'Numero de Veículos', value: String(kpis.vehiclesCount), icon: <CarIcon color='#9C27B0' /> },
    ];
  }, [ data ]);

  const lastUpdate = data?.abastecimentoKpis?.lastUpdate;

  return {
    kpiData,
    isLoading,
    error,
    lastUpdate,
  };
};