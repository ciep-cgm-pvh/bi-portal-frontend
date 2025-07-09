import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import getHubCardsData from '../../data/HubCardsData';
import getHubNavLinks from '../../data/HubNavLinks';

const hubCards = getHubCardsData();
const hubNavLinks = getHubNavLinks();
//const brasaoUrl = "https://upload.wikimedia.org/wikipedia/commons/8/89/Coat_of_arms_of_Porto_Velho.svg";
const brasaoCidadePortoVelho = "https://github.com/CGM-PVH/CGM-ASSETS/blob/main/logomarcas/logo%20-%20brasao%20-%20cidade%20de%20Porto%20Velho.png?raw=true";
const logoCGM = "https://github.com/CGM-PVH/CGM-ASSETS/blob/main/logomarcas/logo%20CGM%20-%20cidade%20de%20Porto%20Velho.png?raw=true";

const types = hubCards.reduce<string[]>((acc, item) => {
  if (!acc.includes(item.type)) {
    acc.push(item.type);
  }
  return acc;
}, []);

export default function HubPage() {


  return (
    <div className="min-h-screen bg-slate-200">
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

  const filteredHubCards =
    selectedTypes.length === 0
      ? hubCards
      : hubCards.filter((d) => selectedTypes.includes(d.type));

  return (
    <>
    {/* Conteúdo principal com filtro + resultados */}
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filtro lateral */}
        <aside className="bg-slate-100 max-h-fit rounded-lg shadow p-4 lg:col-span-1">
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
            {filteredHubCards.map((item) => (
              <DashboardCard key={item.title} {...item} />
            ))}
            {filteredHubCards.length === 0 && (
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
      <div className="relative bg-gradient-to-br from-official-blue via-official-blue to-cyan-500 text-white 
      py-10 px-4 text-center overflow-hidden">
        {/* Imagem decorativa SVG ou elementos absolutos podem ser adicionados aqui */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none" />

        <img
          src={brasaoCidadePortoVelho}
          alt="Brasão de Porto Velho"
          className="h-24 mx-auto mb-6 relative z-10"
        />
        <h3 className="text-xl font-bold relative z-10">Prefeitura de Porto Velho</h3>
        <h4 className="text-xl font-semibold relative z-10">Controladoria Geral do Município</h4>
        {/* <h1 className="text-4xl md:text-5xl font-extrabold mt-2 relative z-10">
          Central de Inteligência Municipal
        </h1> */}
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
      <div className="bg-slate-100 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="http://cgm.portovelho.ro.gov.br/">
            <img src={logoCGM} alt="" className="max-h-18"/>
          </a>

          <nav className="hidden md:flex gap-6 text-sm text-gray-700 font-medium">
            {hubNavLinks.map((link) => (
              <a key={link.title} href={link.path} className="hover:text-blue-600">
                {link.title}
              </a>
            ))}
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

  // 1. VERIFICAÇÕES DA LÓGICA
  const isRouteDisabled = !route || route === '#';
  const isInternalRoute = typeof route === 'string' && route.startsWith('/');

  // Lógica de navegação (sem alterações)
  const handleAccess = () => {
    if (isRouteDisabled) return; // Não faz nada se a rota estiver desabilitada

    if (route.startsWith("http")) {
      window.open(route, "_blank", "noopener,noreferrer");
    } else {
      navigate(route);
    }
  };

  // 2. CLASSES CONDICIONAIS
  // Define a classe do card como amarela se for uma rota interna
  const cardStyle = isInternalRoute ? 'bg-slate-100 border-gray-200' : 'bg-slate-100 border-gray-200';
  // Define as classes do botão se ele estiver desabilitado
  const buttonStyle = isRouteDisabled
    ? 'bg-gray-600 cursor-not-allowed text-gray-400 hover:bg-gray-600'
    : 'bg-blue-600 cursor-pointer text-white hover:bg-blue-700';

  return (
    // Aplica a cor condicional do card
    <Card className={`hover:shadow-lg transition-all flex flex-col h-full ${cardStyle}`}>
      <CardContent className="flex flex-col flex-grow">
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-4">
            <h3 className={`text-lg ${isInternalRoute ? 'font-extrabold text-gray-600' : 'font-bold text-gray-600'}`}>{title}</h3>
            {icon}
          </div>
          <p className="text-sm text-gray-600">{description}</p>
        </div>

        <Button
          onClick={handleAccess}
          disabled={isRouteDisabled} // Desabilita o botão
          className={`flex items-center gap-2 max-w-fit mt-4 ${buttonStyle}`} // Aplica o estilo condicional do botão
        >
          Acessar painel <ArrowRight size={16} />
        </Button>
      </CardContent>
    </Card>
  );
}

// Componentes base (sem alterações)

// Componentes base

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  // A classe 'bg-slate-100' foi removida daqui para permitir que a cor seja definida no DashboardCard
  return <div className={`rounded-xl p-4 ${className}`}>{children}</div>;
}

function CardContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

// O botão agora aceita e aplica a propriedade 'disabled'
function Button({
  children,
  onClick,
  className = "",
  disabled = false, // Adicionada a propriedade 'disabled'
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean; // Adicionada a tipagem
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled} // A propriedade é passada para o elemento HTML
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${className}`}
    >
      {children}
    </button>
  );
}