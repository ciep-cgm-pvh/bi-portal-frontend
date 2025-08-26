import { Download, Loader2 } from 'lucide-react';
import { type DownloadFormat, useDataDownloader } from '../pages/panels/Combustivel/DataSoruce/hooks/useDataDownloader';


export interface DataSourceConfig {
  id: string;
  title: string;
  description: string;
  filename: string;
  query: string;
}

interface DataSourcePanelTemplateProps {
  pageTitle: string;
  overviewText: React.ReactNode;
  dataSources: DataSourceConfig[];
}

const DataSourceCard = ({ config, onDownload, loadingStates }: { config: DataSourceConfig, onDownload: Function, loadingStates: any }) => {
  const formats: DownloadFormat[] = ['csv', 'xlsx', 'json'];

  const formatStyles: { [key in DownloadFormat]: string } = {
    csv: 'bg-green-200 text-green-900 border-green-300 hover:bg-green-300 font-bold',
    xlsx: 'bg-green-700 text-white border-green-800 hover:bg-green-800',
    json: 'bg-gray-800 text-yellow-300 border-gray-700 hover:bg-black',
  };

  return (
    <div className="bg-white rounded-lg shadow-md flex flex-col">
      <div className="p-4 border-b">
        <h3 className="text-lg font-bold text-gray-800">{config.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{config.description}</p>
      </div>
      <div className="p-4 bg-gray-50 flex-grow">
        <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Opções de Download</p>
        <div className="flex items-center space-x-2">
          {formats.map(format => {
            const loadingKey = `${config.id}-${format}`;
            const isLoading = loadingStates[loadingKey];
            const baseButtonClasses = "flex items-center space-x-2 px-3 py-2 text-sm font-medium border rounded-md disabled:opacity-50 disabled:cursor-wait transition-colors duration-200";

            return (
              <button
                key={format}
                disabled={isLoading}
                onClick={() => onDownload(config.id, config.query, format, config.filename)}
                className={`${baseButtonClasses} ${formatStyles[format]}`}
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                <span>{format.toUpperCase()}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const DataSourcePanelTemplate = ({ pageTitle, overviewText, dataSources }: DataSourcePanelTemplateProps) => {
  const { handleDownload, loadingStates } = useDataDownloader();
  
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-800">{pageTitle}</h1>
      <div className="bg-gray-100 p-4 rounded-lg text-gray-700">
        {overviewText}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dataSources.map(source => (
          <DataSourceCard 
            key={source.id} 
            config={source} 
            onDownload={handleDownload}
            loadingStates={loadingStates}
          />
        ))}
      </div>
    </div>
  );
};