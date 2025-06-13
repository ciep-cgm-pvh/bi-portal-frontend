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
    <>
      <h2 className="text-xl font-semibold bg-lime-500 rounded-t-md p-2">
        Custos MDO vs. Peças por unidade
      </h2>
      <div className="p-6 bg-white rounded-b-md">
        <div>
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
    </>
  );
}
