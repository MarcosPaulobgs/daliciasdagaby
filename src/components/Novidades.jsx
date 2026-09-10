"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Novidades.module.css";
import { linkWhatsApp } from "@/data/produtos";
import Lightbox from "./Lightbox";

const FOTOS = [
  {
    src: "/img/novidades/batata-recheada-1.jpg",
    alt: "Batata Recheada da Delícias da Gaby, gratinada e finalizada com salsinha",
  },
  {
    src: "/img/novidades/batata-recheada-2.jpg",
    alt: "Batata Recheada da Delícias da Gaby com batata palha crocante por cima",
  },
];

export default function Novidades() {
  const [selecionada, setSelecionada] = useState(null);

  return (
    <section id="novidades" className={styles.section}>
      <div className={styles.head}>
        <span className={styles.eyebrow}>Chegou na casa</span>
        <h2 className={styles.title}>Novidades</h2>
        <p className={styles.intro}>
          Batata Recheada gratinada na hora, com creme especial, batata
          palha crocante por cima e aquele toque de sabor que só a Gaby
          sabe fazer.
        </p>
      </div>

      <div className={styles.gallery}>
        {FOTOS.map((foto) => (
          <div
            key={foto.src}
            className={styles.imgWrap}
            onClick={(e) => {
              setSelecionada(foto);
              e.currentTarget.blur();
            }}
            role="button"
            tabIndex={0}
            aria-label="Ampliar foto da Batata Recheada"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelecionada(foto);
              }
            }}
          >
            <Image
              src={foto.src}
              alt={foto.alt}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className={styles.img}
            />
            <span className={styles.expandIcon} aria-hidden="true">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4" />
              </svg>
            </span>
          </div>
        ))}
      </div>

      <div className={styles.ctaWrap}>
        <a
          href={linkWhatsApp("Olá! Vi a novidade da Batata Recheada no site e quero pedir.")}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          <svg className={styles.ctaIcon} fill="currentColor" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
          </svg>
          <span>Pedir Batata Recheada</span>
        </a>
      </div>

      {selecionada && (
        <Lightbox
          src={selecionada.src}
          alt={selecionada.alt}
          onClose={() => setSelecionada(null)}
        />
      )}
    </section>
  );
}