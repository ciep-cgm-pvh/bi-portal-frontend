import { useState } from "react";
import SideBar from "./SideBar/Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      <SideBar open={open} setOpen={setOpen} />
      <main
        className={`transition-all duration-300 ease-in-out w-full ${
          open ? "ml-[280px]" : "ml-0"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}
