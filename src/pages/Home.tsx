import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar/Sidebar";

export default function Home() {
  const navigate = useNavigate();

  // ⬇️ Adicione o estado para controlar o menu
  const [isOpen, setIsOpen] = useState(false);

  const handleGoToNotFound = () => {
    navigate("/notFound");
  };

  return (
    <div className="">
      {/* ⬅️ Passe isOpen e setIsOpen como props */}
      <SideBar open={isOpen} setOpen={setIsOpen} />

      <div className="flex flex-col gap-3 mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="text-center text-9xl font-semibold text-midnight">
          Hello World!
        </h1>
        <p className="mt-6 text-center text-4xl leading-8 text-gray-600">
          This is a simple <span className="text-cyan-500">React app</span>{" "}
          styled with <span className="text-cyan-500">Tailwind CSS</span>.
        </p>
        <button
          onClick={handleGoToNotFound}
          className="mt-5 bg-cyan-500 hover:bg-cyan-700 rounded text-white self-center w-fit px-3 py-1 cursor-pointer"
        >
          Go to Not Found page
        </button>
      </div>
    </div>
  );
}
