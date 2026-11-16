"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Scroll suave con Lenis, sincronizado con ScrollTrigger.
 *
 * - Lenis avisa a ScrollTrigger en cada scroll y usa el ticker de GSAP como
 *   único requestAnimationFrame (un solo reloj para todo).
 * - Con prefers-reduced-motion no se crea: queda el scroll nativo.
 * - Al desmontar se quita el ticker y se destruye la instancia.
 */
export function useSmoothScroll() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const lenis = new Lenis({
        lerp: 0.11,
        smoothWheel: true,
        anchors: true,
        stopInertiaOnNavigate: true,
      });

      lenis.on("scroll", ScrollTrigger.update);

      const raf = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(raf);
        gsap.ticker.lagSmoothing(500, 33);
        lenis.off("scroll", ScrollTrigger.update);
        lenis.destroy();
      };
    });

    // Las fuentes cambian alturas: recalcula posiciones cuando terminen de cargar.
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      mm.revert();
    };
  }, []);
}
