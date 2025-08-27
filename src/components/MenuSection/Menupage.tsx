import { useState } from "react";
import { Box, Container, Heading, Input, Stack, Button } from "@chakra-ui/react";
import { products as allProducts, type Product } from "../../data/Product";
import MenuSection from "./MenuSection";

const categories: { key: Product["category"] | "all"; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "artesanal", label: "Artesanal" },
  { key: "hamburguer", label: "Hambúrguer" },
  { key: "bebida", label: "Bebidas" },
  { key: "porcao", label: "Porções" },
];

export default function MenuPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | Product["category"]>("all");

  const filteredProducts = allProducts.filter((product) => {
    const matchQuery =
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description?.toLowerCase().includes(query.toLowerCase());
    const matchCategory = activeCategory === "all" || product.category === activeCategory;
    return matchQuery && matchCategory;
  });

  return (
    <Box py={8}>
      <Container maxW="7xl">
        <Stack spacing={6}>
          <Heading as="h1" size="xl" textAlign="center" color="teal.500">
            Cardápio
          </Heading>

          <Input
            placeholder="Buscar no cardápio..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            size="lg"
            borderRadius="full"
            bg="white"
            shadow="sm"
            _focus={{ shadow: "md", borderColor: "teal.400" }}
          />

          <Stack direction="row" justify="center" wrap="wrap" spacing={3}>
            {categories.map((cat) => (
              <Button
                key={cat.key}
                size="sm"
                colorScheme={activeCategory === cat.key ? "teal" : "gray"}
                onClick={() => setActiveCategory(cat.key)}
                borderRadius="full"
              >
                {cat.label}
              </Button>
            ))}
          </Stack>
        </Stack>

        <Box mt={10}>
          <MenuSection
            title={
              activeCategory === "all"
                ? "Todos os itens"
                : categories.find((c) => c.key === activeCategory)?.label || "Resultados"
            }
            items={filteredProducts}
          />
        </Box>
      </Container>
    </Box>
  );
}
