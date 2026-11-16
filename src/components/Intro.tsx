"use client";

import { useRef } from "react";
import SplitWords from "@/components/SplitWords";
import { useScrollMotion } from "@/hooks/useScrollMotion";
import { gsap } from "@/lib/gsap";
import styles from "./Intro.module.css";

const TEXT =
  "Tu página no tiene que ser un folleto quieto. Puede contar la historia de tu negocio mientras tus clientes deslizan. Sigue bajando: esta misma página va a dar *cuatro giros,* uno por cada tipo de negocio.";

/** Texto grande que se ilumina palabra por palabra con el scroll. */
export default function Intro() {
  const ref = useRef<HTMLElement>(null);

  useScrollMotion(ref, ({ root, q }) => {
    gsap.fromTo(
      q("[data-word]"),
      // 0.38 es el mínimo que mantiene contraste AA para texto grande.
      { opacity: 0.38 },
      {
        opacity: 1,
        ease: "none",
        stagger: 0.5,
        scrollTrigger: {
          trigger: root,
          start: "top 22%",
          end: "bottom 125%",
          scrub: 0.4,
        },
      },
    );

    gsap.fromTo(
      q("[data-intro-rail]"),
      { clipPath: "inset(0% 100% 0% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "none",
        scrollTrigger: { trigger: root, start: "top 22%", end: "bottom 125%", scrub: 0.4 },
      },
    );
  });

  return (
    <section ref={ref} className={styles.intro} aria-label="Introducción">
      <div className={styles.sticky}>
        <div className={styles.block}>
          <p className={`kicker ${styles.kicker}`}>Una página, cuatro giros</p>
          <p className={styles.text}>
            <SplitWords text={TEXT} mask={false} />
          </p>
          <span className={styles.rail} aria-hidden="true">
            <span className={styles.railFill} data-intro-rail />
          </span>
        </div>
      </div>
    </section>
  );
}
