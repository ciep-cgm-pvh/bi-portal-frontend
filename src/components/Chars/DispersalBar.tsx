import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ScatterChart,
  Scatter,
  ResponsiveContainer,
} from "recharts";
import { dadosDispersao } from "../../data/dataCharts/CharDispersal";
import { useEffect } from "react";
export default function Dispersal() {
  useEffect(() => {
    const handleResize = () => {};

    handleResize(); // inicializa
    window.addEventListener("resize", handleResize); // escuta resize
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Título */}
      <h2 className="text-xl font-semibold bg-lime-500 rounded-t-md p-2">
        Dispersão KM/Horímetro x Custo
      </h2>

      {/* Grid estilo cards */}
      <div className="grid grid-cols-1 gap-4">
        {/* Card do gráfico */}
        <div className="bg-white p-4 rounded-b-md shadow-md">
          <ResponsiveContainer width="100%" height={250}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="km_horimetro"
                name="KM/Horímetro"
                label={{
                  value: "KM/Horímetro",
                  position: "insideBottom",
                  offset: -5,
                }}
              />
              <YAxis
                type="number"
                dataKey="custo"
                name="Custo"
                label={{ value: "Custo", angle: -90, position: "insideLeft" }}
              />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter name="OS" data={dadosDispersao} fill="#60a5fa" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
