import { useOutletContext } from 'react-router-dom';
import CustosDetalhados from './Sections/CustosDetalhados';
import FleetSection from './Sections/FleetSection';
import { OverView } from './Sections/OverView';

export default function Dashboard() {

  const isMobile = useOutletContext<boolean>();
  console.log('Dashboard received isMobile:', isMobile);
  const render = true
  const showQuemFez = false
  return(
   <>
    {/* Sections as sub-components */}
    {QuemFez('Jhonatan', showQuemFez)}
    <OverView isMobile={isMobile}/>
    {QuemFez('Filipe Farias', showQuemFez)}
    {!render?'':<CustosDetalhados/>}
    {QuemFez('Jhonatan', showQuemFez)}
    {!render?'':<FleetSection isMobile={isMobile} className={''}/>}
   </>
  )
}

const QuemFez = (text: string, show: boolean) => {
  return (
    <>
      {show? <h1 className='bg-red-500 rounded-md my-5 p-2 justify-center font-bold'>{`Seção desevolvida por ${text}`}</h1> : ''}
    </>
  )
}