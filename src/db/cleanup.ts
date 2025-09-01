import db from "./db";

/**
 * Limpa TODOS os pedidos do IndexedDB
 */
export async function clearAllOrders() {
  try {
    await db.clearOrders(); // Corrigido de clearOrders para clearPedidos
    console.log("✅ Histórico de pedidos (IndexedDB) limpo com sucesso!");
  } catch (err) {
    console.error("❌ Erro ao limpar pedidos:", err);
  }
}

/**
 * Agenda a limpeza diária em um horário fixo
 * @param hour Hora do dia (0–23)
 * @param minute Minuto (0–59)
 */
export function scheduleCleanupAt(hour: number, minute: number) {
  // Validação de entrada
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    console.error("⏰ Horário inválido! Use valores entre 0-23 para hora e 0-59 para minuto.");
    return;
  }

  const now = new Date();
  const lastClear = localStorage.getItem("lastClear");
  const today = now.toDateString();

  // Validar lastClear e comparar com hoje
  if (lastClear === today) {
    console.log("ℹ️ Limpeza já realizada hoje.");
    return;
  }

  // Criar horário alvo para hoje ou amanhã se já passou
  let target = new Date(now);
  target.setHours(hour, minute, 0, 0);

  if (now > target) {
    target.setDate(target.getDate() + 1); // Move pra amanhã se já passou
  }

  // Calcular delay
  const delay = target.getTime() - now.getTime();
  console.log(`⏳ Limpeza agendada para: ${target.toLocaleString("pt-BR")}`);

  // Agendar a limpeza
  setTimeout(() => {
    clearAllOrders() // Não usa await aqui, pois setTimeout não suporta
      .then(() => {
        localStorage.setItem("lastClear", new Date().toDateString());
        // Reagendar pra próxima ocorrência (amanhã no mesmo horário)
        scheduleCleanupAt(hour, minute);
      })
      .catch((err) => {
        console.error("❌ Erro na limpeza agendada:", err);
        // Tenta reagendar mesmo em caso de erro pra não quebrar o ciclo
        scheduleCleanupAt(hour, minute);
      });
  }, delay);
}