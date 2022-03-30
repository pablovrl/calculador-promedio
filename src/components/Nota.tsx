import { ChangeEvent } from "react";
import { motion } from "framer-motion";

interface notaProps {
  handleNotaChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePorcentajeChange: (e: ChangeEvent<HTMLInputElement>) => void;
  nota: string;
  porcentaje: string;
  id: number;
}

const Nota = ({
  handleNotaChange,
  handlePorcentajeChange,
  nota,
  porcentaje,
  id,
}: notaProps) => {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      exit={{ opacity: 0 }}
      className="border-2 h-16 bg-white my-1 rounded-lg grid grid-cols-3 items-center px-4"
    >
      <span className="font-bold">Nota {id + 1}</span>
      <input
        className="border-2 w-10 mx-5 pl-1"
        name={id.toString()}
        value={nota}
        onChange={handleNotaChange}
        maxLength={2}
      />
      <div>
        <input
          className="border-2 w-10 pl-1 mr-1"
          name={id.toString()}
          value={porcentaje}
          onChange={handlePorcentajeChange}
          maxLength={3}
        />
        <span>%</span>
      </div>
    </motion.div>
  );
};

export default Nota;
