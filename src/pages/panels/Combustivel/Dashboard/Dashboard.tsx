import { FuelIcon } from 'lucide-react';
import { useMemo, useState, type JSX, type Key } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChartsSection } from '../../../../components/ChartSection/ChartSection';
import FiltersSection from '../../../../components/FiltersSection/FiltersSection';
import Header from '../../../../components/HeaderSection/Header';
import { KPICard, KPISection } from '../../../../components/KPISection/KPISection';
import { PaginationControls } from '../../../../components/PaginationControls/PaginationControls';
import { TableSection } from '../../../../components/TableSection/TableSection';
import type { ChartConfig } from '../../../../types/charts';
import type { FilterConfig, FilterValues } from '../../../../types/filters';
import type { SortConfig, TableColumn, TableDataItem } from '../../../../types/tables';


const buttonFunction = () => {
  const navigate = useNavigate();
  navigate('/hub');
};
const lastUpdate = 'dd/mm/yyyy';
const KPIData = [
  {
    title: 'Gastos Totais',
    value: 'R$ 10.000,00',
    icon: <FuelIcon />,
  },
  {
    title: 'Média Diária',
    value: 'R$ 500,00',
    icon: <FuelIcon />,
  },
  {
    title: 'Abastecimentos',
    value: '20',
    icon: <FuelIcon />,
  },
];

const AbastecimentoConfig = {
  title: 'Abastecimento',
  description: 'Visualize e filtre os dados de gastos com combustível.',
  buttonFunction: buttonFunction,
  lastUpdate: lastUpdate,
  icon: <FuelIcon />,
  kpiData: KPIData,
};

// Mock de dados para os gráficos
const gastoPorVeiculoData = [
  { vehicle: 'Fiat Strada', total: 4500.50 },
  { vehicle: 'VW Gol', total: 3200.00 },
  { vehicle: 'Honda Civic', total: 5100.75 },
  { vehicle: 'Toyota Corolla', total: 4800.00 },
];

const gastoPorStatusData = [
  { name: 'Aprovado', value: 15000 },
  { name: 'Pendente', value: 2100 },
  { name: 'Rejeitado', value: 500 },
];

// Dados mockados para a tabela
const supplyData = [
  { id: 1, date: '2025-08-01', vehicle: 'Fiat Strada', driver: 'João Silva', cost: 250.75, status: 'Aprovado' },
  { id: 2, date: '2025-08-01', vehicle: 'VW Gol', driver: 'Maria Santos', cost: 180.50, status: 'Aprovado' },
  { id: 3, date: '2025-08-02', vehicle: 'Honda Civic', driver: 'Pedro Almeida', cost: 320.00, status: 'Pendente' },
  { id: 4, date: '2025-08-03', vehicle: 'Fiat Strada', driver: 'João Silva', cost: 260.10, status: 'Rejeitado' },
  // ... adicione mais 10 a 15 linhas para testar a paginação
];

// Componente que renderiza a tabela e seus controles
const SupplyTable = () => {
  // 1. ESTADO: Dados, Paginação e Ordenação
  const [data, setData] = useState(supplyData);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig<TableDataItem> | null>(null);
  const ITEMS_PER_PAGE = 5;

  // 2. LÓGICA: Ordenação e Paginação dos dados
  const processedData = useMemo(() => {
    let sortableItems = [...data];
    // Lógica de Ordenação
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    // Lógica de Paginação (aplica depois de ordenar)
    const firstPageIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const lastPageIndex = firstPageIndex + ITEMS_PER_PAGE;
    return sortableItems.slice(firstPageIndex, lastPageIndex);
  }, [data, currentPage, sortConfig]);

  // 3. HANDLERS: Funções que alteram o estado
  const handleSort = (key: keyof TableDataItem) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // 4. CONFIGURAÇÃO: Definição das colunas
  const columns: TableColumn<TableDataItem>[] = [
    { header: 'Data', accessor: 'date', sortable: true },
    { header: 'Veículo', accessor: 'vehicle', sortable: true },
    { header: 'Motorista', accessor: 'driver', sortable: false },
    { header: 'Custo', accessor: 'cost', sortable: true, render: (item) => `R$ ${item.cost.toFixed(2)}` },
    { header: 'Status', accessor: 'status', sortable: true },
  ];
  
  return (
    <>
      <TableSection
        title="Últimos Abastecimentos"
        columns={columns}
        data={processedData}
        sortConfig={sortConfig}
        onSort={handleSort}
      />
      <PaginationControls
        currentPage={currentPage}
        totalPages={Math.ceil(data.length / ITEMS_PER_PAGE)}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

// O componente que consome a seção de gráficos
const ChartsAbastecimento = () => {
  // 1. DEFINIR A ESTRUTURA DOS GRÁFICOS
  // Em um caso real, esses dados viriam da sua API GraphQL
  const chartConfiguration: ChartConfig[] = [
    {
      id: 'gasto-por-veiculo',
      title: 'Gasto Total por Veículo',
      type: 'bar-horizontal',
      data: gastoPorVeiculoData,
      config: {
        dataKey: 'total',
        categoryKey: 'vehicle',
        color: '#8884d8',
      },
    },
    {
      id: 'gasto-por-status',
      title: 'Distribuição de Gasto por Status',
      type: 'pie',
      data: gastoPorStatusData,
      config: {
        dataKey: 'value',
        nameKey: 'name',
      },
    },
  ];
  
  // Opcional: estado de loading
  const [isLoading, setIsLoading] = useState(false);
  
  return <ChartsSection charts={chartConfiguration} isLoading={isLoading} />;
};

const KPIAbastecimento = ({ kpiDataList }: { kpiDataList: { icon: JSX.Element; title: string; value: string; }[] }) => {
  return (
    <KPISection>
      {kpiDataList.map((kpi: { icon: JSX.Element; title: string; value: string; }, index: Key | null | undefined) => (
        <KPICard
          key={index}
          icon={kpi.icon}
          title={kpi.title}
          value={kpi.value}
        />
      ))}
    </KPISection>
  );
}

const FiltersAbastecimento = () => {
  // 1. DEFINIR A ESTRUTURA DOS FILTROS
  const filterConfiguration: FilterConfig[] = [
    {
      id: 'vehicle',
      label: 'Veículo',
      type: 'select',
      placeholder: 'Todos os veículos',
      options: [
        { value: 'fiat-strada', label: 'Fiat Strada (ABC-1234)' },
        { value: 'vw-gol', label: 'VW Gol (DEF-5678)' },
      ],
    },
    {
      id: 'status',
      label: 'Status',
      type: 'select',
      placeholder: 'Todos os status',
      options: [
        { value: 'approved', label: 'Aprovado' },
        { value: 'pending', label: 'Pendente' },
        { value: 'rejected', label: 'Rejeitado' },
      ],
    },
    {
      id: 'startDate',
      label: 'Data Inicial',
      type: 'date',
    },
    {
      id: 'endDate',
      label: 'Data Final',
      type: 'date',
    },
  ];

  // VALORES INICIAIS DOS FILTROS (VAZIOS)
  const initialFilterValues: FilterValues = {
    vehicle: '',
    status: '',
    startDate: '',
    endDate: '',
  };

  // 2. CRIAR O ESTADO PARA GUARDAR OS VALORES
  const [filterValues, setFilterValues] = useState<FilterValues>(initialFilterValues);

  // 3. DEFINIR AS FUNÇÕES DE MANIPULAÇÃO
  const handleFilterChange = (id: string, value: string | number) => {
    console.log(`Filtro '${id}' alterado para:`, value);
    setFilterValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleApplyFilters = () => {
    // Aqui você pegaria os `filterValues` e faria a chamada para a API GraphQL
    console.log('Aplicando filtros:', filterValues);
    alert('Filtros aplicados! Veja o console.');
  };

  const handleClearFilters = () => {
    console.log('Limpando filtros');
    setFilterValues(initialFilterValues);
    // Opcional: pode também chamar onApply() para buscar os dados sem filtros
  };

  return (
    <FiltersSection
      config={filterConfiguration}
      values={filterValues}
      onChange={handleFilterChange}
      onApply={handleApplyFilters}
      onClear={handleClearFilters}
    />
  );
};

const DashboardAbastecimento = () => {

  return (
    <div className="my-4">
      <Header title={AbastecimentoConfig.title} description={AbastecimentoConfig.description} onBackToHub={AbastecimentoConfig.buttonFunction} lastUpdate={AbastecimentoConfig.lastUpdate}/>
      <KPIAbastecimento kpiDataList={AbastecimentoConfig.kpiData} />
      <FiltersAbastecimento/>
      <ChartsAbastecimento />
      <SupplyTable />
    </div>

  );
}

export default DashboardAbastecimento;