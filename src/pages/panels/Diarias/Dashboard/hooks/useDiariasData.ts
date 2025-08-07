import { useState, useMemo } from 'react';
import type { SortConfig, TableDataItem } from '../../../../../types/tables';

// Mock dos dados brutos
const rawSupplyData: TableDataItem[] = [
  /** id: string | number;
  [ key: string ]: any; */
  // 20 registros --> Nº Processo	Órgão	Data Pagamento	Funcionário	Valor Concedido	Situação
  { id: 1, orgao: 'Órgão 1', processo: '12345', dataPagamento: '2025-01-01', funcionario: 'Funcionário A', valorConcedido: 1000.00, situacao: 'Aprovado' },
  { id: 2, orgao: 'Órgão 2', processo: '12346', dataPagamento: '2025-01-02', funcionario: 'Funcionário B', valorConcedido: 2000.00, situacao: 'Pendente' },
  { id: 3, orgao: 'Órgão 3', processo: '12347', dataPagamento: '2025-01-03', funcionario: 'Funcionário C', valorConcedido: 1500.00, situacao: 'Rejeitado' },
  { id: 4, orgao: 'Órgão 1', processo: '12348', dataPagamento: '2025-01-04', funcionario: 'Funcionário D', valorConcedido: 1200.00, situacao: 'Aprovado' },
  { id: 5, orgao: 'Órgão 2', processo: '12349', dataPagamento: '2025-01-05', funcionario: 'Funcionário E', valorConcedido: 1800.00, situacao: 'Pendente' },
  { id: 6, orgao: 'Órgão 3', processo: '12350', dataPagamento: '2025-01-06', funcionario: 'Funcionário F', valorConcedido: 1600.00, situacao: 'Aprovado' },
  { id: 7, orgao: 'Órgão 1', processo: '12351', dataPagamento: '2025-01-07', funcionario: 'Funcionário G', valorConcedido: 1400.00, situacao: 'Pendente' },
  { id: 8, orgao: 'Órgão 2', processo: '12352', dataPagamento: '2025-01-08', funcionario: 'Funcionário H', valorConcedido: 1300.00, situacao: 'Rejeitado' },
  { id: 9, orgao: 'Órgão 3', processo: '12353', dataPagamento: '2025-01-09', funcionario: 'Funcionário I', valorConcedido: 1200.00, situacao: 'Aprovado' },
  { id: 10, orgao: 'Órgão 1', processo: '12354', dataPagamento: '2025-01-10', funcionario: 'Funcionário J', valorConcedido: 1100.00, situacao: 'Pendente' },
  { id: 11, orgao: 'Órgão 2', processo: '12355', dataPagamento: '2025-01-11', funcionario: 'Funcionário K', valorConcedido: 2000.00, situacao: 'Rejeitado' },
  { id: 12, orgao: 'Órgão 3', processo: '12356', dataPagamento: '2025-01-12', funcionario: 'Funcionário L', valorConcedido: 1500.00, situacao: 'Aprovado' },
  { id: 13, orgao: 'Órgão 1', processo: '12357', dataPagamento: '2025-01-13', funcionario: 'Funcionário M', valorConcedido: 1700.00, situacao: 'Pendente' },
  { id: 14, orgao: 'Órgão 2', processo: '12358', dataPagamento: '2025-01-14', funcionario: 'Funcionário N', valorConcedido: 1900.00, situacao: 'Rejeitado' },
  { id: 15, orgao: 'Órgão 3', processo: '12359', dataPagamento: '2025-01-15', funcionario: 'Funcionário O', valorConcedido: 1600.00, situacao: 'Aprovado' },
  { id: 16, orgao: 'Órgão 1', processo: '12360', dataPagamento: '2025-01-16', funcionario: 'Funcionário P', valorConcedido: 1800.00, situacao: 'Pendente' },
  { id: 17, orgao: 'Órgão 2', processo: '12361', dataPagamento: '2025-01-17', funcionario: 'Funcionário Q', valorConcedido: 2000.00, situacao: 'Rejeitado' },
  { id: 18, orgao: 'Órgão 3', processo: '12362', dataPagamento: '2025-01-18', funcionario: 'Funcionário R', valorConcedido: 1500.00, situacao: 'Aprovado' },
  { id: 19, orgao: 'Órgão 1', processo: '12363', dataPagamento: '2025-01-19', funcionario: 'Funcionário S', valorConcedido: 1700.00, situacao: 'Pendente' },
  { id: 20, orgao: 'Órgão 2', processo: '12364', dataPagamento: '2025-01-20', funcionario: 'Funcionário T', valorConcedido: 1900.00, situacao: 'Rejeitado' },

];
const ITEMS_PER_PAGE = 5;

export const useDiariasData = () => {
  // Em um caso real, `rawSupplyData` viria de um SWR ou React Query
  const [ data, _ ] = useState(rawSupplyData);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ sortConfig, setSortConfig ] = useState<SortConfig<TableDataItem> | null>(null);

  const processedData = useMemo(() => {
    let sortableItems = [ ...data ];
    if (sortConfig) {
      sortableItems.sort((a, b) => {
        if (a[ sortConfig.key ] < b[ sortConfig.key ]) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a[ sortConfig.key ] > b[ sortConfig.key ]) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      });
    }
    const firstPageIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortableItems.slice(firstPageIndex, firstPageIndex + ITEMS_PER_PAGE);
  }, [ data, currentPage, sortConfig ]);

  const handleSort = (key: keyof TableDataItem) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig?.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  return {
    // Dados e Estado
    processedData,
    sortConfig,
    currentPage,
    totalPages,
    // Handlers
    handleSort,
    onPageChange: setCurrentPage,
  };
};