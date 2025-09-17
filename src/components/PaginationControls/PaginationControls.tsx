import { useEffect, useState } from 'react'; // Adicionado para a lógica de debounce

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
  totalItems: number;
}

export const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  totalItems,
}: PaginationControlsProps) => {
  // --- INÍCIO DAS ALTERAÇÕES ---

  // Estado local para o valor do input, permitindo digitação livre
  const [inputValue, setInputValue] = useState(String(itemsPerPage));

  // Efeito para debouncing: só atualiza o estado global após o usuário parar de digitar
  useEffect(() => {
    const handler = setTimeout(() => {
      const numValue = parseInt(inputValue, 10);
      // Atualiza apenas se o valor for um número válido, maior que zero e diferente do valor atual
      if (!isNaN(numValue) && numValue > 0 && numValue !== itemsPerPage) {
        onItemsPerPageChange(numValue);
      }
    }, 750); // Aguarda 750ms após a última digitação

    // Limpa o timeout se o usuário digitar novamente
    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, itemsPerPage, onItemsPerPageChange]);

  // Sincroniza o input se a prop `itemsPerPage` mudar por outra razão
  useEffect(() => {
    setInputValue(String(itemsPerPage));
  }, [itemsPerPage]);

  // --- FIM DAS ALTERAÇÕES ---

  if (totalPages <= 1 && totalItems <= itemsPerPage) {
    return null;
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleBlur = () => {
    const numValue = parseInt(inputValue, 10);
    if (!isNaN(numValue) && numValue > 0) {
      if (numValue !== itemsPerPage) {
        onItemsPerPageChange(numValue);
      }
    } else {
      setInputValue(String(itemsPerPage)); // reseta se inválido
    }
  };

  if (totalPages <= 1 && totalItems <= itemsPerPage) return null;


  return (
    <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600 bg-white p-3 rounded-b-lg border-t border-gray-200">
      {/* Lado Esquerdo: Input de Itens por Página */}
      <div className="flex items-center space-x-2 mb-2 sm:mb-0">
        <span>Linhas por página:</span>
        {/* Substituído o <select> por <input type="number"> */}
        <input
          type="number"
          min="1"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleBlur}
          className="w-16 text-center p-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <span className=''>
        Página {currentPage} de {totalPages} ({totalItems} resultados)
      </span>

      {/* Meio e Lado Direito: Contagem e Botões (sem alterações) */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-md border bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 rounded-md border bg-white hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
};