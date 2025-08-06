import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBarMobile from '../../components/NavBar/NavBarMobile';
import SideBar from '../../components/SideBar/Sidebar';
import useIsMobile from '../../hooks/useIsMobile';


export default function LayoutBase() {
  const [isOpen, setIsOpen] = useState(true);
  const externalSetIsOpen = (state = !isOpen) => {
    setIsOpen(state);
  }

  const isMobile =  useIsMobile()


  const screenMode = ['bg-slate-900', 'bg-blue-50'];


  return (
    <div className={`flex flex-col min-h-screen ${screenMode[1]}`}>
      {isMobile ? (
        <NavBarMobile isOpen={isOpen} setIsOpen={externalSetIsOpen} />
      ) : (
        <SideBar isOpen={isOpen} setIsOpen={externalSetIsOpen}/>
      )}
      <main
        className={`flex flex-col mt-4 transition-all duration-500 ease-in-out flex-grow ${
          isMobile ? "mt-4 mx-5 mb-8" : isOpen ? "ml-[314px] mr-10" : "ml-24 mr-14"
        }`}
      >
        {/* Red Label at the top page with a message explaining there is not a real data, just random data sample */}
        <div className='bg-red-500 text-white p-4 rounded-md mb-4'>
          <h1 className='text-center font-bold'>Atenção: Esta página contém dados fictícios para demonstração de layout da página.</h1>
        </div>
        <Outlet context={isMobile as boolean}/>
      </main>
    </div>
  );
}
