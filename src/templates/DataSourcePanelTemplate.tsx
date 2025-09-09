import { Database, Download, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/HeaderSection/Header';
import { type DownloadFormat, useDataDownloader } from '../pages/panels/Combustivel/DataSoruce/hooks/useDataDownloader';


export interface DataSourceConfig {
  id: string;
  title: string;
  icon?: React.ReactNode;
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
    csv: 'bg-green-400 text-black border-green-600 hover:bg-green-500 font-bold ', // ligth green for csv
    xlsx: 'bg-green-700 text-white border-green-100 hover:bg-green-800', // dark green for xlsx
    json: 'bg-gray-800 text-yellow-300 border-yellow-600 hover:bg-black', // purple for json
  }; 

  return (
    <div className="bg-white rounded-2xl shadow-md flex flex-col">
      <div className="p-4 border-b">
        {config.icon? config.icon : <Database className="h-6 w-6 text-gray-800 mb-2" />}
        <h3 className="text-lg font-bold text-gray-800">{config.title}</h3>
        <p className="text-sm text-gray-600 mt-1">{config.description}</p>
      </div>
      <div className="p-4 bg-gray-900 flex-grow rounded-b-2xl">
        <p className="text-xs text-gray-50 uppercase font-semibold mb-2">Opções de Download</p>
        <div className="flex items-center space-x-2">
          {formats.map(format => {
            const loadingKey = `${config.id}-${format}`;
            const isLoading = loadingStates[loadingKey];
            const baseButtonClasses = "flex items-center space-x-2 px-3 py-2 text-sm font-medium border rounded-md disabled:opacity-50 disabled:cursor-wait transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-y-1";

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
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col gap-6 space-y-6 my-4">
      <Header title={pageTitle} description={overviewText as string} onBackToHub={() => navigate('/hub')}></Header>
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
    </>
  );
};