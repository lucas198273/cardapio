import { openDB } from 'idb';

// Definição da interface para um item do pedido
interface PedidoItem {
  name: string;
  quantity: number;
  price: number;
}

// Definição da interface para um pedido completo
interface Pedido {
  id?: number; // Opcional, pois é gerado automaticamente
  userId: string;
  pedido: PedidoItem[];
  total: number;
  data: Date;
  status: string;
  tipo?: 'mesa' | 'entrega';
  mesa?: string | null;
  observacao?: string;
  endereco?: {
    nome: string;
    rua: string;
    bairro: string;
    referencia: string;
  };
}

const dbPromise = openDB('pedidosDB', 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('pedidos')) {
      const store = db.createObjectStore('pedidos', { keyPath: 'id', autoIncrement: true });
      store.createIndex('userId', 'userId', { unique: false });
    }
  },
});

export const savePedido = async (pedidoData: Pedido): Promise<void> => {
  const db = await dbPromise;
  await db.add('pedidos', pedidoData);
  console.log('Pedido salvo:', pedidoData);
};

export const getPedidos = async (userId: string = 'cliente123'): Promise<Pedido[]> => {
  const db = await dbPromise;
  const tx = db.transaction('pedidos', 'readonly');
  const store = tx.objectStore('pedidos');
  const index = store.index('userId');
  return await index.getAll(userId);
};

export const clearPedidos = async (): Promise<void> => {
  const db = await dbPromise;
  await db.clear('pedidos');
};

export const deletePedido = async (id: number): Promise<void> => {
  const db = await dbPromise;
  await db.delete('pedidos', id);
};