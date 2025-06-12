// pages/Home.tsx
import { AlertTriangle, HomeIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleGoToNotFound = () => {
    navigate("/notFound");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center text-white">
      <div className="bg-white text-slate-900 rounded-2xl shadow-lg p-8 md:p-12 max-w-3xl w-full flex flex-col items-center gap-6">
        <HomeIcon size={48} className="text-slate-900" />
        <h1 className="text-4xl md:text-5xl font-bold text-center">Bem-vindo!</h1>
        
        {/* Descrição do projeto */}
        <p className="text-base md:text-lg text-center text-slate-800 bg-cyan-100 rounded-md p-4 shadow-inner">
          Este projeto tem como objetivo centralizar, simplificar e dar transparência à análise de dados públicos relacionados à
          manutenção de frota municipal. A plataforma oferece visualizações interativas, filtros customizados e indicadores-chave
          de desempenho para facilitar a tomada de decisões e o acompanhamento de gastos públicos.
        </p>

        <p className="text-lg md:text-xl font-medium text-center">
          Construído com Vite, TypeScript, <span className="text-midnight font-semibold">React</span> e{" "}
          <span className="text-midnight font-semibold">Tailwind CSS</span>
          {/* , integrado a um backend de dados estruturado. */}
        </p>

        <div className="flex flex-col md:flex-row gap-4 mt-4 w-full justify-center">
          <button
            onClick={handleGoToNotFound}
            className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg shadow "
          >
            <AlertTriangle size={18} /> Página Não Encontrada
          </button>
          <Link
            to="/dashboard"
            className="bg-official-blue hover:bg-official-blue-active text-white font-medium px-4 py-2 rounded-lg shadow text-center transition-all ease-in-out duration-500"
          >
            Acessar o Dashboard
          </Link>
          <Link
            to="/datasource"
            className="bg-lime-500 hover:bg-lime-900 text-black hover:text-white font-medium px-4 py-2 rounded-lg shadow text-center transition-all ease-in-out duration-500"
          >
            Acessar os relatórios
          </Link>
        </div>
      </div>
    </div>
  );
}
