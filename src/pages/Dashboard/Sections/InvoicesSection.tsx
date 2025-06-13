//mdo == Mão de Obra
//os == Ordem de Serviço
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// MOCKS
const groupedBarData = [
  { mes: "Jan", bruto: 15000, comDesconto: 13000 },
  { mes: "Fev", bruto: 12000, comDesconto: 10500 },
  { mes: "Mar", bruto: 18000, comDesconto: 16000 },
];

const pieData = [
  { tipo: "Com desconto", valor: 75 },
  { tipo: "Sem desconto", valor: 25 },
];

const noInvoiceData = [
  {
    id: 201,
    cliente: "Carlos Lima",
    data: "2025-06-01",
    motivo: "Peça sem NF",
  },
  {
    id: 202,
    cliente: "Ana Souza",
    data: "2025-06-03",
    motivo: "MDO não informada",
  },
];

// CORES PARA A PIZZA
const COLORS = ["#34d399", "#f87171"];

export default function InvoicesSection() {
  return (
    <section className="w-full">
      <h2 className="text-xl font-semibold  bg-lime-500 rounded-t-md p-2">
        Total Bruto x Total com Desconto
      </h2>

      <div className="grid ">
        {/* Gráfico de Barras */}
        <div className="bg-white p-4 rounded-b-md shadow-md mb-4">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={groupedBarData}>
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bruto" fill="#60a5fa" name="Total Bruto" />
              <Bar dataKey="comDesconto" fill="#4ade80" name="Com Desconto" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de Pizza */}
        <h2 className="text-xl font-semibold bg-lime-500 rounded-t-md p-2">
          % de OS com e sem desconto
        </h2>
        <section className="w-full ">
          <div
            className="bg-white rounded-b-md shadow-md mb-4
          "
          >
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="valor"
                  nameKey="tipo"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      {/* Tabela de OS sem nota fiscal */}
      <h1 className="text-xl font-semibold bg-lime-500 rounded-t-md p-2">
        OS sem Nota Fiscal (Peças ou MDO)
      </h1>
      <div className="bg-white p-4 rounded-b-md shadow-md overflow-auto mb-4">
        <table className="w-full text-sm border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">ID</th>
              <th className="p-2">Cliente</th>
              <th className="p-2">Data</th>
              <th className="p-2">Motivo</th>
            </tr>
          </thead>
          <tbody>
            {noInvoiceData.map((os) => (
              <tr key={os.id} className="border-t">
                <td className="p-2">{os.id}</td>
                <td className="p-2">{os.cliente}</td>
                <td className="p-2">{os.data}</td>
                <td className="p-2">{os.motivo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
