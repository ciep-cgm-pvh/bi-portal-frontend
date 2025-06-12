import { useOutletContext } from 'react-router-dom';
import { OverView } from './Sections/OverView';

export default function Dashboard() {

  const isMobile = useOutletContext<boolean>();
  console.log('Dashboard received isMobile:', isMobile);
  
  return(
   <>
    {/* Sections as sub-components */}
    <OverView isMobile={isMobile}/>
   </>
  )
}