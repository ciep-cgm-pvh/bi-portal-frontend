type FilterProps = {
  secretarias?: string[];
  tiposOS?: string[];
};

export default function Filter({
  secretarias = [],
  tiposOS = [],
}: FilterProps) {
  return (
    <div className="relative w-full flex flex-col md:flex-row py-1 gap-4 lg:justify-center">
      {/* Filtro de intervalo de datas */}
      <section className='flex flex-col 2xs:flex-row justify-center items-center md:items-start gap-2'>
        <div className="flex flex-col justify-center items-center ">
          <label className="text-sm font-bold">Data Início</label>
          <input
            type="date"
            className="border cursor-pointer rounded-md px-2 py-1 text-sm w-fit font-semibold"
          />
        </div>
        <div className="flex flex-col justify-center items-center ">
          <label className="text-sm font-bold">Data Fim</label>
          <input
            type="date"
            className="border cursor-pointer rounded-md px-2 py-1 text-sm w-fit font-semibold"
          />
        </div>
      </section>

      <section className='w-full flex flex-col md:flex-row justify-center items-center gap-2 xl:w-fit'>
        <div className='flex flex-col w-full 2xs:flex-row gap-2 justify-center items-center'>
          {/* Select de secretaria/unidade */}
          <div className="flex flex-col md:w-2/4">
            <label className="text-sm font-bold text-nowrap">Secretaria / Unidade</label>
            <select
              className="border cursor-pointer rounded-md px-2 py-1 text-sm font-semibold w-full"
            >
              <option value="">Todas</option>
              {secretarias.map((secretaria, index) => (
                <option key={index} value={secretaria}>
                  {secretaria}
                </option>
              ))}
            </select>
          </div>

          {/* Select de tipo de OS */}
          <div className="flex flex-col md:w-2/4">
            <label className="text-sm font-bold">Tipo de OS</label>
            <select
              className="border cursor-pointer rounded-md px-2 py-1 text-sm font-semibold w-full"
            >
              <option value="">Todos</option>
              {tiposOS.map((tipo, index) => (
                <option key={index} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Botão de reset */}
        <div className="flex h-full mt-2 md:mt-0 justify-center items-end">
          <button
            className="flex bg-red-500 px-2 py-1 cursor-pointer text-nowrap rounded-md text-md text-white font-semibold text-center"
          >
            Resetar filtros
          </button>
        </div>
      </section>
    </div>
  )
}

// exemplo de utilização
{/* <Filter
  secretarias={[ 'Saúde', 'Educação', 'Transporte e segurança publica' ]}
  tiposOS={[ 'Manutenção de veiculos grandes', 'Inspeção', 'Reparo' ]}
/> */}