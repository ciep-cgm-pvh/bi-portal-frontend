import { dadosMapaCalor } from "../../data/dataCharts/CharHeatMap";

export default function HeatMap() {
  return (
    <div>
      <h2 className="text-xl font-semibold">Frequência de OS por dia e hora</h2>
      <p className="text-sm text-gray-500">
        * Heatmap precisa de lib externa ou renderização manual com CSS
      </p>
      <div className="grid grid-cols-5 gap-2">
        {dadosMapaCalor.map((item, index) => (
          <div
            key={index}
            className="p-2 text-center rounded"
            style={{
              backgroundColor: `rgba(255, 99, 132, ${item.freq / 15})`,
            }}
          >
            <strong>{item.dia}</strong> - {item.hora}
            <br />
            {item.freq}x
          </div>
        ))}
      </div>
    </div>
  );
}
