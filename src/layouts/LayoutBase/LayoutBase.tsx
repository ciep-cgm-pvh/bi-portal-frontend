import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBarMobile from '../../components/navbar/NavBarMobile';
import SideBar from '../../components/SideBar/Sidebar';
import useIsMobile from '../../hooks/useIsMobile';


export default function LayoutBase() {
  const [isOpen, setIsOpen] = useState(false);
  const externalSetIsOpen = (state = !isOpen) => {
    setIsOpen(state);
  }

  const isMobile =  useIsMobile()

  return (
    <div className="flex flex-col min-h-screen">
      {isMobile ? (
        <NavBarMobile isOpen={isOpen} setIsOpen={externalSetIsOpen} />
      ) : (
        <SideBar isOpen={isOpen} setIsOpen={externalSetIsOpen}/>
      )}
      <main
        className={`flex flex-col mt-4 transition-all duration-500 ease-in-out flex-grow ${
          isMobile ? "mt-4" : isOpen ? "ml-[314px]" : "ml-24"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}
