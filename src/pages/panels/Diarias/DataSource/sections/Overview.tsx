export default function Overview() {
  return (
    <div className='flex flex-col gap-2 border text-gray-800 bg-amber-50 py-3 px-4 rounded-lg'>
      <p >
        Esta página fornece acesso a conjuntos de dados utilizados pela aplicação. Cada card abaixo representa um tipo de dado disponível, com uma breve descrição, uma prévia dos primeiros registros e um botão para download do arquivo completo.
      </p>
      <p>
        Os dados estão disponíveis nos formatos <strong>JSON</strong>, <strong>CSV</strong> e <strong>Excel (.xlsx)</strong>. Todos os arquivos são mantidos atualizados manualmente conforme aplicável.
      </p>
      <p>
        Para visualizar mais informações sobre um tipo de dado específico, utilize a visualização parcial fornecida ou faça o download completo.
      </p>
    </div>
  )
}