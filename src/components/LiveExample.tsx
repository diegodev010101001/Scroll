"use client";

import Link from "next/link";
import { useRef } from "react";
import { IconArrow } from "@/components/art/icons";
import PlateArt from "@/components/art/PlateArt";
import SplitWords from "@/components/SplitWords";
import { site } from "@/config/site";
import { useScrollMotion } from "@/hooks/useScrollMotion";
import { gsap } from "@/lib/gsap";
import { revealTitle, revealUp } from "@/lib/reveal";
import styles from "./LiveExample.module.css";

const DISHES = [
  { x: 28, color: "#e8b04a" },
  { x: 228, color: "#7fb04a" },
  { x: 428, color: "#e2532f" },
];

/** Ejemplo en vivo: lleva a la ruta del ejemplo completo (/restaurante). */
export default function LiveExample() {
  const ref = useRef<HTMLElement>(null);

  useScrollMotion(ref, ({ root, q, isDesktop }) => {
    const copy = q("[data-live-copy]")[0];
    const stage = q("[data-live-stage]")[0];
    if (!copy || !stage) return;

    revealTitle(q("[data-live-copy] [data-word]"), copy);
    revealUp(q("[data-reveal]"), { stagger: 0.1 });

    // La ventana se "levanta" hacia el usuario conforme entra en pantalla.
    gsap.fromTo(
      q("[data-live-mock]"),
      { rotateX: isDesktop ? 30 : 18, rotateZ: -4, scale: 0.84, y: 70, transformPerspective: 1400 },
      {
        rotateX: 0,
        rotateZ: 0,
        scale: 1,
        y: 0,
        ease: "none",
        scrollTrigger: { trigger: stage, start: "top 95%", end: "top 35%", scrub: 0.5 },
      },
    );

    // El plato gira mientras la sección cruza la pantalla.
    gsap.fromTo(
      q("[data-live-plate]"),
      { rotate: -60 },
      {
        rotate: 150,
        ease: "none",
        scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: 0.5 },
      },
    );
  });

  return (
    <section ref={ref} className={styles.live} aria-labelledby="live-title">
      <div className={styles.layout}>
        <div className={styles.copy} data-live-copy>
          <p className="kicker">
            <span className="fourbar">
              <i />
              <i />
              <i />
              <i />
            </span>
            Ejemplo en vivo
          </p>
          <h2 id="live-title" className={`section-title ${styles.title}`}>
            <SplitWords text="Un restaurante completo, para que lo recorras." />
          </h2>
          <p className="section-lead" data-reveal>
            Además de esta página, preparo un ejemplo navegable: el sitio de un restaurante con
            menú, reservaciones y pedidos, para que sientas cómo sería el tuyo.
          </p>
          <div className={styles.actions} data-reveal>
            <Link className="btn btn--paper btn--lg" href={site.liveExample.href}>
              Ver ejemplo de restaurante
              <IconArrow />
            </Link>
            {site.liveExample.available ? null : <span className={styles.soon}>Próximamente</span>}
          </div>
        </div>

        <div className={styles.stage} data-live-stage aria-hidden="true">
          <div className={styles.mock} data-live-mock>
            <div className={styles.bar}>
              <i />
              <i />
              <i />
              <span className={styles.url}>turestaurante.mx</span>
            </div>
            <div className={styles.screen}>
              <svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice">
                <rect width="640" height="400" fill="#211512" />
                <circle cx="470" cy="150" r="230" fill="#2e1c17" />
                <circle cx="488" cy="184" r="126" fill="#120a08" opacity="0.55" />
                {/* Navegación */}
                <circle cx="36" cy="30" r="9" fill="#e2532f" />
                <rect x="54" y="25" width="78" height="10" rx="5" fill="#f4e9d8" />
                <g fill="#f4e9d8" opacity="0.4">
                  <rect x="250" y="26" width="44" height="8" rx="4" />
                  <rect x="310" y="26" width="44" height="8" rx="4" />
                  <rect x="370" y="26" width="44" height="8" rx="4" />
                </g>
                {/* Titular y botones */}
                <rect x="28" y="92" width="250" height="28" rx="9" fill="#f4e9d8" />
                <rect x="28" y="130" width="188" height="28" rx="9" fill="#f4e9d8" />
                <g fill="#f4e9d8" opacity="0.42">
                  <rect x="28" y="178" width="226" height="9" rx="4.5" />
                  <rect x="28" y="196" width="176" height="9" rx="4.5" />
                </g>
                <rect x="28" y="228" width="112" height="36" rx="18" fill="#e2532f" />
                <rect x="150" y="229" width="94" height="34" rx="17" fill="none" stroke="#f4e9d8" strokeOpacity="0.5" strokeWidth="2" />
                {/* Tarjetas del menú */}
                {DISHES.map((dish) => (
                  <g key={dish.x} transform={`translate(${dish.x} 300)`}>
                    <rect width="184" height="84" rx="16" fill="#35221c" />
                    <circle cx="42" cy="42" r="24" fill={dish.color} />
                    <rect x="80" y="26" width="80" height="10" rx="5" fill="#f4e9d8" />
                    <rect x="80" y="46" width="54" height="8" rx="4" fill="#f4e9d8" opacity="0.4" />
                  </g>
                ))}
              </svg>
              <div className={styles.plate} data-live-plate>
                <PlateArt />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
