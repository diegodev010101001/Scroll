"use client";

import { useRef } from "react";
import SplitWords from "@/components/SplitWords";
import { useScrollMotion } from "@/hooks/useScrollMotion";
import { gsap } from "@/lib/gsap";
import { revealTitle, revealUp } from "@/lib/reveal";
import styles from "./Process.module.css";

const STEPS = [
  {
    title: "Platicamos de tu negocio",
    text: "Me cuentas qué vendes, quiénes son tus clientes y qué necesitas. Sin tecnicismos y sin compromiso.",
  },
  {
    title: "Te muestro el diseño",
    text: "Preparo una propuesta con tus colores, tu estilo y tus textos para que la veas antes de construirla.",
  },
  {
    title: "Lo construyo a tu medida",
    text: "Desarrollo el sitio con sus animaciones y funciones. Lo revisas en tu celular y afinamos cada detalle.",
  },
  {
    title: "Lo publicamos y te acompaño",
    text: "Tu sitio queda en línea, rápido y listo para compartir. Sigo disponible para cambios y mejoras.",
  },
];

/** Cómo trabajo: pasos unidos por una línea que se dibuja con el scroll. */
export default function Process() {
  const ref = useRef<HTMLElement>(null);

  useScrollMotion(ref, ({ q }) => {
    const head = q("[data-process-head]")[0];
    const list = q("[data-process-list]")[0];
    if (!head || !list) return;

    revealTitle(q("[data-process-head] [data-word]"), head);
    revealUp(q("[data-reveal]"));

    // La línea se dibuja (clip-path) siguiendo el punto medio de la pantalla.
    gsap.fromTo(
      q("[data-process-line]"),
      { clipPath: "inset(0% 0% 100% 0%)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        ease: "none",
        scrollTrigger: { trigger: list, start: "top 60%", end: "bottom 60%", scrub: 0.4 },
      },
    );

    // Cada paso se enciende cuando la línea lo alcanza.
    q("[data-process-step]").forEach((step) => {
      gsap
        .timeline({
          defaults: { duration: 0.55, ease: "power3.out" },
          scrollTrigger: { trigger: step, start: "top 60%", toggleActions: "play none none reverse" },
        })
        .fromTo(step.querySelectorAll("[data-process-dot]"), { scale: 0 }, { scale: 1, ease: "back.out(2.4)" }, 0)
        .fromTo(step.querySelectorAll("[data-process-body]"), { x: 18 }, { x: 0 }, 0)
        // 0.72 es el mínimo que mantiene contraste AA en el texto secundario.
        .fromTo(step.querySelectorAll("[data-process-dim]"), { opacity: 0.72 }, { opacity: 1 }, 0);
    });
  });

  return (
    <section ref={ref} className={styles.process} aria-labelledby="process-title">
      <div className={styles.layout}>
        <header className={styles.head} data-process-head>
          <p className="kicker">
            <span className="fourbar">
              <i />
              <i />
              <i />
              <i />
            </span>
            Cómo trabajo
          </p>
          <h2 id="process-title" className={`section-title ${styles.title}`}>
            <SplitWords text="De la idea a tu sitio, en cuatro pasos." />
          </h2>
          <p className="section-lead" data-reveal>
            Un proceso claro, sin sorpresas: siempre sabes qué sigue y cómo va tu proyecto.
          </p>
        </header>

        <div className={styles.listWrap} data-process-list>
          <span className={styles.line} aria-hidden="true">
            <span className={styles.lineFill} data-process-line />
          </span>
          <ol className={styles.list}>
            {STEPS.map((step, index) => (
              <li key={step.title} className={styles.step} data-process-step>
                <span className={styles.node} aria-hidden="true">
                  <span className={styles.dot} data-process-dot />
                </span>
                <div className={styles.body} data-process-body>
                  <p className={styles.number} aria-hidden="true">
                    Paso {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className={styles.stepTitle} data-process-dim>
                    {step.title}
                  </h3>
                  <p className={styles.stepText} data-process-dim>
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
