import { db, type Pedido } from "./db";
import { supabase } from "../lib/supabaseClient";

export async function syncPedidos() {
  try {
    const pedidos: Pedido[] = await db.getPedidos();

    if (pedidos.length === 0) {
      console.log("Nenhum pedido para sincronizar.");
      return;
    }

    for (const pedido of pedidos) {
      // Prepara dados apenas com colunas existentes na tabela Supabase
      const pedidoParaSupabase = {
        id_uuid: pedido.id_uuid,  // ✅ envia para a coluna correta
        pedido: pedido.pedido,
        total: pedido.total,
        data: pedido.data,
        status: pedido.status,
        tipo: pedido.tipo,
        mesa: pedido.mesa,
        observacao: pedido.observacao,
        endereco: pedido.endereco,
      };

      const { error } = await supabase
        .from("pedidos")
        .insert(pedidoParaSupabase);

      if (error) {
        console.error("Erro ao sincronizar pedido:", error);
      } else {
        // Remove o pedido local apenas se enviou com sucesso
        if (pedido.id !== undefined) await db.deletePedido(pedido.id);
        console.log("Pedido sincronizado com sucesso. ID local:", pedido.id);
      }
    }
  } catch (err) {
    console.error("Erro na sincronização geral:", err);
  }
}
