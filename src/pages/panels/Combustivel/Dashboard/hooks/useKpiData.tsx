// src/pages/DashboardCombustivel/hooks/useKpiData.ts

import { useQuery } from 'urql';
import { useMemo } from 'react';
import { FuelIcon, CalendarIcon, BeakerIcon } from 'lucide-react';

// 1. Defina a query
const GET_ABASTECIMENTO_KPIS_QUERY = `
  query GetAbastecimentoKpis {
    abastecimentoKpis {
      totalCost
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

export const useKpiData = () => {
  // 2. Busque os dados da API
  const [ result ] = useQuery({ query: GET_ABASTECIMENTO_KPIS_QUERY });
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
      { title: 'Gastos Totais', value: formatCurrency(kpis.totalCost), icon: <FuelIcon /> },
      { title: 'Média Diária', value: formatCurrency(kpis.dailyAverageCost), icon: <CalendarIcon /> },
      { title: 'Abastecimentos', value: String(kpis.suppliesCount), icon: <BeakerIcon /> },
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