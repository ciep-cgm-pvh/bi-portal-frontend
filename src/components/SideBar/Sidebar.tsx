import { navLinks } from "../../data/NavLinksData";
import { useNavigate } from "react-router-dom";
import TitleSidebar from "./TitleSidebar";
import FooterSidebar from "./FooterSidebar";
import MenuButtonDesktop from "./MenuButtonDesktop";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};
export default function SideBar({ open, setOpen }: Props) {
  const navigate = useNavigate();
  const pathname = location.pathname;
  // 👉 função que só navega se for uma rota diferente

  return (
    <>
      <MenuButtonDesktop onClick={() => setOpen(true)} />

      <aside
        className={`fixed top-0 left-0 h-full w-[280px] bg-official-blue text-white
    shadow-lg transform transition-transform duration-300 ease-in-out z-50
    flex flex-col ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <TitleSidebar onClose={() => setOpen(false)} />

        <nav className="p-4 flex flex-col gap-2 flex-grow">
          {navLinks.map((link, index) => {
            const isActive = pathname === link.path;

            return (
              <button
                key={index}
                onClick={() => {
                  if (location.pathname !== link.path) {
                    navigate(link.path);
                  }
                }}
                disabled={isActive}
                className={`flex items-center gap-2 p-2 rounded-lg font-semibold w-full text-left
                  transition-colors duration-300 ease-in-out
                  ${
                    isActive
                      ? "bg-official-blue-active text-white font-bold cursor-default"
                      : "hover:bg-official-yellow transition duration-200 hover:text-black"
                  }
                `}
              >
                {link.icon}
                <span
                  className={`transition-transform duration-300 ease-in-out ${
                    isActive ? "scale-110" : "scale-100"
                  }`}
                >
                  {link.title}
                </span>
              </button>
            );
          })}
        </nav>

        <div className="flex p-4">
          <FooterSidebar />
        </div>
      </aside>
    </>
  );
}
