"use client";

import {
  Box,
  Flex,
  Heading,
  Text,

  Image,

} from "@chakra-ui/react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Hero() {


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
    
    </Box>
  );
}
