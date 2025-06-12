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
import { dadosBarrasEmpilhadas } from "../../data/dataCharts/CharStackedBar";

export default function StackedBar() {
  return (
    <div className="p-8 space-y-10">
      <div>
        <h2 className="text-xl font-semibold">
          Custos MDO vs. Peças por unidade
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dadosBarrasEmpilhadas} stackOffset="sign">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="unidade" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="MDO" stackId="a" fill="#82ca9d" />
            <Bar dataKey="Pecas" stackId="a" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
