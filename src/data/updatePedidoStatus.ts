// src/services/pedidoService.ts
import { supabase } from "../lib/supabaseClient";

export async function updatePedidoStatus(id: number, status: "pendente" | "pago" | "pronto") {
  if (!id) throw new Error("ID do pedido inválido.");

  const { error } = await supabase
    .from("pedidos")
    .update({ status })
    .eq("id", id);

  if (error) {
    console.error("Erro ao atualizar status:", error.message);
    throw error;
  }

  return true;
}
