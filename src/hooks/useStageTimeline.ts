"use client";

import type { RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useScrollMotion } from "./useScrollMotion";

/**
 * Tiempos del escenario, medidos en "giros": 1 unidad = 100vh de scroll.
 * El giro i ocupa de i a i+1.
 */
const LEAD = 0.18; // cuánto antes de su turno empieza a abrirse el círculo
const REVEAL = 0.4; // duración de la transición de forma
const RING_LEAD = 0.032; // el anillo de color va un poco por delante
const EXIT = 0.13; // salida de los textos del giro anterior

type SceneState = "idle" | "live" | "active";
type Geometry = { x: number; y: number; r: number };

/**
 * Centro (en %) desde donde crece el círculo y radio (en %) necesario para
 * cubrir toda la escena. El centro es la ilustración del giro que entra.
 */
function revealGeometry(scene: HTMLElement): Geometry {
  const width = scene.offsetWidth || 1;
  const height = scene.offsetHeight || 1;
  const box = scene.querySelector<HTMLElement>('[data-art-box][data-layer="mid"]');

  const cx = box ? box.offsetLeft + box.offsetWidth / 2 : width / 2;
  const cy = box ? box.offsetTop + box.offsetHeight / 2 : height / 2;

  const farthest = Math.max(
    Math.hypot(cx, cy),
    Math.hypot(width - cx, cy),
    Math.hypot(cx, height - cy),
    Math.hypot(width - cx, height - cy),
  );
  // En circle(), el % del radio se mide contra diagonal / √2.
  const reference = Math.hypot(width, height) / Math.SQRT2;

  return {
    x: (cx / width) * 100,
    y: (cy / height) * 100,
    r: (farthest / reference) * 100 + 2,
  };
}

const numbers = (value: string | undefined) => (value ?? "").split(" ").map(Number);

/**
 * Timeline del escenario de los cuatro giros.
 *
 * El "pin" es CSS (position: sticky), así que el navegador lo fija sin
 * saltos en celulares; ScrollTrigger solo mueve el timeline con el scroll.
 * Solo se animan transform, opacity y clip-path.
 */
export function useStageTimeline(scope: RefObject<HTMLElement | null>) {
  useScrollMotion(scope, ({ root, q, isDesktop }) => {
    const pin = q("[data-stage-pin]")[0];
    const scenes = q("[data-stage-scene]");
    const wipes = q("[data-stage-wipe]");
    const total = scenes.length;
    if (!pin || total === 0) return;

    const scrub = isDesktop ? 0.6 : 0.35;
    // Parallax por capa (en % de su alto). En móvil solo se mueve la capa media.
    const depth: Record<string, number> = isDesktop
      ? { back: 3, mid: 7, front: 15 }
      : { back: 0, mid: 4, front: 0 };
    const skipOnMobile = (element: Element) =>
      !isDesktop && element.closest('[data-layer="front"], [data-desktop-only]') !== null;

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: () => `+=${root.offsetHeight - pin.offsetHeight}`,
        scrub,
        invalidateOnRefresh: true,
      },
    });

    // Barra de progreso (hay una copia por escena, todas avanzan igual).
    tl.fromTo(q("[data-stage-progress]"), { scaleX: 0 }, { scaleX: 1, duration: total }, 0);

    scenes.forEach((scene, index) => {
      const isFirst = index === 0;
      const isLast = index === total - 1;
      const find = <E extends Element = HTMLElement>(selector: string) =>
        Array.from(scene.querySelectorAll<E>(selector));

      const words = find("[data-word]");
      const fades = find("[data-stage-fade]");
      const chips = find("[data-stage-chip]");
      const zoom = find("[data-stage-zoom]");

      // Tramo en el que la escena se ve (desde que asoma hasta que la tapan).
      const visibleFrom = isFirst ? 0 : index - LEAD;
      const coveredAt = isLast ? total : index + 1 - LEAD + REVEAL;
      const span = coveredAt - visibleFrom;

      if (!isFirst) {
        // Transición de forma: un círculo que crece desde la ilustración.
        const circle = (radius: (geometry: Geometry) => number) => () => {
          const geometry = revealGeometry(scene);
          return `circle(${radius(geometry).toFixed(2)}% at ${geometry.x.toFixed(2)}% ${geometry.y.toFixed(2)}%)`;
        };
        const closed = circle(() => 0);
        const open = circle((geometry) => geometry.r);

        const wipe = wipes[index - 1];
        if (wipe && isDesktop) {
          tl.fromTo(
            wipe,
            { clipPath: closed },
            { clipPath: open, duration: REVEAL, ease: "power2.inOut" },
            index - LEAD - RING_LEAD,
          );
        }

        tl.fromTo(
          scene,
          { clipPath: closed },
          { clipPath: open, duration: REVEAL, ease: "power2.inOut" },
          index - LEAD,
        ).fromTo(
          zoom,
          { scale: 1.14 },
          { scale: 1, duration: REVEAL + 0.1, ease: "power2.out" },
          index - LEAD,
        );

        // Entrada de textos y chips.
        const enter = index - 0.02;
        tl.fromTo(
          words,
          { yPercent: 120 },
          { yPercent: 0, duration: 0.2, ease: "power3.out", stagger: { amount: 0.08 } },
          enter,
        )
          .fromTo(
            fades,
            { opacity: 0, y: 26 },
            { opacity: 1, y: 0, duration: 0.18, ease: "power2.out", stagger: 0.025 },
            enter + 0.03,
          )
          .fromTo(
            chips,
            { opacity: 0, y: 18, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 0.16, ease: "back.out(1.7)", stagger: 0.025 },
            enter + 0.09,
          );
      }

      if (!isLast) {
        // Salida: los textos se van justo antes de que entre el siguiente giro.
        const exit = index + 1 - LEAD - EXIT;
        tl.fromTo(
          words,
          { yPercent: 0 },
          {
            yPercent: -120,
            duration: EXIT,
            ease: "power2.in",
            stagger: { amount: 0.04 },
            immediateRender: false,
          },
          exit,
        )
          .fromTo(
            [...fades, ...chips],
            { opacity: 1, y: 0 },
            { opacity: 0, y: -18, duration: EXIT, ease: "power2.in", stagger: 0.006, immediateRender: false },
            exit,
          )
          .fromTo(
            zoom,
            { scale: 1 },
            { scale: 1.07, duration: REVEAL, ease: "power1.in", immediateRender: false },
            index + 1 - LEAD,
          );
      }

      // Parallax por capas mientras la escena está a la vista.
      find("[data-layer]").forEach((layer) => {
        const amount = depth[layer.dataset.layer ?? ""] ?? 0;
        if (!amount) return;
        tl.fromTo(layer, { yPercent: amount }, { yPercent: -amount, duration: span }, visibleFrom);
      });

      // Elementos que giran con el scroll (engranes, rines).
      find<SVGElement>("[data-spin]").forEach((element) => {
        if (skipOnMobile(element)) return;
        const svgOrigin = element.dataset.origin ?? "0 0";
        tl.fromTo(
          element,
          { rotation: 0, svgOrigin },
          { rotation: Number(element.dataset.spin), svgOrigin, duration: span },
          visibleFrom,
        );
      });

      // Elementos que se desplazan con el scroll: data-drift="x y rotación".
      find<SVGElement>("[data-drift]").forEach((element) => {
        if (skipOnMobile(element)) return;
        const [x = 0, y = 0, rotation = 0] = numbers(element.dataset.drift);
        const [fromX = 0, fromY = 0, fromRotation = 0] = numbers(element.dataset.driftFrom);
        tl.fromTo(
          element,
          { x: fromX, y: fromY, rotation: fromRotation, transformOrigin: "50% 50%" },
          { x, y, rotation, duration: span },
          visibleFrom,
        );
      });
    });

    // El primer giro entra mientras la sección sube, antes de quedar fija.
    const first = scenes[0];
    const inFirst = (selector: string) => Array.from(first.querySelectorAll<HTMLElement>(selector));
    gsap
      .timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: root, start: "top 78%", end: "top 8%", scrub },
      })
      .fromTo(inFirst("[data-stage-zoom]"), { scale: 1.16 }, { scale: 1, duration: 1, ease: "none" }, 0)
      .fromTo(
        inFirst("[data-word]"),
        { yPercent: 120 },
        { yPercent: 0, duration: 0.5, stagger: { amount: 0.22 } },
        0.22,
      )
      .fromTo(
        inFirst("[data-stage-fade]"),
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 },
        0.3,
      )
      .fromTo(
        inFirst("[data-stage-chip]"),
        { opacity: 0, y: 18, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, stagger: 0.05, ease: "back.out(1.7)" },
        0.5,
      );

    // Estado de cada escena: solo se pintan las visibles y solo la activa
    // corre sus animaciones en reposo (vapor, pulsos, destellos).
    const states: SceneState[] = [];
    const setState = (index: number, state: SceneState) => {
      if (states[index] === state) return;
      states[index] = state;
      scenes[index].dataset.sceneState = state;
    };

    const updateStates = () => {
      const time = tl.time();
      scenes.forEach((_, index) => {
        const isFirst = index === 0;
        const isLast = index === total - 1;
        const from = isFirst ? -1 : index - LEAD - RING_LEAD;
        const until = isLast ? total + 1 : index + 1 - LEAD + REVEAL;
        const activeFrom = isFirst ? -1 : index - LEAD + REVEAL / 2;
        const activeUntil = isLast ? total + 1 : index + 1 - LEAD + REVEAL / 2;

        if (time < from || time > until) setState(index, "idle");
        else if (time >= activeFrom && time < activeUntil) setState(index, "active");
        else setState(index, "live");
      });
    };

    tl.eventCallback("onUpdate", updateStates);
    updateStates();

    // Fuera de pantalla se pausan las animaciones en reposo.
    const setOffscreen = (self: ScrollTrigger) =>
      root.toggleAttribute("data-offscreen", !self.isActive);
    ScrollTrigger.create({
      trigger: root,
      start: "top bottom",
      end: "bottom top",
      onToggle: setOffscreen,
      onRefresh: setOffscreen,
    });

    return () => {
      scenes.forEach((scene) => scene.removeAttribute("data-scene-state"));
      root.removeAttribute("data-offscreen");
    };
  });
}
