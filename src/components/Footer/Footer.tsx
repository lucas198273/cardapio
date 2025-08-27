import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a1a] text-white py-8 px-4 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <h2 className="text-xl font-bold mb-4 md:mb-0 drop-shadow-md text-green-400">
          The Brothers Hamburgueria
        </h2>

        <div className="flex space-x-6 text-2xl">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/thebrothersbetim/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-200 transition-colors duration-300"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/5531990639998"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-200 transition-colors duration-300"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>

      <div className="text-center text-sm mt-6 text-white/70">
        © {new Date().getFullYear()}{" "}
        <span className="text-green-400">The Brothers Hamburgueria</span>. Todos os direitos reservados.
      </div>
    </footer>
  );
}
