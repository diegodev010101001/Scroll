"use client";

import { useRef, type ComponentProps } from "react";
import { useStageTimeline } from "@/hooks/useStageTimeline";

/**
 * Parte cliente del escenario: solo conecta la sección con su timeline.
 * El contenido (escenas e ilustraciones SVG) llega como children ya
 * renderizado en el servidor, así no viaja en el JavaScript del cliente.
 */
export default function StageScroller({ children, ...props }: ComponentProps<"section">) {
  const ref = useRef<HTMLElement>(null);
  useStageTimeline(ref);

  return (
    <section ref={ref} {...props}>
      {children}
    </section>
  );
}
