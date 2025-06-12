import { useOutletContext } from 'react-router-dom';
import CustosDetalhados from './Sections/CustosDetalhados';
import FleetSection from './Sections/FleetSection';
import { OverView } from './Sections/OverView';

export default function Dashboard() {

  const isMobile = useOutletContext<boolean>();
  console.log('Dashboard received isMobile:', isMobile);
  const render = true
  return(
   <>
    {/* Sections as sub-components */}
    <h1 className='bg-red-500 rounded-md my-5 p-2 justify-center font-bold'>Seção desevolvida por Jhonatan</h1>
    <OverView isMobile={isMobile}/>
    <h1 className='bg-red-500 rounded-md my-5 p-2 justify-center font-bold'>Seção desevolvida por Filipe Farias</h1>
    {!render?'':<CustosDetalhados/>}
    <h1 className='bg-red-500 rounded-md my-5 p-2 justify-center font-bold'>Seção desevolvida por Jhonatan</h1>
    {!render?'':<FleetSection isMobile={isMobile} className={''}/>}
   </>
  )
}