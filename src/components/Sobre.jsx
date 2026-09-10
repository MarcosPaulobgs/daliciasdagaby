import Image from "next/image";
import styles from "./Sobre.module.css";

export default function Sobre() {
  return (
    <section id="sobre" className={styles.sobre}>
      <div className={styles.inner}>
        <div className={styles.foto}>
          <Image
            src="/img/gaby.webp"
            alt="Gaby, da Delícias da Gaby"
            width={420}
            height={420}
            className={styles.fotoImg}
          />
        </div>

        <div className={styles.texto}>
          <h2 className={styles.title}>Quem faz</h2>
          <p className={styles.text}>
            Gaby é técnica em alimentos pelo IFSI e transformou o gosto por
            confeitaria em uma confeitaria de verdade, em Santa Inês. Cada
            encomenda é combinada direto com ela, sem intermediário — do
            sabor ao tamanho, do jeitinho que o cliente pedir.
          </p>
          <ul className={styles.tags}>
            <li>Técnica em alimentos · IFSI</li>
            <li>Encomendas sob pedido</li>
            <li>Atendimento por WhatsApp e Instagram</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
