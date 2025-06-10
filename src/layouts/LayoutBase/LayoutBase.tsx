import { Outlet } from "react-router-dom";
import NavBarMobile from "../../components/navbar/NavBarMobile";
import useIsMobile from "../../hooks/useIsMobile";
import { useState } from "react";
export default function Layout() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  return (
    <div className={`flex ${isMobile ? "flex-col" : "flex-row"} w-full h-dvh`}>
      {!isMobile ? (
        <SidebarTeste />
      ) : (
        <NavBarMobile open={open} setOpen={setOpen} />
      )}

      <section
        className={`flex-1 px-10 py-5 overflow-auto ${
          isMobile ? "w-full" : ""
        }`}
      >
        <Outlet />
      </section>
    </div>
  );
}

const SidebarTeste = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-full p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Sidebar</h2>
      <ul className="space-y-2">
        <li className="hover:bg-gray-700 p-2 rounded">Item 1</li>
        <li className="hover:bg-gray-700 p-2 rounded">Item 2</li>
        <li className="hover:bg-gray-700 p-2 rounded">Item 3</li>
      </ul>
    </aside>
  );
};
