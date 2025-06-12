import FooterSidebar from "./FooterSidebar";
import MenuButtonDesktop from "./MenuButtonDesktop";
import { SideBarNav } from './SideBarNav';
import TitleSidebar from "./TitleSidebar";

export default function SideBar({isOpen, setIsOpen}: {isOpen: boolean, setIsOpen: (state: boolean) => void}) {
  console.log('SideBar received setIsOpen:', setIsOpen);
  return (
    <>
      <MenuButtonDesktop openSideBar={setIsOpen} />

      <aside
        className={`fixed top-0 left-0 h-full w-[280px] bg-official-blue text-white
        shadow-lg transform transition-transform duration-500 ease-in-out z-50
        flex flex-col ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <TitleSidebar closeSideBar={setIsOpen} />

        <SideBarNav isOpen={isOpen}/>
        <FooterSidebar />
      </aside>
    </>
  );
}
