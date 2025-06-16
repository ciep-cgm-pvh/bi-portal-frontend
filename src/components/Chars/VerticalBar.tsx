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
    <>
      <h2 className="text-xl font-semibold bg-lime-500 rounded-t-md p-2">
        Gasto Por Unidade
      </h2>
      <div className="p-8 bg-white space-y-10 rounded-b-2xl">
        {/* Barras verticais */}
        <div>
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
      </div>{" "}
    </>
  );
}
