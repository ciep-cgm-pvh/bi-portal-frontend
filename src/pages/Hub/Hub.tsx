import { ArrowRight, Banknote, Car, TicketsPlane, Users, Wrench } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const dashboards = [
  {
    title: "Diárias",
    description: "Painel com dados de concessão de diárias.",
    route: "#",
    icon: <TicketsPlane className="text-orange-400 w-6 h-6" />,
    type: "Gestão",
  },
  {
    title: "Frota",
    description: "Custos, manutenção e uso da frota municipal.",
    route: "#",
    icon: <Car className="text-shadow-blue-500 w-6 h-6" />,
    type: "Infraestrutura",
  },
  {
    title: "Compras",
    description: "Processos de compras e licitações em tempo real.",
    route: "#",
    icon: <Banknote className="text-green-700 w-6 h-6" />,
    type: "Financeiro",
  },
  {
    title: "Servidores",
    description: "Painel com dados funcionais dos servidores.",
    route: "#",
    icon: <Users className="text-purple-700 w-6 h-6" />,
    type: "Pessoal",
  },
  {
    title: "Manutenção",
    description: "Painel com dados funcionais dos servidores.",
    route: "/home",
    icon: <Wrench className="text-slate-700 w-6 h-6" />,
    type: "Gestão",
  },
];

const types = ["Gestão", "Infraestrutura", "Financeiro", "Pessoal"];

export default function HubPage() {


  return (
    <div className="min-h-screen bg-gray-100">
      <HubNavBar/>
      <HubHeroSection />
      <HubContentSection />
    </div>
  );
}

function HubContentSection() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const filteredDashboards =
    selectedTypes.length === 0
      ? dashboards
      : dashboards.filter((d) => selectedTypes.includes(d.type));

  return (
    <>
    {/* Conteúdo principal com filtro + resultados */}
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filtro lateral */}
        <aside className="bg-white max-h-fit rounded-lg shadow p-4 lg:col-span-1">
          <h2 className="text-lg font-bold mb-4 text-gray-800">Filtrar por tipo</h2>
          <div className="flex flex-col gap-2">
            {types.map((type) => (
              <label key={type} className="flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => toggleType(type)}
                  className="accent-blue-600"
                />
                {type}
              </label>
            ))}
          </div>
          <button
            onClick={() => setSelectedTypes([])}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-medium"
          >
            Limpar Filtros
          </button>
        </aside>

        {/* Resultados */}
        <section className="lg:col-span-3">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Painéis Disponíveis</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDashboards.map((item) => (
              <DashboardCard key={item.title} {...item} />
            ))}
            {filteredDashboards.length === 0 && (
              <p className="text-gray-600 col-span-full">Nenhum painel encontrado.</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
  
}

function HubHeroSection() {
  return (
    <>
    {/* Hero institucional */}
      <div className="relative bg-gradient-to-br from-official-blue via-official-blue to-cyan-500 text-white py-20 px-4 text-center overflow-hidden">
        {/* Imagem decorativa SVG ou elementos absolutos podem ser adicionados aqui */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />

        <img
          src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Bras%C3%A3o_de_Porto_Velho.svg"
          alt="Prefeitura"
          className="h-24 mx-auto mb-6 relative z-10"
        />
        <h3 className="text-xl font-bold relative z-10">Controladoria Geral do Município</h3>
        <h1 className="text-4xl md:text-5xl font-extrabold mt-2 relative z-10">
          Central de Inteligência Municipal
        </h1>
        <p className="text-md mt-3 max-w-2xl mx-auto relative z-10">
          Acesse painéis estratégicos e dados analíticos da gestão pública de Porto Velho.
        </p>
      </div>
    </>
  )
}

function HubNavBar() {
  return (
    <>
            {/* Navbar topo */}
<div className="bg-white border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
    {/* Logo + Título juntos */}
  <div className="flex items-center gap-3">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/2/2e/Bras%C3%A3o_de_Porto_Velho.svg"
      alt="Brasão de Porto Velho"
      className="h-10 w-auto"
    />
    <h1 className="text-lg font-semibold text-gray-800">
      Prefeitura de Porto Velho
    </h1>
  </div>
    <nav className="hidden md:flex gap-6 text-sm text-gray-700 font-medium">
      <a href="/" className="hover:text-blue-600">Início</a>
      <a href="#painel" className="hover:text-blue-600">Painéis</a>
      <a href="#sobre" className="hover:text-blue-600">Sobre</a>
      <a href="#contato" className="hover:text-blue-600">Contato</a>
    </nav>
  </div>
</div>
    </>
  )
}

function DashboardCard({
  title,
  description,
  route,
  icon,
}: {
  title: string;
  description: string;
  route: string;
  icon: React.ReactNode;
}) {
  const navigate = useNavigate();
  return (
    <Card className="hover:shadow-lg transition-all border border-gray-200">
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          {icon}
        </div>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <Button onClick={() => navigate(route)} className="flex items-center gap-2">
          Acessar painel <ArrowRight size={16} />
        </Button>
      </CardContent>
    </Card>
  );
}

// Componentes base

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-white rounded-xl p-4 ${className}`}>{children}</div>;
}

function CardContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

function Button({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium ${className}`}
    >
      {children}
    </button>
  );
}
