import { supabase } from "../lib/supabaseClient";

export interface Order {
  id: number;
  total: number | null;
  data: string; // aqui é a coluna correta, retornada como UTC
  status: string | null;
  tipo: string | null;
  mesa: string | null;
  observacao: string | null;
  endereco: any; // jsonb
  pedido: any[]; // jsonb com itens
}

// Função para formatar a data corretamente no horário de São Paulo (UTC-3)
const formatDate = (dateString: string) => {
  if (!dateString) return "Data não disponível";
  const date = new Date(dateString); // Tenta criar a data
  console.log("Data bruta do Supabase:", dateString, "Data como Date:", date); // Depuração
  if (isNaN(date.getTime())) {
    console.error("Data inválida detectada:", dateString);
    return "Data inválida";
  }
  return date.toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour12: false,
  });
};

export async function getOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from("pedidos")
    .select("*")
    .order("data", { ascending: false }); // usa a coluna correta "data"

  if (error) throw error;

  // Ajusta a data no horário correto de São Paulo
  return (data as Order[]).map((order) => ({
    ...order,
    data: formatDate(order.data),
  }));
}