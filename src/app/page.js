import Hero from "@/components/Hero";
import Novidades from "@/components/Novidades";
import Destaques from "@/components/Destaques";
import Sobre from "@/components/Sobre";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata = {
  title: "Delícias da Gaby | Bolos, Doces e Salgados Caseiros",
  description:
    "Cardápio exclusivo de bolos, doces finos, sobremesas e salgados. Faça sua encomenda online com entrega rápida.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <div className="scalloped-edge" />
      <Novidades />
      <Destaques />
      <Sobre />
      <WhatsAppFloat />
    </>
  );
}