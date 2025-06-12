import { X } from "lucide-react";

export default function TitleSidebar({ closeSideBar }: { closeSideBar: (state: boolean) => void }) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-white">
      <div className="flex items-center gap-2">
        <h2 className="hidden md:block text-2xl font-bold">BI: Manutenção</h2>
        {/* <img src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Bras%C3%A3o_de_Porto_Velho.svg" alt="" className="w-10 h-10" /> */}
      </div>
      <button onClick={() => closeSideBar(false)} className="text-white text-2xl">
        <X />
      </button>
    </div>
  );
}
