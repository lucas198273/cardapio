import  { useState } from "react";
import { horarioFuncionamento, type HorarioDia } from "../../utils/horarios";

interface Props {
  aberto: boolean;
  mensagem: string;
}

export default function HorarioAviso({ aberto, mensagem }: Props) {
  const [verHorario, setVerHorario] = useState(false);

  return (
    <>
      {!aberto && (
        <div className="p-4 mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 rounded relative">
          {mensagem}
          <button
            onClick={() => setVerHorario(true)}
            className="ml-4 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-500 transition"
          >
            Visualizar Horários
          </button>
        </div>
      )}

      {verHorario && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-lg relative">
            <button
              onClick={() => setVerHorario(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 font-bold text-xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-4 text-green-700">
              Horário de Funcionamento
            </h2>

            <table className="w-full text-left border-collapse">
              <tbody>
                {horarioFuncionamento.map((dia: HorarioDia) => (
                  <tr key={dia.dia} className="border-b">
                    <td className="py-2 font-semibold">{dia.dia}</td>
                    <td className="py-2">
                      {dia.abertura ? `${dia.abertura} - ${dia.fechamento}` : "Fechado"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
