import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export type Order = {
  id: number;
  total?: number;
  data: string;
  status: "pendente" | "pago" | "pronto";
  tipo: string;
  mesa?: string;
  observacao?: string;
  endereco?: { rua: string; bairro: string };
  pedido?: { name: string; price?: number; quantity: number }[];
};

export default function OrdersPanel() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      try {
        const { data, error } = await supabase.from("pedidos").select("*");
        if (error) throw error;
        setOrders(data || []);
      } catch (err) {
        console.error("Erro ao carregar pedidos:", err);
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  // Atualizar status: tipagem correta
  const updateStatus = async (id: number, newStatus: Order["status"]) => {
    try {
      const { error } = await supabase
        .from("pedidos")
        .update({ status: newStatus })
        .eq("id", id);
      if (error) throw error;

      setOrders(prev =>
        prev.map(order =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Erro ao atualizar status:", err);
    }
  };
const deleteAllOrders = async () => {
  if (!confirm("Tem certeza que deseja deletar todos os pedidos? Esta ação não pode ser desfeita.")) return;

  try {
    const { error } = await supabase
      .from("pedidos")
      .delete()
      .not("id", "is", null); // pega todas as linhas
    if (error) throw error;

    setOrders([]); // limpa localmente
    alert("Todos os pedidos foram deletados da base!");
  } catch (err) {
    console.error("Erro ao deletar pedidos:", err);
  }
};



  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Pedidos do Dia", 14, 20);

    const tableData = orders.map(o => [
      o.id ?? "-",
      o.tipo ?? "-",
      o.status,
      o.total !== undefined ? o.total.toFixed(2) : "0.00",
      formatDate(o.data)
    ]);

    autoTable(doc, {
      head: [["ID", "Tipo", "Status", "Total", "Data"]],
      body: tableData,
      startY: 30,
    });

    doc.save("pedidos-do-dia.pdf");
  };

const formatDate = (dateString: string) => {
  if (!dateString) return "-";
  
  // Criar a data em UTC
  const date = new Date(dateString + "Z"); // adiciona 'Z' para indicar UTC

  // Converter para horário de São Paulo
  return date.toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour12: false,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};


  return (
    <div className="pt-32 p-6 md:pt-32 md:p-12 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-12 text-gray-800">Painel de Pedidos</h1>

      {loading ? (
        <p className="text-gray-600">Carregando pedidos...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600">Nenhum pedido encontrado.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {orders.map(order => (
            <div
              key={order.id}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition"
            >
              <div className="mb-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-gray-700 text-lg">Pedido #{order.id}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === "pendente"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "pago"
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {order.status === "pronto" ? "Pronto" : order.status === "pago" ? "Pago" : "Pendente"}
                  </span>
                </div>
                <p className="text-gray-600 mb-1">
                  Total: <span className="font-semibold">R$ {order.total?.toFixed(2)}</span>
                </p>
                <p className="text-gray-600 mb-1">Data: {formatDate(order.data)}</p>
                <p className="text-gray-600 mb-1">Tipo: {order.tipo}</p>
                {order.mesa && <p className="text-gray-600 mb-1">Mesa: {order.mesa}</p>}
                {order.observacao && <p className="text-gray-600 mb-1">Obs: {order.observacao}</p>}
                {order.endereco && (
                  <p className="text-gray-600 mb-1">
                    Endereço: {order.endereco.rua}, {order.endereco.bairro}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <p className="font-semibold text-gray-700 mb-1">Itens:</p>
                <ul className="list-disc pl-5 text-gray-600">
                  {order.pedido?.map((item, index) => (
                    <li key={index}>
                      {item.name} - R$ {item.price?.toFixed(2)} x {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Botões de status permanecem visíveis até pedido estar pronto */}
              {order.status !== "pronto" && (
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    onClick={() => updateStatus(order.id, "pago")}
                    className="flex-1 px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  >
                    Marcar como Pago
                  </button>
                  <button
                    onClick={() => updateStatus(order.id, "pronto")}
                    className="flex-1 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                  >
                    Pedido Pronto
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {orders.length > 0 && (
        <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={exportPDF}
            className="px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
          >
            Exportar PDF do Dia
          </button>
          <button
            onClick={deleteAllOrders}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Deletar Todos os Pedidos
          </button>
        </div>
      )}
    </div>
  );
}
