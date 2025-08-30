import db from "./db";

// Intervalo em milissegundos para limpeza semanal
const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

// Função para limpar pedidos do IndexedDB
export async function clearOldOrders() {
  try {
    await db.clearOrders(); // função existente no seu Dexie
    console.log("✅ Histórico de pedidos limpo com sucesso!");
  } catch (err) {
    console.error("Erro ao limpar o banco:", err);
  }
}

// Função para verificar a última limpeza e executar semanalmente
export function scheduleWeeklyCleanup() {
  const lastClear = localStorage.getItem("lastClear");
  const now = Date.now();

  if (!lastClear || now - Number(lastClear) > ONE_WEEK) {
    clearOldOrders();
    localStorage.setItem("lastClear", now.toString());
  }

  // Opcional: executar diariamente para garantir limpeza semanal
  setInterval(() => {
    const last = localStorage.getItem("lastClear");
    if (!last || Date.now() - Number(last) > ONE_WEEK) {
      clearOldOrders();
      localStorage.setItem("lastClear", Date.now().toString());
    }
  }, 24 * 60 * 60 * 1000); // verifica diariamente
}
