"use client";

import { useSmoothScroll } from "@/hooks/useSmoothScroll";

/** Activa Lenis + ScrollTrigger para toda la app. No pinta nada. */
export default function SmoothScroll() {
  useSmoothScroll();
  return null;
}
