import { Menu } from "lucide-react";
export default function MenuButtonDesktop({ onClick }: { onClick: () => void }) {
    return (
    <button
      onClick={onClick}
      className= "hidden md:block p-2  bg-official-blue text-white rounded-lg hover:bg-official-blue-active transition top-4 left-4 absolute z-50"
    >
     <Menu className="w-8 h-8 font-bold" />
    </button>
  );
}
