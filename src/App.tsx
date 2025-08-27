import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import ProductInfoSection from "./components/BurgerShopInfoSection/BurgerShopInfoSection.tsx";
import Footer from "./components/Footer/Footer";
import ScrollTop from "./components/ScrollTop/ScrollTop";
import ScrollToTopOnRouteChange from "./components/ScrollToTopOnRouteChange/ScrollToTopOnRouteChange";
import { useCart } from "../contexts/CartContext";
import { Routes, Route } from "react-router-dom"; // Adicionei para corrigir o erro de Routes
import Cart from "./components/Cart/Cart";
import PoliticaEPrivacidade from "./pages/PoliticasEPrivacidade";
import Checkout from "./pages/Checkout";
import MenuPage from "./components/MenuSection/Menupage.tsx";
import HorioAlert from "./components/HorarioAlert/HorarioAlert.tsx";
import AboutUs from "./pages/AboutUs.tsx";
export default function AppContent() {
  const { items, total, isCartOpen, openCart, closeCart } = useCart();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);



  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
      <Header
        onCartClick={openCart}
        cartItemCount={items.length}
      />

      <ScrollToTopOnRouteChange />
      <ScrollTop />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <main className="pt-20 flex flex-col">
              
                <HorioAlert />
                <Hero />
                <MenuPage />
               
                <ProductInfoSection />
              </main>
            </>
          }
        />
        <Route path="/Politicas" element={<PoliticaEPrivacidade />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>

      <Footer />

      <Cart isOpen={isCartOpen} onClose={closeCart} key={`${items.length}-${total.toFixed(2)}`} />
    </div>
  );
}