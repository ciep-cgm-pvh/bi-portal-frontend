import { Menu, X } from "lucide-react";
import { useState } from 'react';
import { NavLink } from "react-router-dom";
import getNavLinks from "../../data/NavLinksData";
import type { NavLinkInterface } from "../../interfaces/navLinksInterface";

export default function NavBarMobile() {

  const [open, setOpen] = useState(false);

  const links: NavLinkInterface[] = getNavLinks(); // ✅ agora links existe

  return (
    <nav className="bg-bermuda text-white p-3 w-full bottom-0 left-0 z-50 shadow-lg">
      {/* Topo com título e botão */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Menu</h1>
        <button onClick={() => setOpen(!open)} className="text-2xl">
          {open ? <X /> : <Menu />}{" "}
        </button>
      </div>

      {/* Menu suspenso */}
      <div className={`transition-all overflow-hidden ${
          open ? "max-h-screen" : "max-h-0"
        }`}
      >
        <ul className="mt-4 space-y-2">
          {links.map((link: NavLinkInterface) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 transition duration-250 ease-in-out rounded
                ${
                  isActive
                    ? "bg-official-blue-active text-white font-bold"
                    : "hover:bg-official-yellow-active hover:text-black font-bold"
                }`
                }
              >
                {link.icon}
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
