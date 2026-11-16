import type { Metadata } from "next";
import Link from "next/link";
import { IconArrow, IconArrowLeft } from "@/components/art/icons";
import PlateArt from "@/components/art/PlateArt";
import { site } from "@/config/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Ejemplo de restaurante (próximamente)",
  description:
    "Muy pronto: un ejemplo navegable de sitio web para restaurante, con menú, reservaciones y pedidos.",
  alternates: { canonical: "/restaurante" },
  robots: { index: false, follow: true },
};

/** Placeholder: aquí vivirá el ejemplo completo de restaurante. */
export default function RestaurantePage() {
  return (
    <main id="contenido" className={styles.page}>
      <PlateArt className={styles.plate} />
      <p className="kicker">
        <span className="fourbar">
          <i />
          <i />
          <i />
          <i />
        </span>
        Ejemplo en vivo
      </p>
      <h1 className={styles.title}>Próximamente: ejemplo de restaurante</h1>
      <p className={styles.text}>
        Estoy cocinando un sitio completo de restaurante, con menú, reservaciones y pedidos, para
        que lo recorras como lo haría uno de tus clientes.
      </p>
      <div className={styles.actions}>
        <Link className="btn btn--paper" href="/">
          <IconArrowLeft />
          Volver a los ejemplos
        </Link>
        <a className="btn btn--ghost" href={site.portfolioUrl}>
          Ver mi portafolio
          <IconArrow />
        </a>
      </div>
    </main>
  );
}
