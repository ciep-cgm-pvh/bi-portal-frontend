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

export default function Dispersal() {
  return (
    <div className="p-8 space-y-10">
      <div className="w-max-50%">
        <h2 className="text-xl font-semibold">KM/Horímetro vs. Custo</h2>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid />
            <XAxis type="number" dataKey="km_horimetro" name="KM/Horímetro" />
            <YAxis type="number" dataKey="custo" name="Custo" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter name="OS" data={dadosDispersao} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
