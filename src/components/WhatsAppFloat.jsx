import styles from "./WhatsAppFloat.module.css";
import { linkWhatsApp } from "@/data/produtos";

export default function WhatsAppFloat({ mensagem }) {
  return (
    <a
      className={styles.float}
      href={linkWhatsApp(mensagem || "Olá! Vim pelo site e gostaria de fazer uma encomenda.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pedir pelo WhatsApp"
    >
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.06-1.33A10 10 0 1 0 12 2Zm0 18.2a8.16 8.16 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31A8.2 8.2 0 1 1 12 20.2Zm4.5-6.13c-.24-.12-1.44-.71-1.66-.79s-.38-.12-.55.12-.63.79-.78.95-.28.18-.53.06a6.7 6.7 0 0 1-1.98-1.22 7.4 7.4 0 0 1-1.37-1.7c-.14-.24 0-.37.11-.5s.24-.28.36-.42a1.6 1.6 0 0 0 .24-.4.44.44 0 0 0 0-.42c-.06-.12-.55-1.33-.76-1.82s-.4-.42-.55-.42h-.47a.9.9 0 0 0-.66.31 2.75 2.75 0 0 0-.86 2 4.8 4.8 0 0 0 1 2.53 10.9 10.9 0 0 0 4.2 3.72c.59.25 1.05.4 1.41.51a3.4 3.4 0 0 0 1.55.1 2.54 2.54 0 0 0 1.67-1.17 2.06 2.06 0 0 0 .14-1.17c-.06-.1-.22-.16-.46-.28Z" />
      </svg>
    </a>
  );
}
