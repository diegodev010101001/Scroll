import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Registro único de plugins. Importa siempre GSAP desde este archivo.
gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Condiciones compartidas por todas las animaciones (gsap.matchMedia).
 * - isDesktop / isMobile: cuántas capas y efectos se activan.
 * - reduceMotion: si es true no se anima nada y queda la versión estática.
 */
export const MEDIA = {
  isDesktop: "(min-width: 768px)",
  isMobile: "(max-width: 767.98px)",
  reduceMotion: "(prefers-reduced-motion: reduce)",
} as const;

export type MediaConditions = Record<keyof typeof MEDIA, boolean>;

export { gsap, ScrollTrigger, useGSAP };
