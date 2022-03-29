import { ChangeEvent, useState } from "react";
import Nota from "./components/Nota";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";

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
    { id: 1, nota: "", porcentaje: "" },
  ]);

  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  const addNewNota = () => {
    const lastId = notas[notas.length - 1].id;
    setNotas([
      ...notas,
      {
        id: lastId + 1,
        nota: "",
        porcentaje: "",
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
      <div className="background h-full w-full absolute"></div>
      <div className="flex items-center justify-center relative z-10">
        <div className="flex items-center justify-center flex-col w-10/12 pt-10 lg:max-w-6xl">
          <h1 className="text-4xl font-bold mb-5 text-center lg:mb-16 lg:text-6xl">
            Calcula tu promedio de notas 📚
          </h1>
          <div className="w-full flex flex-col items-center justify-center lg:flex-row">
            <button
              className="rounded-lg w-2/3 h-10 bg-blue-500 text-white mb-1 lg:m-0 lg:w-1/4 lg:mr-5 lg:text-xl "
              onClick={addNewNota}
            >
              Agregar nota
            </button>
            <button
              className="rounded-lg w-2/3 h-10 bg-red-500 text-white mb-5 lg:m-0 lg:w-1/4 lg:text-xl "
              onClick={deleteLastNota}
            >
              Eliminar última nota
            </button>
          </div>
          <div className="flex flex-col justify-center items-center lg:flex-row lg:mt-5 lg:text-xl">
            <p>Ingresa tus notas sin comas ni puntos.</p>
            <p className="lg:ml-1">(ej: 50, 65, 48).</p>
          </div>
          <div className="flex w-full mt-10 mb-24 lg:w-2/3 ">
            <div className="w-full">
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
            {isDesktop && (
              <div className="flex flex-col items-center w-full">
                <div className="text-center">
                  <h1 className="text-2xl">Promedio de notas</h1>
                  <h1 className="text-7xl">{notaFinal.toFixed(1)}</h1>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {!isDesktop && (
        <div className="fixed bottom-0 bg-gray-300 border-t-gray-500 border-t-4 w-full h-20 flex flex-col justify-center items-center font-bold z-10">
          <p>Promedio de notas</p>
          <p>{notaFinal.toFixed(1)}</p>
        </div>
      )}
    </>
  );
}

export default App;
