import type { ReactNode } from "react";
import styles from "./art.module.css";

type ArtLayerProps = {
  /**
   * Profundidad de la capa. El escenario mueve cada capa a distinta velocidad:
   * back = fondo (lento), mid = medio, front = primer plano (rápido).
   * En pantallas pequeñas la capa "front" no se muestra.
   */
  depth: "back" | "mid" | "front";
  /**
   * true  → la capa cubre toda la escena (fondos a sangre).
   * false → la capa vive en la "caja de arte" cuadrada junto al texto.
   */
  bleed?: boolean;
  children: ReactNode;
};

/** Envoltorio de una capa de ilustración. Siempre decorativa (aria-hidden). */
export default function ArtLayer({ depth, bleed = false, children }: ArtLayerProps) {
  return (
    <div
      className={`${styles.layer} ${bleed ? styles.bleed : styles.box}`}
      data-layer={depth}
      data-art-box={bleed ? undefined : ""}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}
