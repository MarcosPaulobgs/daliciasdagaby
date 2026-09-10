"use client";

import Link from "next/link";
import produtosData, { CATEGORIAS as categoriasNamed } from "@/data/produtos";
import { useCart } from "@/context/CartContext";
import CarrinhoDrawer from "@/components/CarrinhoDrawer";
import styles from "./pedido.module.css";

export default function PedidoClient() {
  const { adicionarItem, carrinho } = useCart();

  const listaCategorias = categoriasNamed || produtosData?.CATEGORIAS || [];

  const formatarPreco = (item) => {
    if (item.precoLabel) return item.precoLabel;
    if (item.preco !== null && item.preco !== undefined) {
      return Number(item.preco).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }
    return "Sob consulta";
  };

  const getQtdNoCarrinho = (id) => {
    const item = carrinho.find((i) => i.id === id);
    return item ? item.quantidade : 0;
  };

  return (
    <main className={styles.mainContainer}>
      <header className={styles.heroHeader}>
        <div className={styles.badge}>
          <svg className={styles.badgeIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span>Cardápio & Encomendas</span>
        </div>

        <h1 className={styles.title}>
          Escolha seus favoritos e{" "}
          <span className={styles.highlight}>monte seu pedido</span>
        </h1>

        <p className={styles.subtitle}>
          Adicione os produtos ao carrinho para enviar seu pedido completo pelo WhatsApp ou entre em contato diretamente para fazer sua encomenda.
        </p>
      </header>

      <div className={styles.contentContainer}>
        {listaCategorias.map((categoria) => {
          const itens = categoria.itens || categoria.produtos || [];

          return (
            <section key={categoria.id} className={styles.categorySection}>
              <div className={styles.categoryHeader}>
                <div>
                  <span className={styles.categoryEyebrow}>Delícias da Gaby</span>
                  <h2 className={styles.categoryTitle}>{categoria.nome}</h2>
                </div>

                <span className={styles.categoryCount}>
                  {itens.length} {itens.length === 1 ? "item" : "itens"}
                </span>
              </div>

              <div className={styles.categoryLine} />

              <div className={styles.productGrid}>
                {itens.map((item) => {
                  const qtd = getQtdNoCarrinho(item.id);

                  return (
                    <article key={item.id} className={`${styles.card} ${qtd > 0 ? styles.cardSelected : ""}`}>
                      <div className={styles.imageContainer}>
                        {item.imagem ? (
                          <img src={item.imagem} alt={item.nome} className={styles.productImg} loading="lazy" />
                        ) : (
                          <div className={styles.imagePlaceholder} aria-label="Imagem indisponível">
                            <svg className={styles.placeholderIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className={styles.placeholderText}>Foto em breve</span>
                          </div>
                        )}

                        <span className={`${styles.priceBadge} ${!item.preco && !item.precoLabel ? styles.priceBadgeConsulta : ""}`}>
                          {formatarPreco(item)}
                        </span>

                        {qtd > 0 && (
                          <span className={styles.selectedBadge}>✓ {qtd}</span>
                        )}
                      </div>

                      <div className={styles.cardContent}>
                        <h3 className={styles.cardTitle}>{item.nome}</h3>
                        {item.descricao && (
                          <p className={styles.cardDescription}>{item.descricao}</p>
                        )}
                      </div>

                      <div className={styles.cardFooter}>
                        <button
                          type="button"
                          className={`${styles.addCartBtn} ${qtd > 0 ? styles.addCartBtnActive : ""}`}
                          onClick={() => adicionarItem(item)}
                          aria-label={`Adicionar ${item.nome} ao carrinho`}
                        >
                          <svg className={styles.btnIconSvg} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                          </svg>
                          <span>Adicionar ao carrinho</span>
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}

        <div className={styles.bottomNavigation}>
          <Link href="/" className={styles.backLink}>
            <svg className={styles.backIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Voltar para a página inicial</span>
          </Link>
        </div>
      </div>

      <CarrinhoDrawer />
    </main>
  );
}