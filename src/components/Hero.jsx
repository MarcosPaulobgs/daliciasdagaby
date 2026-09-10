"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Hero.module.css";

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.heroSection}>
      <div className={styles.videoWrap}>
        <video
          ref={videoRef}
          className={styles.video}
          autoPlay
          muted
          loop
          playsInline
          poster="/img/videohero_00-00-00.webp"
        >
          <source src="/videos/videohero.webm" type="video/webm" />
        </video>
        <div className={styles.overlay} />
      </div>

      <div className={styles.content}>
        <div className={styles.badge}>
          <svg className={styles.badgeIcon} fill="currentColor" viewBox="0 0 20 20">
            <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
          </svg>
          <span>Confeitaria Artesanal em Santa Inês</span>
        </div>

        <h1 className={styles.title}>
          Bolos, Doces & <span className={styles.highlight}>Empadões</span> feitos com amor
        </h1>

        <p className={styles.subtitle}>
          Bolos decorados, copos da felicidade, cestas especiais e empadões sob encomenda.
          O toque doce que o seu momento merece.
        </p>

        <div className={styles.actions}>
          <Link href="/pedido" className={styles.primaryBtn}>
            <span>Fazer Pedido</span>
            <svg className={styles.btnIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </Link>
        </div>

        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>100%</span>
            <span className={styles.statLabel}>Artesanal</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNumber}>Sob Encomenda</span>
            <span className={styles.statLabel}>Bolos & Cestas</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNumber}>Santa Inês</span>
            <span className={styles.statLabel}>e Região</span>
          </div>
        </div>
      </div>
    </section>
  );
}