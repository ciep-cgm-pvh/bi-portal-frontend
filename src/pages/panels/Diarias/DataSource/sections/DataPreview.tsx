import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

type DataProps = {
  title: string;
  description: string;
  downloadLink: string;
};

type RowData = Record<string, any>;

export default function DataPreview({ title, description, downloadLink }: DataProps) {
  const [ dataPreview, setDataPreview ] = useState<RowData[] | string>('Carregando...');

  // Hook para buscar e pré-visualizar os dados
  useEffect(() => {
    async function fetchAndPreview() {
      try {
        const response = await fetch(downloadLink);
        if (!response.ok) throw new Error('Erro ao buscar arquivo');

        const fileExt = downloadLink.split('.').pop()?.toLowerCase() || '';

        if (fileExt === 'json' || fileExt === 'txt') {
          const text = await response.text();
          const lines = text.split('\n').slice(0, 6).join('\n');
          setDataPreview(lines);
        } else if (fileExt === 'csv') {
          const text = await response.text();
          const lines = text.split('\n').slice(0, 6).join('\n');
          setDataPreview(lines);
        } else if (fileExt === 'xlsx' || fileExt === 'xls') {
          const arrayBuffer = await response.arrayBuffer();
          const workbook = XLSX.read(arrayBuffer, { type: 'array' });
          const firstSheetName = workbook.SheetNames[ 0 ];
          const worksheet = workbook.Sheets[ firstSheetName ];
          const rawCSV = XLSX.utils.sheet_to_csv(worksheet); // exporta como texto CSV
          const lines = rawCSV.split('\n').slice(0, 6).join('\n');
          setDataPreview(lines);
        } else {
          setDataPreview('Formato de arquivo não suportado para preview');
        }
      } catch (error) {
        setDataPreview(`Erro: ${(error as Error).message}`);
      }
    }

    fetchAndPreview();
  }, [ downloadLink ]);

  return (
    <div className='w-full col-span-1'>
      <h1 className='bg-lime-500 text-lg font-semibold rounded-t-lg px-4 py-2 border-b-1'>{title} Data Type</h1>
      <div className='flex flex-col gap-2 bg-white rounded-b-lg px-4 py-2'>
        <p>{description}</p>

        <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto whitespace-no-wrap h-36">
          {typeof dataPreview === 'string'
            ? dataPreview
            : JSON.stringify(dataPreview, null, 2)}
        </pre>
        <a
          href={downloadLink}
          download
          className="bg-red-600 w-fit text-white font-medium px-4 py-1 rounded hover:bg-red-700 transition self-end my-1"
        >Baixar</a>
      </div>
    </div>
  );
}