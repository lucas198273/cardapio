import { supabase } from "../../lib/supabaseClient";
import { type Order } from "../../data/orders";
import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  Badge,
  useColorModeValue,
} from "@chakra-ui/react";

interface Props {
  order: Order;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export default function OrderCard({ order, setOrders }: Props) {
  const updateStatus = async (status: "pendente" | "pago" | "pronto") => {
    try {
      const { error } = await supabase
        .from("pedidos")
        .update({ status })
        .eq("id", order.id);

      if (error) {
        console.error("Erro ao atualizar status:", error.message);
        return;
      }

      setOrders((prev) =>
        prev.map((o) =>
          o.id === order.id
            ? { ...o, status, data: o.data || new Date().toISOString() }
            : o
        )
      );
      console.log("Status atualizado com sucesso para:", status);
    } catch (err) {
      console.error("Erro inesperado:", err);
    }
  };

  const cardBg = useColorModeValue("white", "gray.700");
  const cardBorderColor = useColorModeValue("gray.200", "gray.600");
  const statusColor =
    order.status === "pendente"
      ? "yellow"
      : order.status === "pago"
      ? "green"
      : "blue";

  // Função para formatar a data corretamente
  const formatDate = (dateStr: string) => {
    if (!dateStr || dateStr === "Data inválida" || dateStr === "Data não disponível") {
      return "Data não disponível";
    }
    const [day, month, yearTime] = dateStr.split("/");
    if (!yearTime) return dateStr; // Retorna o original se não puder parsear
    const [year, time] = yearTime.split(", ");
    const [hours, minutes, seconds] = time.split(":");
    const date = new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`);
    return !isNaN(date.getTime())
      ? date.toLocaleString("pt-BR", { hour12: false, timeZone: "America/Sao_Paulo" })
      : "Data inválida";
  };

  return (
    <Box
      bg={cardBg}
      border="1px solid"
      borderColor={cardBorderColor}
      borderRadius="lg"
      p="6"
      boxShadow="md"
      transition="all 0.2s"
      _hover={{ boxShadow: "lg", transform: "translateY(-2px)" }}
    >
      <Stack spacing="4">
        <Heading as="h3" size="md" color="teal.600">
          {`Pedido #${order.id}`}
        </Heading>
        <Text>
          <strong>Itens:</strong>{" "}
          {order.pedido
            ? order.pedido.map((item: any) => `${item.name} x${item.quantity}`).join(", ")
            : "Nenhum item"}
        </Text>
        <Text>
          <strong>Total:</strong> R${order.total?.toFixed(2) || "0.00"}
        </Text>
        <Badge colorScheme={statusColor} p="2" borderRadius="md">
          Status: {order.status || "pendente"}
        </Badge>
        <Text fontSize="sm" color="gray.500">
          <strong>Criado em:</strong> {formatDate(order.data)}
        </Text>
        <Stack direction="row" spacing="2" mt="4">
          <Button
            size="sm"
            colorScheme="yellow"
            onClick={() => updateStatus("pendente")}
            isDisabled={order.status === "pendente"}
          >
            Pendente
          </Button>
          <Button
            size="sm"
            colorScheme="green"
            onClick={() => updateStatus("pago")}
            isDisabled={order.status === "pago"}
          >
            Pago
          </Button>
          <Button
            size="sm"
            colorScheme="blue"
            onClick={() => updateStatus("pronto")}
            isDisabled={order.status === "pronto"}
          >
            Pronto
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}