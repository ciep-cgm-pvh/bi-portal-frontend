import DataPreview from './sections/DataPreview';
import Overview from './sections/Overview';

export default function DataSourceDiarias() {
  return (
    <div className='flex gap-4 flex-col md:mb-4'>
      {/* <h1 className='text-2xl font-bold bg-official-yellow rounded-md py-2 px-4 text-left'>ACESSO AOS DADOS</h1> */}
      <Overview />
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <DataPreview title='CSV' description='Seção com dados CSV' downloadLink='/examples/exemplo.csv'/>
        <DataPreview title='Json' description='Seção com dados Json' downloadLink='/examples/exemplo.json'/>
        <DataPreview title='Xlsx' description='Seção com dados Xlsx' downloadLink='/examples/exemplo.xlsx'/>
      </div>
    </div>
  )
}