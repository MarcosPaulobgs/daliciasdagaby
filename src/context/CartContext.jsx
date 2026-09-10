"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    const salvo = localStorage.getItem("delicias_carrinho");
    if (salvo) {
      try {
        setCarrinho(JSON.parse(salvo));
      } catch (e) {
        console.error("Erro ao carregar carrinho local", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("delicias_carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  const adicionarItem = (produto) => {
    setCarrinho((prev) => {
      const existe = prev.find((i) => i.id === produto.id);
      if (existe) {
        return prev.map((i) =>
          i.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  const removerItem = (id) => {
    setCarrinho((prev) => prev.filter((i) => i.id !== id));
  };

  const atualizarQuantidade = (id, delta) => {
    setCarrinho((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const novaQtd = i.quantidade + delta;
            return novaQtd > 0 ? { ...i, quantidade: novaQtd } : null;
          }
          return i;
        })
        .filter(Boolean)
    );
  };

  const limparCarrinho = () => setCarrinho([]);

  const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);

  const valorTotal = carrinho.reduce((acc, item) => {
    if (typeof item.preco === "number") {
      return acc + item.preco * item.quantidade;
    }
    return acc;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        carrinho,
        adicionarItem,
        removerItem,
        atualizarQuantidade,
        limparCarrinho,
        totalItens,
        valorTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);