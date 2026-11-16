import { BrandMark } from "@/components/art/Dial";
import { site } from "@/config/site";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.brand}>
        <BrandMark className={styles.mark} />
        {site.brand} · {site.location}
      </p>
      <p>
        Sitio de ejemplos hecho con Next.js y GSAP.{" "}
        <a href={site.portfolioUrl}>Volver al portafolio</a>
      </p>
    </footer>
  );
}
