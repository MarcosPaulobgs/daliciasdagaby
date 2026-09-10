"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { WHATSAPP_NUMERO } from "@/data/produtos";
import styles from "./carrinho.module.css";

export default function CarrinhoDrawer() {
  const [aberto, setAberto] = useState(false);
  const { carrinho, removerItem, atualizarQuantidade, limparCarrinho, totalItens, valorTotal } = useCart();

  // Trava o scroll do fundo da página enquanto o carrinho está aberto.
  // Sem isso, ao arrastar o dedo dentro da lista de itens e chegar no
  // fim dela, o gesto "vazava" pro scroll da página por trás, causando
  // aquele pulo/travada estranha no celular.
  useEffect(() => {
    if (aberto) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [aberto]);

  const gerarMensagemWhatsApp = () => {
    let texto = "*Novo Pedido - Delícias da Gaby*\n\n";
    carrinho.forEach((item) => {
      texto += `• ${item.quantidade}x *${item.nome}*\n`;
    });
    texto += "\nGostaria de confirmar a disponibilidade e data de entrega!";
    return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
  };

  return (
    <>
      <button className={styles.fabButton} onClick={() => setAberto(true)} aria-label="Ver Carrinho">
        <svg className={styles.fabIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        {totalItens > 0 && <span className={styles.badgeCount}>{totalItens}</span>}
      </button>

      {aberto && (
        <div className={styles.overlay} onClick={() => setAberto(false)}>
          <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
            <div className={styles.drawerHeader}>
              <div className={styles.titleWrapper}>
                <svg className={styles.headerIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <h2>Seu Pedido</h2>
              </div>
              <button className={styles.closeBtn} onClick={() => setAberto(false)} aria-label="Fechar">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className={styles.drawerBody}>
              {carrinho.length === 0 ? (
                <div className={styles.emptyState}>
                  <svg className={styles.emptyIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>
                  <p>Seu carrinho está vazio no momento.</p>
                </div>
              ) : (
                <ul className={styles.itemList}>
                  {carrinho.map((item) => (
                    <li key={item.id} className={styles.item}>
                      <div className={styles.itemInfo}>
                        <span className={styles.itemName}>{item.nome}</span>
                        <span className={styles.itemPrice}>
                          {item.preco ? `R$ ${(item.preco * item.quantidade).toFixed(2)}` : "Sob consulta"}
                        </span>
                      </div>
                      <div className={styles.itemControls}>
                        <div className={styles.qtyBox}>
                          <button onClick={() => atualizarQuantidade(item.id, -1)}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                            </svg>
                          </button>
                          <span>{item.quantidade}</span>
                          <button onClick={() => atualizarQuantidade(item.id, 1)}>
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                        <button className={styles.removeBtn} onClick={() => removerItem(item.id)} title="Remover item">
                          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {carrinho.length > 0 && (
              <div className={styles.drawerFooter}>
                <div className={styles.totalRow}>
                  <span>Total estimado</span>
                  <strong>{valorTotal > 0 ? `R$ ${valorTotal.toFixed(2)}` : "Sob consulta"}</strong>
                </div>

                <a href={gerarMensagemWhatsApp()} target="_blank" rel="noopener noreferrer" className={styles.checkoutBtn}>
                  <span>Enviar Pedido pelo WhatsApp</span>
                  <svg className={styles.btnIcon} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                  </svg>
                </a>

                <button className={styles.clearBtn} onClick={limparCarrinho}>
                  Limpar carrinho
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}