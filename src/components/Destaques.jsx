"use client";

import { useState } from "react";
import Link from "next/link";

import { PRODUTOS } from "@/data/produtos";
import Lightbox from "@/components/Lightbox";

import styles from "./Destaques.module.css";

export default function Destaques() {
  const [imagemExpandida, setImagemExpandida] = useState(null);

  // Filtra apenas produtos marcados como destaque
  // que possuem imagem cadastrada
  const itensDestaque =
    PRODUTOS?.filter(
      (p) => p.destaque && Boolean(p.imagem)
    ) || [];

  const formatarPreco = (item) => {
    if (item.precoLabel) return item.precoLabel;

    if (
      item.preco !== null &&
      item.preco !== undefined
    ) {
      return `R$ ${item.preco}`;
    }

    return "Sob consulta";
  };

  return (
    <section
      id="destaques"
      className={styles.section}
    >
      <div className={styles.container}>

        <div className={styles.header}>
          <span className={styles.badge}>
            ★ Seleção Especial
          </span>

          <h2 className={styles.titulo}>
            Os Queridinhos
          </h2>

          <p className={styles.subtitulo}>
            Feitos com carinho especialmente para você.
          </p>
        </div>

        {/* CARROSSEL NO MOBILE / GRID NO DESKTOP */}
        <div className={styles.grid}>
          {itensDestaque.map((item) => (
            <article
              key={item.id}
              className={styles.card}
            >
              {/* FOTO DO PRODUTO */}
              <div
                className={styles.imageContainer}
                onClick={() =>
                  setImagemExpandida(item)
                }
                title="Clique para ampliar a foto"
              >
                <img
                  src={item.imagem}
                  alt={item.nome}
                  className={styles.productImg}
                />

                <span
                  className={styles.destaqueBadge}
                >
                  ★ Queridinho
                </span>
              </div>

              {/* CONTEÚDO */}
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>
                    {item.nome}
                  </h3>

                  <span
                    className={styles.cardPrice}
                  >
                    {formatarPreco(item)}
                  </span>
                </div>

                <p
                  className={
                    styles.cardDescription
                  }
                >
                  {item.descricao}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* BOTÃO VER CARDÁPIO */}
        <div className={styles.footer}>
          <Link
            href="/pedido"
            className={styles.verCardapioBtn}
          >
            Ver Cardápio Completo
          </Link>
        </div>
      </div>

      {/* LIGHTBOX */}
      {imagemExpandida && (
        <Lightbox
          src={imagemExpandida.imagem}
          alt={imagemExpandida.nome}
          title={imagemExpandida.nome}
          description={imagemExpandida.descricao}
          onClose={() =>
            setImagemExpandida(null)
          }
        />
      )}
    </section>
  );
}