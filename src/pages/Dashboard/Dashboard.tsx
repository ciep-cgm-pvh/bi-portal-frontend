import { OverView } from './Sections/OverView';

export default function Dashboard() {
  return(
   <>
    {/* Main component */}
    <h1 className='text-2xl font-bold italic'>/DASHBOARD</h1>
    {/* Sections as sub-components */}
    <OverView/>
   </>
  )
}