"use client";

import type { RefObject } from "react";
import { gsap, MEDIA, useGSAP, type MediaConditions } from "@/lib/gsap";

export type MotionContext<T extends HTMLElement> = {
  /** Elemento raíz de la sección. */
  root: T;
  /** querySelectorAll limitado a la sección, devuelto como arreglo. */
  q: <E extends Element = HTMLElement>(selector: string) => E[];
  isDesktop: boolean;
  isMobile: boolean;
};

/**
 * Ciclo de vida común para las animaciones de una sección.
 *
 * - Usa useGSAP: todo lo creado dentro (tweens, timelines, ScrollTriggers)
 *   se revierte al desmontar, sin fugas ni duplicados en modo estricto.
 * - Usa gsap.matchMedia: `setup` se vuelve a ejecutar al cruzar el corte
 *   móvil/escritorio, y NO se ejecuta con prefers-reduced-motion (queda la
 *   versión estática que define el CSS).
 * - Si `setup` devuelve una función, se llama al revertir (para listeners).
 */
export function useScrollMotion<T extends HTMLElement>(
  scope: RefObject<T | null>,
  setup: (context: MotionContext<T>) => void | (() => void),
) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      mm.add(MEDIA, (context) => {
        const { isDesktop, isMobile, reduceMotion } =
          context.conditions as MediaConditions;
        if (reduceMotion) return;

        const q = <E extends Element = HTMLElement>(selector: string) =>
          Array.from(root.querySelectorAll<E>(selector));

        return setup({ root, q, isDesktop, isMobile });
      });
    },
    { scope },
  );
}
