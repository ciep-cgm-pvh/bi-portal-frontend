import { useEffect, useState } from "react";
import SideBar from "./SideBar/Sidebar";
import { Outlet } from "react-router-dom";
import NavBarMobile from "./navbar/NavBarMobile";

export default function Layoutbar() {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 728);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {isMobile ? (
        <NavBarMobile open={open} setOpen={setOpen} />
      ) : (
        <SideBar open={open} setOpen={setOpen} />
      )}

      <main
        className={`transition-all duration-300 ease-in-out flex-grow ${
          isMobile ? "mt-[60px]" : open ? "ml-[280px]" : "ml-0"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}
