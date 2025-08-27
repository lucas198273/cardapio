import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const BurgerShopInfoSection: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const linkWhatsApp = `https://wa.me/5531990639998?text=${encodeURIComponent(
    "Olá! 😊 Gostaria de fazer um pedido ou tirar dúvidas sobre o cardápio."
  )}`;

  const cards = [
    {
      title: "Qualidade e Sabor",
      description:
        "Nossos hambúrgueres são preparados com ingredientes frescos e selecionados, garantindo sabor e qualidade em cada mordida.",
    },
    {
      title: "Pedidos e Atendimento",
      description:
        "Atendemos via WhatsApp e presencialmente, sempre com atenção e rapidez. Tire dúvidas, peça recomendações ou faça seu pedido direto pelo chat.",
      link: linkWhatsApp,
      linkText: "Peça pelo WhatsApp",
    },
  ];

  return (
    <section className="py-16 px-4 bg-[#0a0a1a] text-white" data-aos="fade-up">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-green-400 drop-shadow-md">
          Sobre Nossa Hamburgueria
        </h2>

        <p className="text-lg md:text-xl mb-6 text-gray-300 italic leading-relaxed">
          Na nossa hamburgueria, cada lanche é preparado com carinho. Valorizamos a
          qualidade, o sabor e a experiência do cliente, seja no atendimento presencial
          ou no pedido online.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8" data-aos="fade-up" data-aos-delay={200}>
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg shadow-lg border border-green-400 bg-white text-gray-900"
            >
              <h3 className="text-2xl font-semibold mb-4 text-green-600">{card.title}</h3>
              <p className="text-base text-gray-700">{card.description}</p>
              {card.link && (
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block px-6 py-3 rounded-lg font-semibold transition-colors bg-green-500 text-white hover:bg-green-600"
                >
                  {card.linkText}
                </a>
              )}
            </div>
          ))}
        </div>

        <p
          className="text-lg md:text-xl font-bold text-green-400"
          data-aos="fade-up"
          data-aos-delay={400}
        >
          Sabor e qualidade em cada mordida!
        </p>
      </div>
    </section>
  );
};

export default BurgerShopInfoSection;
