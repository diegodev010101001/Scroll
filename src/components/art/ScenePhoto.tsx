import Image from "next/image";
import ArtLayer from "./ArtLayer";
import styles from "./art.module.css";

type ScenePhotoProps = {
  /** Ruta dentro de /public, por ejemplo "/images/cafe.webp". */
  src: string;
  /**
   * "fondo"   → foto a sangre que cubre toda la escena (WebP/JPG de 1920 px).
   * "recorte" → objeto con transparencia dentro de la caja de arte (PNG/WebP).
   */
  variant?: "fondo" | "recorte";
  /** Opacidad del velo sobre la foto de fondo para que el texto se lea. 0 a 1. */
  scrim?: number;
};

/**
 * Sustituto de una ilustración por una foto.
 * Uso en src/config/scenes.ts (ver public/images/README.md):
 *
 *   const CafeFoto = () => <ScenePhoto src="/images/cafe.webp" variant="fondo" />;
 *   ...
 *   Art: CafeFoto,
 */
export default function ScenePhoto({ src, variant = "fondo", scrim = 0.55 }: ScenePhotoProps) {
  if (variant === "recorte") {
    return (
      <ArtLayer depth="mid">
        <Image className={styles.cutout} src={src} alt="" fill sizes="(max-width: 767px) 84vw, 46vw" />
      </ArtLayer>
    );
  }

  return (
    <ArtLayer depth="back" bleed>
      <Image className={styles.photo} src={src} alt="" fill sizes="100vw" />
      <span className={styles.scrim} style={{ opacity: scrim }} />
    </ArtLayer>
  );
}
