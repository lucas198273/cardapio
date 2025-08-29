import Dexie, { type Table } from "dexie";

export interface PedidoItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Pedido {
  id?: number; // Dexie auto incrementa
  id_supabase?: number | null; // ID do Supabase
  id_uuid: string; // UUID local
  pedido: PedidoItem[];
  total: number;
  data: Date;
  status: "pendente" | "pago" | "pronto";
  tipo?: "mesa" | "entrega" | null;
  mesa?: string | null;
  observacao?: string;
  endereco?: {
    nome: string;
    rua: string;
    bairro: string;
    referencia: string;
  };
  nome_cliente: string;
}

export class PedidosDB extends Dexie {
  pedidos!: Table<Pedido, number>;

  constructor() {
    super("PedidosDB");
    this.version(1).stores({
      pedidos: "++id, id_uuid, id_supabase, pedido, status, total, mesa, tipo, observacao, endereco, data, nome_cliente",
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

const db = new PedidosDB();
export default db;
