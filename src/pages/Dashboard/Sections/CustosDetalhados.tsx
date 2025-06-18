// Funções dos Gráficos
import VerticalBar from "../../../components/Charts/VerticalChar";
import StackedBar from "../../../components/Charts/StackedChar";
import Dispersal from "../../../components/Charts/DispersalChart";
import HeatMap from "../../../components/Charts/HeatMapChar";

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
