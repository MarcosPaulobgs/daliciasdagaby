"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import styles from "./Header.module.css";
import { linkWhatsApp } from "@/data/produtos";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // =========================================================
  // HEADER AO ROLAR A PÁGINA
  // =========================================================

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 20);
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // =========================================================
  // CONTROLE DO MENU MOBILE
  // =========================================================

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  // =========================================================
  // FUNÇÕES DO MENU
  // =========================================================

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // =========================================================
  // ROLAGEM PARA SEÇÕES
  // =========================================================

  const scrollToSection = (e, id) => {
    e.preventDefault();

    closeMenu();

    // Se estiver em outra página, volta para a Home
    // e guarda qual seção deve ser aberta.
    if (pathname !== "/") {
      sessionStorage.setItem("scrollToSection", id);
      router.push("/");
      return;
    }

    const element = document.getElementById(id);

    if (!element) {
      return;
    }

    const headerOffset = 90;

    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: Math.max(0, elementPosition - headerOffset),
      behavior: "smooth",
    });

    // Remove qualquer hash da URL
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );
  };

  // =========================================================
  // BOTÃO INÍCIO
  // =========================================================

  const scrollToHome = (e) => {
    e.preventDefault();

    closeMenu();

    // Se estiver em outra página, volta para a Home
    // e informa que deve ficar no topo.
    if (pathname !== "/") {
      sessionStorage.setItem("scrollToSection", "inicio");
      router.push("/");
      return;
    }

    // Já está na Home → rolagem suave até o topo
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Garante que não exista hash na URL
    window.history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search
    );
  };

  // =========================================================
  // APÓS VOLTAR PARA A HOME
  // =========================================================

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const sectionId = sessionStorage.getItem("scrollToSection");

    if (!sectionId) {
      return;
    }

    sessionStorage.removeItem("scrollToSection");

    const scrollToTarget = () => {
      // -----------------------------------------------------
      // INÍCIO
      // -----------------------------------------------------

      if (sectionId === "inicio") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        return;
      }

      // -----------------------------------------------------
      // OUTRAS SEÇÕES
      // -----------------------------------------------------

      const element = document.getElementById(sectionId);

      if (!element) {
        return;
      }

      const headerOffset = 90;

      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: Math.max(0, elementPosition - headerOffset),
        behavior: "smooth",
      });

      // Remove qualquer hash da URL
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search
      );
    };

    // Pequeno atraso para garantir que a Home
    // terminou de renderizar as seções.
    const timer = setTimeout(scrollToTarget, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <>
    <header
      className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""
        }`}
    >
      <div className={styles.headerInner}>
        {/* =====================================================
            LOGO / MARCA
        ====================================================== */}

        <Link
          href="/"
          className={styles.brand}
          onClick={scrollToHome}
        >
          <Image
            src="/img/logo.png"
            alt="Delícias da Gaby"
            width={96}
            height={96}
            quality={100}
            className={styles.logo}
            priority
          />

          <span className={styles.brandName}>
            Delícias da{" "}
            <span className={styles.brandHighlight}>Gaby</span>
          </span>
        </Link>

        {/* =====================================================
            NAVEGAÇÃO DESKTOP
        ====================================================== */}

        <nav className={styles.navDesktop}>
          {/* INÍCIO */}

          <Link
            href="/"
            className={styles.navLink}
            onClick={scrollToHome}
          >
            Início
          </Link>

          {/* NOVIDADES */}

          <Link
            href="#novidades"
            className={styles.navLink}
            onClick={(e) => scrollToSection(e, "novidades")}
          >
            Novidades
          </Link>

          {/* DESTAQUES */}

          <Link
            href="#destaques"
            className={styles.navLink}
            onClick={(e) => scrollToSection(e, "destaques")}
          >
            Destaques
          </Link>

          {/* SOBRE */}

          <Link
            href="#sobre"
            className={styles.navLink}
            onClick={(e) => scrollToSection(e, "sobre")}
          >
            Sobre
          </Link>

          {/* WHATSAPP */}

          <a
            href={linkWhatsApp(
              "Olá! Vim pelo site e gostaria de fazer uma encomenda."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnCta}
          >
            <svg
              className={styles.iconSvg}
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>

            Fazer Encomenda
          </a>
        </nav>

        {/* =====================================================
            BOTÃO MENU MOBILE
        ====================================================== */}

        <button
          type="button"
          className={`${styles.menuButton} ${isMenuOpen ? styles.menuButtonOpen : ""
            }`}
          onClick={toggleMenu}
          aria-label={
            isMenuOpen ? "Fechar menu" : "Abrir menu"
          }
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* =======================================================
          MENU MOBILE
      ======================================================== */}

      <div
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""
          }`}
      >
        <nav className={styles.mobileNav}>
          {/* INÍCIO */}

          <Link
            href="/"
            className={styles.mobileNavLink}
            onClick={scrollToHome}
          >
            Início
          </Link>

          {/* NOVIDADES */}

          <Link
            href="#novidades"
            className={styles.mobileNavLink}
            onClick={(e) =>
              scrollToSection(e, "novidades")
            }
          >
            Novidades
          </Link>

          {/* DESTAQUES */}

          <Link
            href="#destaques"
            className={styles.mobileNavLink}
            onClick={(e) =>
              scrollToSection(e, "destaques")
            }
          >
            Destaques
          </Link>

          {/* SOBRE */}

          <Link
            href="#sobre"
            className={styles.mobileNavLink}
            onClick={(e) =>
              scrollToSection(e, "sobre")
            }
          >
            Sobre
          </Link>

          {/* WHATSAPP */}

          <a
            href={linkWhatsApp(
              "Olá! Vim pelo site e gostaria de fazer uma encomenda."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mobileCta}
            onClick={closeMenu}
          >
            <svg
              className={styles.iconSvg}
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>

            Fazer Encomenda
          </a>
        </nav>
      </div>

    </header>

    {/* =======================================================
        OVERLAY DO MENU MOBILE (fora do <header> para o
        position: fixed cobrir a tela inteira no Chrome)
    ======================================================== */}

    {isMenuOpen && (
      <button
        type="button"
        className={styles.mobileOverlay}
        onClick={closeMenu}
        aria-label="Fechar menu"
      />
    )}
    </>
  );
}