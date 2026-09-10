import PedidoClient from "./PedidoClient";

export const metadata = {
  title: "Cardápio | Delícias da Gaby",
  description:
    "Bolos, sobremesas e salgados da Delícias da Gaby — monte seu pedido e envie pelo WhatsApp.",
};

export default function PedidoPage() {
  return <PedidoClient />;
}