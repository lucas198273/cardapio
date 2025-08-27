import { Box, Grid, Image, Text, Heading, Button, Stack } from '@chakra-ui/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { useCart } from '../../../contexts/CartContext';
import { type CartItem } from '../../types/CartItem';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { type Product } from '../../data/Product';

interface Props {
  title: string;
  items: Product[];
}

const MenuSection: React.FC<Props> = ({ title, items }) => {
  const { addItem } = useCart();

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const handleAddItem = (product: Product) => {
    const isBurger = product.category === 'hamburguer';
    const item: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price!,
      imageUrl: product.imageUrl,
      quantity: 1,
      isCombo: false,
      comboQuantity: 0,
      isBurger,
    };
    addItem(item, isBurger);

    toast.success(`${product.name} adicionado ao carrinho!`, {
      position: 'top-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: 'colored',
    });
  };

  if (items.length === 0) {
    return (
      <Heading as="h3" size="md" textAlign="center" color="gray.500" mt={10}>
        Nenhum item encontrado 😢
      </Heading>
    );
  }

  return (
    <Box py={8} px={4} maxW="7xl" mx="auto">
      <Heading as="h2" size="xl" textAlign="center" mb={6} color="teal.400">
        {title}
      </Heading>
      <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={6}>
        {items.map((product) => (
          <Box
            key={product.id}
            bg="white"
            shadow="md"
            borderRadius="lg"
            overflow="hidden"
            data-aos="fade-up"
          >
            <Image src={product.imageUrl} alt={product.name} h="48" w="full" objectFit="cover" />
            <Stack p={4} spacing={2}>
              <Text fontWeight="bold" fontSize="lg" color="teal.600">
                {product.name}
              </Text>
              {product.description && (
                <Text fontSize="sm" color="gray.600">
                  {product.description}
                </Text>
              )}
              <Stack direction="row" justify="space-between" align="center" mt={2}>
                <Text fontWeight="bold" fontSize="lg" color="green.500">
                  {product.price?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </Text>
                <Button
                  size="sm"
                  colorScheme="teal"
                  onClick={() => handleAddItem(product)}
                  aria-label={`Adicionar ${product.name} ao carrinho`}
                >
                  Adicionar
                </Button>
              </Stack>
            </Stack>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default MenuSection;
