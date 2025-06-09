import { Link, Outlet } from 'react-router-dom';
import NavBarMobile from '../components/navbar/NavBarMobile';
import useIsMobile from '../hooks/useIsMobile';

export default function Layout() {
  const isMobile = useIsMobile();

  return(
    <div className='flex flex-col w-full h-dvh'>
      {!isMobile ? <SidebarTeste /> : <NavBarMobile />}
      
      <section className='px-10 py-5 -z-10 h-full'>
        <Outlet />
      </section>
    </div>
  )
}

const SidebarTeste = () => {
  return(
    <section className='px-6 py-3 bg-sky-500'>
      <div className='flex justify-between items-center'>
        <Link to="/home" className='bg-amber-50 px-3 py-1 rounded-lg'>Go to Home</Link>
        <p>SideBar teste</p>
        <Link to="/datasource" className='bg-sky-50 px-3 py-1 rounded-lg'>Go to Data Source Page</Link>
      </div>
    </section>
  )
}
