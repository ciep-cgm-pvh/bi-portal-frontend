import { X } from "lucide-react";
type Props = {
  onClose: () => void;
};

export default function TitleSidebar({ onClose }:  Props ) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-white">
      <div className="flex items-center gap-2">
        <h2 className="hidden md:block text-2xl font-bold">BI: e-ponto</h2>
        <img src="/public/logos/logo-prefeitura.png" alt="" className="w-10 h-10" />
      </div>
      <button onClick={onClose} className="text-white text-2xl">
        <X />
      </button>
    </div>
  );
}
