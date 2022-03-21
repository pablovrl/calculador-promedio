import React, { ChangeEvent, useState } from "react";
import Nota from "./components/Nota";

interface Nota {
  id: number;
  nota: string;
  porcentaje: string;
}

function App() {
  const [notas, setNotas] = useState<Nota[]>([
    {
      id: 0,
      nota: "70",
      porcentaje: "100",
    },
    { id: 1, nota: "0", porcentaje: "0" },
  ]);

  const addNewNota = () => {
    const lastId = notas[notas.length - 1].id;
    setNotas([
      ...notas,
      {
        id: lastId + 1,
        nota: "0",
        porcentaje: "0",
      },
    ]);
  };

  const deleteLastNota = () => {
    if (notas.length > 1) {
      const newNotas = notas;
      newNotas.pop();
      setNotas([...newNotas]);
    }
  };

  const handleNotaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNotas(
      notas.map((nota) => {
        if (nota.id.toString() === e.target.name) {
          return {
            ...nota,
            nota: e.target.value,
          };
        }
        return nota;
      })
    );
  };

  const handlePorcentajeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNotas(
      notas.map((nota) => {
        if (nota.id.toString() === e.target.name) {
          return {
            ...nota,
            porcentaje: e.target.value,
          };
        }
        return nota;
      })
    );
  };

  let notaFinal = 0;
  notas.forEach((nota) => {
    if (nota.nota && nota.porcentaje) {
      const op =
        parseInt(nota.nota, 10) * (parseInt(nota.porcentaje, 10) / 100);
      notaFinal += op;
    }
  });

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center flex-col w-10/12 pt-10">
          <h1 className="text-4xl font-bold mb-10 text-center">
            Calcula tu promedio de notas📚
          </h1>
          <button
            className="rounded-md w-1/2 h-10 bg-blue-500 text-white mb-1"
            onClick={addNewNota}
          >
            Agregar nota
          </button>
          <button
            className="rounded-md w-1/2 h-10 bg-red-500 text-white mb-5"
            onClick={deleteLastNota}
          >
            Eliminar última nota
          </button>
          <p>Ingresa tus notas sin comas ni puntos.</p>
          <p>(ej: 50, 65, 48).</p>
          <div className="w-full mt-2 mb-24">
            {notas.map((nota, i) => (
              <Nota
                key={i}
                id={nota.id}
                nota={nota.nota}
                porcentaje={nota.porcentaje}
                handleNotaChange={handleNotaChange}
                handlePorcentajeChange={handlePorcentajeChange}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 bg-gray-300 border-t-gray-500 border-t-4 w-full h-20 flex flex-col justify-center items-center font-bold">
        <p>Promedio de notas</p>
        <p>{notaFinal.toFixed(1)}</p>
      </div>
    </>
  );
}

export default App;
