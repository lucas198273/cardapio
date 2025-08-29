import Dexie, { type Table } from "dexie";

export interface PedidoItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Pedido {
  id?: number; // ID local Dexie
  id_supabase?: number; // ID do Supabase
  id_uuid: string; // UUID do pedido
  pedido: PedidoItem[];
  total: number;
  data: Date;
  status: "pendente" | "pago" | "pronto";
  tipo?: "mesa" | "entrega" | null;
  mesa?: string | null;
  observacao?: string;
  nome_cliente: string;
  endereco?: {
    nome: string;
    rua: string;
    bairro: string;
    referencia: string;
  };
}

export class PedidosDB extends Dexie {
  pedidos!: Table<Pedido, number>;

  constructor() {
    super("PedidosDB");
    this.version(1).stores({
      pedidos: "++id, id_uuid, id_supabase, pedido, status, total, mesa, tipo, observacao, nome_cliente, endereco, data",
    });
  }

  async savePedido(pedidoData: Pedido): Promise<number> {
    return await this.pedidos.add(pedidoData);
  }

  async getPedidos(): Promise<Pedido[]> {
    return await this.pedidos.toArray();
  }

  async updatePedido(id: number, changes: Partial<Pedido>): Promise<void> {
    await this.pedidos.update(id, changes);
  }

  async deletePedido(id: number): Promise<void> {
    await this.pedidos.delete(id);
  }

  async clearPedidos(): Promise<void> {
    await this.pedidos.clear();
  }
}

export const db = new PedidosDB();
export default db;
