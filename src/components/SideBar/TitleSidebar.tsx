import { X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { getPanelTitle } from "../../utils/getPanelTitle";

export default function TitleSidebar({ closeSideBar }: { closeSideBar: (state: boolean) => void }) {
  const location = useLocation();

  // Extração do "grupo" do path
  const match = location.pathname.match(/^\/painel\/([^/]+)/);
  const currentGroup = match?.[1] || null;

  const title = getPanelTitle(currentGroup);
  return (
    <div className="flex items-center justify-between p-4 border-b border-white">
      <div className="flex items-center gap-2">
        <h2 className="hidden md:block text-2xl font-bold">{title}</h2>
        {/* <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Bras%C3%A3o_de_Porto_Velho.svg" alt="" className="w-10 h-10" /> */}
      </div>
      <button onClick={() => closeSideBar(false)} className="text-white text-2xl">
        <X />
      </button>
    </div>
  );
}
