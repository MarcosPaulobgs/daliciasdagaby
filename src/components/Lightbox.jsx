"use client";

import { useEffect, useRef } from "react";
import styles from "./Lightbox.module.css";

// Modal simples de "foto expandida". Recebe a imagem clicada e mostra
// em tela cheia por cima de tudo (header, carrinho, whatsapp flutuante).
// Fecha clicando fora, no X, apertando Esc, ou no botão voltar do celular.
export default function Lightbox({ src, alt, title, description, onClose }) {
  // Guardamos onClose numa ref (em vez de deps do efeito) para o efeito
  // abaixo rodar só 1x por abertura. Antes, como o efeito dependia de
  // [onClose] -- uma função nova a cada render do componente pai -- ele
  // era refeito (cleanup + setup) sempre que o pai re-renderizava, e
  // também toda vez que o React StrictMode (modo dev) roda o efeito 2x.
  // Isso fazia o pushState/history.back() rodar em duplicidade e o
  // popstate assíncrono resultante acabava sendo pego pelo listener
  // "seguinte", fechando a foto sozinha logo após abrir.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Sobrevive às execuções duplicadas do efeito (StrictMode não desmonta
  // o componente, só roda o efeito 2x) para diferenciar um popstate
  // causado por nós mesmos (history.back() no cleanup) de um "voltar"
  // real do usuário.
  const ignorarProximoPopRef = useRef(false);

  useEffect(() => {
    // Trava o scroll do fundo enquanto o modal está aberto.
    const scrollAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Empurra uma entrada extra no histórico ao abrir. Assim, o botão
    // "voltar" do navegador/celular consome essa entrada (fechando a foto)
    // em vez de navegar para a página anterior ou sair do site.
    window.history.pushState({ lightbox: true }, "");

    const aoTeclar = (e) => {
      if (e.key === "Escape") onCloseRef.current();
    };

    const aoVoltar = () => {
      if (ignorarProximoPopRef.current) {
        // Esse popstate veio do nosso próprio history.back() (cleanup),
        // não de um "voltar" real do usuário. Ignora.
        ignorarProximoPopRef.current = false;
        return;
      }
      onCloseRef.current();
    };

    window.addEventListener("keydown", aoTeclar);
    window.addEventListener("popstate", aoVoltar);

    return () => {
      document.body.style.overflow = scrollAnterior;
      window.removeEventListener("keydown", aoTeclar);
      window.removeEventListener("popstate", aoVoltar);

      // Se o modal foi fechado por outro meio (X, clique fora, Esc) e não
      // pelo botão voltar, remove a entrada extra que empurramos, para não
      // deixar uma entrada "fantasma" no histórico do navegador.
      if (window.history.state?.lightbox) {
        ignorarProximoPopRef.current = true;
        window.history.back();
      }
    };
  }, []);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar imagem">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className={styles.frame} onClick={(e) => e.stopPropagation()}>
        <div className={styles.imgWrap}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className={styles.img} decoding="async" />
        </div>

        {(title || description) && (
          <div className={styles.caption}>
            {title && <h3>{title}</h3>}
            {description && <p>{description}</p>}
          </div>
        )}
      </div>
    </div>
  );
}