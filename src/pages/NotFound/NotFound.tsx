// pages/NotFound.tsx
import { BiError } from "react-icons/bi";
import { Link } from "react-router-dom";
import { navLinks } from "../../data/NavLinksData";

const dashboardLink = navLinks.find((link) => link.title === "Dashboard");

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
      <section className="bg-white text-slate-800 p-8 rounded-2xl shadow-lg w-full max-w-xl flex flex-col items-center gap-6 border border-slate-300">
        <BiError className="text-red-600" size={60} />
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          Opa! Página não encontrada
        </h1>
        <p className="text-center text-base md:text-lg text-slate-600">
          A página que você está tentando acessar não existe, foi movida ou está temporariamente indisponível.
        </p>

          <Link
            to="/home"
            className="bg-official-blue hover:bg-official-blue-active text-white font-medium px-4 py-2 rounded-lg shadow text-center transition-all ease-in-out duration-500"
          >
            Voltar para a Página Inicial
          </Link>
      </section>
    </div>
  );
}
