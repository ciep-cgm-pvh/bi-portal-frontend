import { useState } from 'react';
import { useClient } from 'urql';
import { generateAndDownloadCSV, generateAndDownloadJSON, generateAndDownloadXLSX } from '../utils/file.utils';

export type DownloadFormat = 'csv' | 'json' | 'xlsx';

export const useDataDownloader = () => {
  const [ loadingStates, setLoadingStates ] = useState<{ [ key: string ]: boolean }>({});
  const client = useClient();

  const handleDownload = async (
    dataSourceId: string,
    query: string,
    format: DownloadFormat,
    filename: string
  ) => {
    const loadingKey = `${dataSourceId}-${format}`;
    setLoadingStates(prev => ({ ...prev, [ loadingKey ]: true }));

    try {
      const result = await client.query(query, {}).toPromise();

      if (result.error) throw result.error;

      const dataToDownload = Object.values(result.data)[ 0 ] as any[];

      if (!dataToDownload || dataToDownload.length === 0) {
        alert('Nenhum dado para baixar.');
        return;
      }

      if (format === 'xlsx') generateAndDownloadXLSX(dataToDownload, filename);
      if (format === 'csv') generateAndDownloadCSV(dataToDownload, filename);
      if (format === 'json') generateAndDownloadJSON(dataToDownload, filename);

    } catch (error) {
      console.error(`Falha ao baixar o arquivo ${format}:`, error);
      alert('Ocorreu um erro ao gerar o arquivo.');
    } finally {
      setLoadingStates(prev => ({ ...prev, [ loadingKey ]: false }));
    }
  };

  return { handleDownload, loadingStates };
};