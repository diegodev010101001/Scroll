import Link from "next/link";
import { BrandMark } from "@/components/art/Dial";
import { site } from "@/config/site";
import styles from "./Header.module.css";

/** Header mínimo y fijo: logo + regreso al portafolio principal. */
export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.pill} aria-label={`${site.brand}: inicio de los ejemplos`}>
        <BrandMark className={styles.mark} />
        <span className={styles.brand}>{site.brand}</span>
      </Link>

      <a href={site.portfolioUrl} className={`${styles.pill} ${styles.back}`}>
        <span aria-hidden="true">←</span>
        Volver al portafolio
      </a>
    </header>
  );
}
