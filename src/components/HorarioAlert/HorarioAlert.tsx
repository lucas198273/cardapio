import { useState, useEffect } from "react";
import { horarioFuncionamento, verificarHorarioAtual } from "../../utils/horarios";

const HorarioAlert: React.FC = () => {
  const [aberto, setAberto] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [verHorario, setVerHorario] = useState(false);

  useEffect(() => {
    const status = verificarHorarioAtual();
    setAberto(status.aberto);
    setMensagem(status.mensagem);
  }, []);

  return (
    <>
      {/* ALERTA FIXO NO TOPO */}
      <div
        className={`w-full p-4 text-white flex justify-between items-center ${
          aberto ? "bg-green-600" : "bg-red-600"
        }`}
      >
        <span>{mensagem}</span>
        {!aberto && (
          <button
            onClick={() => setVerHorario(true)}
            className="ml-4 px-3 py-1 bg-white text-green-700 rounded hover:bg-gray-200 transition"
          >
            Visualizar Horários
          </button>
        )}
      </div>

      {/* MODAL DE HORÁRIOS */}
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
                {horarioFuncionamento.map((dia) => (
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
};

export default HorarioAlert;
