import { gsap } from "@/lib/gsap";

/**
 * Apariciones compartidas por las secciones. Llamar siempre dentro de
 * useScrollMotion para que se limpien solas. Solo animan transform y opacity.
 */

/** Título que sube palabra por palabra, ligado al scroll. */
export function revealTitle(words: Element[], trigger: Element) {
  if (words.length === 0) return;
  gsap.fromTo(
    words,
    { yPercent: 120 },
    {
      yPercent: 0,
      ease: "power3.out",
      stagger: 0.06,
      scrollTrigger: { trigger, start: "top 90%", end: "top 55%", scrub: 0.5 },
    },
  );
}

/** Bloques que aparecen subiendo, una sola vez, al entrar en pantalla. */
export function revealUp(targets: Element[], options: { delay?: number; stagger?: number } = {}) {
  targets.forEach((target, index) => {
    gsap.fromTo(
      target,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        delay: (options.delay ?? 0) + index * (options.stagger ?? 0),
        scrollTrigger: { trigger: target, start: "top 90%", once: true },
      },
    );
  });
}
