"use client";

import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Hero() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true, // anima apenas uma vez ao entrar na tela
    });
  }, []);

  return (
    <Box
      as="section"
      position="relative"
      w="full"
      h={{ base: "80vh", md: "90vh" }}
      _before={{
        content: `""`,
        position: "absolute",
        top: 0,
        left: 0,
        w: "full",
        h: "full",
        bgGradient: "linear(to-b, #0a0a1a, red.600)", // degradê verde esmeralda escuro para branco
        zIndex: 0,
      }} // linear(to-b, #0a0a1a, whiteAlpha.100)
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <Flex
        position="relative"
        zIndex={1}
        direction={{ base: "column-reverse", md: "row" }}
        maxW="6xl"
        w="full"
        align="center"
        justify="space-between"
        px={6}
        textAlign={{ base: "center", md: "left" }}
      >
        {/* Texto */}
        <Box
          mb={{ base: 8, md: 0 }}
          data-aos="fade-right"
        >
          <Heading
            as="h1"
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="bold"
            color="white"
            mb={4}
          >
            Peça seu hambúrguer favorito
          </Heading>
          <Text fontSize={{ base: "md", md: "xl" }} color="whiteAlpha.800" mb={6}>
            Delivery rápido, saboroso e feito com ingredientes frescos.
          </Text>
          <Button
            onClick={onOpen}
            bg="green.500"
            color="white"
            _hover={{ bg: "green.600" }}
            size="lg"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            Ver Cardápio
          </Button>
        </Box>

        {/* Imagem lateral */}
        <Box
          display={{ base: "block", md: "block" }}
          mb={{ base: 6, md: 0, mt: 8 }}
          data-aos="fade-left"
        >
          <Image
            src="/himgs/image.png" // ajuste do caminho da imagem
            alt="Hambúrguer suculento"
            borderRadius="xl"
            shadow="2xl"
            maxH={{ base: "250px", md: "400px" }}
            objectFit="cover"
            mx="auto"
          />
        </Box>
      </Flex>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cardápio</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text fontSize="md" mb={3}>
              Aqui você pode colocar o link do seu cardápio online, um formulário para pedidos ou qualquer ação que quiser.
            </Text>
            <Button
              as="a"
              href="https://wa.me/5531999999999"
              target="_blank"
              w="full"
              bg="green.500"
              color="white"
              _hover={{ bg: "green.600" }}
            >
              Pedir via WhatsApp
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
