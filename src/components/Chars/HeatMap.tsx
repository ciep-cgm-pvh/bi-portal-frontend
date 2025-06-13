import { dadosMapaCalor } from "../../data/dataCharts/CharHeatMap";

export default function HeatMap() {
  return (
    <>
      <h2 className="text-xl font-semibold bg-lime-500 rounded-md p-2">
        Frequência de OS por dia e hora
      </h2>
      <p className="text-sm text-gray-500">
        * Heatmap precisa de lib externa ou renderização manual com CSS
      </p>
      <div className="grids gap-2 rounded-2xl">
        {dadosMapaCalor.map((item, index) => (
          <div
            key={index}
            className="p-2 text-center rounded-2xl mb-1.5"
            style={{
              backgroundColor: `rgba(255, 99, 132)`,
            }}
          >
            <strong>{item.dia}</strong> - {item.hora}
            <br />
            {item.freq}x
          </div>
        ))}
      </div>
    </>
  );
}
