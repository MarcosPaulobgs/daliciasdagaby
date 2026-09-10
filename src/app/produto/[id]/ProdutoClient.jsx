"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function ProdutoClient({ produto }) {
  const { adicionarItem } = useCart();

  const formatarPreco = (item) => {
    if (item.precoLabel) return item.precoLabel;
    if (item.preco !== null && item.preco !== undefined) return `R$ ${item.preco}`;
    return "Sob consulta";
  };

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <Link href="/pedido">← Voltar ao cardápio</Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <div>
          {produto.imagem ? (
            <img src={produto.imagem} alt={produto.nome} className="w-full rounded-lg" />
          ) : (
            <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
              <span>Sem foto disponível</span>
            </div>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-bold">{produto.nome}</h1>
          <p className="text-xl font-semibold text-emerald-600 my-2">{formatarPreco(produto)}</p>
          <p className="text-gray-600 mb-6">{produto.descricao}</p>

          <button
            onClick={() => adicionarItem(produto)}
            className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition"
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </main>
  );
}