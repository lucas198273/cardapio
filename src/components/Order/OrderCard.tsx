import { type Order } from "../../data/orders";
import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  Badge,
  useColorModeValue,
  useToast,
  ScaleFade,
} from "@chakra-ui/react";
import { useState } from "react";
import { updatePedidoStatus } from "../../data/updatePedidoStatus";

interface Props {
  order: Order;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export default function OrderCard({ order, setOrders }: Props) {
  const [updating, setUpdating] = useState(false);
  const toast = useToast();

  const handleStatusChange = async (status: "pendente" | "pago" | "pronto") => {
    setUpdating(true);
    try {
      await updatePedidoStatus(Number(order.id)!, status);

      setOrders(prev =>
        prev.map(o =>
          o.id === order.id ? { ...o, status, data: o.data || new Date().toISOString() } : o
        )
      );

      toast({
        title: "Status atualizado",
        description: `Pedido de ${order.nome_cliente || "Cliente"} agora está ${status}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setUpdating(false);
    }
  };

  const cardBg = useColorModeValue("white", "gray.700");
  const cardBorderColor = useColorModeValue("gray.200", "gray.600");
  const statusColor =
    order.status === "pendente" ? "yellow" : order.status === "pago" ? "green" : "blue";

  const formatDate = (dateStr: string) => {
    if (!dateStr || dateStr === "Data inválida" || dateStr === "Data não disponível") {
      return "Data não disponível";
    }
    const date = new Date(dateStr);
    return !isNaN(date.getTime())
      ? date.toLocaleString("pt-BR", { hour12: false, timeZone: "America/Sao_Paulo" })
      : "Data inválida";
  };

  return (
    <ScaleFade initialScale={0.95} in={!updating}>
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
        <Stack spacing="3">
          <Heading as="h3" size="md" color="teal.600">
            {`Pedido #${order.id}`}
          </Heading>

          <Text>
            <strong>Cliente:</strong> {order.nome_cliente || "Não informado"}
          </Text>

          <Text>
            <strong>Itens:</strong>{" "}
            {order.pedido?.map(item => `${item.name} x${item.quantity}`).join(", ") || "Nenhum item"}
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

          <Stack direction="row" spacing="2" mt="2">
            <Button
              size="sm"
              colorScheme="yellow"
              onClick={() => handleStatusChange("pendente")}
              isDisabled={order.status === "pendente" || updating}
            >
              Pendente
            </Button>
            <Button
              size="sm"
              colorScheme="green"
              onClick={() => handleStatusChange("pago")}
              isDisabled={order.status === "pago" || updating}
            >
              Pago
            </Button>
            <Button
              size="sm"
              colorScheme="blue"
              onClick={() => handleStatusChange("pronto")}
              isDisabled={order.status === "pronto" || updating}
            >
              Pronto
            </Button>
          </Stack>
        </Stack>
      </Box>
    </ScaleFade>
  );
}
