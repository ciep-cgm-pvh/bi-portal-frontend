// Funções dos Gráficos
import VerticalBar from "../../../components/Chars/VerticalBar";
import StackedBar from "../../../components/Chars/StackedBar";
import Dispersal from "../../../components/Chars/DispersalBar";
import HeatMap from "../../../components/Chars/HeatMap";

export default function CustosDetalhados() {
  return (
    <div className="mt-4 mb-4 space-y-10">
      {/* Barras verticais */}
      <div>
        <VerticalBar />
      </div>

      {/* Barras empilhadas */}
      <div>
        <StackedBar />
      </div>

      {/* Gráfico de Dispersão */}
      <div>
        <Dispersal />
      </div>

      {/* Mapa de Calor */}
      <div>
        <HeatMap />
      </div>
    </div>
  );
}
