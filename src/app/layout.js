import { CartProvider } from "@/context/CartContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://deliciasdagaby.vercel.app"),
  title: "Delícias da Gaby",
  description: "Bolos e doces artesanais",
  icons: {
    icon: "/favicon.ico", 
  },
  openGraph: {
    title: "Delícias da Gaby",
    description: "Bolos e doces artesanais em Santa Inês, BA. Peça pelo WhatsApp!",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Delícias da Gaby - Bolos e doces artesanais",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Delícias da Gaby",
    description: "Bolos e doces artesanais em Santa Inês, BA. Peça pelo WhatsApp!",
    images: ["/opengraph-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}