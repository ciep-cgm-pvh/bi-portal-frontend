import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { dadosBarrasVerticais } from "../../data/dataCharts/CharVerticalBar";

export default function VerticalBar() {
  return (
    <div className="p-8 space-y-10">
      {/* Barras verticais */}
      <div>
        <h2 className="text-xl font-semibold">Total gasto por unidade</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dadosBarrasVerticais}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="unidade" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
