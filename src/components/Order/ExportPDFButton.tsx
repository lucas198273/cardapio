import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Order {
  id: string;
  customer_name: string;
  items: string;
  total: number;
  created_at: string;
}

interface Props {
  orders: Order[];
}

export default function ExportPDFButton({ orders }: Props) {
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Relatório de Pedidos", 14, 20);

    autoTable(doc, {
      head: [["Cliente", "Itens", "Total", "Data"]],
      body: orders.map((order) => [
        order.customer_name,
        order.items,
        `R$ ${order.total.toFixed(2)}`,
        new Date(order.created_at).toLocaleString("pt-BR", {
          timeZone: "America/Sao_Paulo",
        }),
      ]),
    });

    doc.save("pedidos.pdf");
  };

  return (
    <button
      onClick={exportPDF}
      className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg shadow"
    >
      Exportar PDF
    </button>
  );
}
