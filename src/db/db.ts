import Dexie, { type Table } from "dexie";

interface PedidoItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Pedido {
  id?: number; // Dexie auto incrementa
  id_uuid: string; // UUID do pedido
  pedido: PedidoItem[];
  total: number;
  data: Date;
  status: string;
  tipo?: "mesa" | "entrega" | null;
  mesa?: string | null;
  observacao?: string;
  endereco?: {
    nome: string;
    rua: string;
    bairro: string;
    referencia: string;
  };
}

export class PedidosDB extends Dexie {
  pedidos!: Table<Pedido>;

  constructor() {
    super("PedidosDB");
    this.version(1).stores({
      pedidos: "++id, id_uuid, pedido, status, total, mesa, tipo, observacao, endereco, data",
    });
  }

  async savePedido(pedidoData: Pedido): Promise<number> {
    return await this.pedidos.add(pedidoData);
  }

  async getPedidos(): Promise<Pedido[]> {
    return await this.pedidos.toArray();
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
