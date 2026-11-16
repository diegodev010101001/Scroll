"use client";

import { useRef } from "react";
import { IconBag, IconCalendar, IconCheck, IconSite, IconSystem } from "@/components/art/icons";
import SplitWords from "@/components/SplitWords";
import { useScrollMotion } from "@/hooks/useScrollMotion";
import { gsap } from "@/lib/gsap";
import { revealTitle, revealUp } from "@/lib/reveal";
import styles from "./Includes.module.css";

const ITEMS = [
  {
    Icon: IconSite,
    title: "Sitio web",
    text: "Una página rápida y clara, con animaciones que cuentan lo que hace especial a tu negocio.",
    points: ["Diseño a tu medida", "Perfecto en celular", "Listo para Google"],
  },
  {
    Icon: IconCalendar,
    title: "Citas y reservas",
    text: "Tus clientes agendan solos, a cualquier hora, y reciben su recordatorio.",
    points: ["Agenda en línea", "Recordatorios automáticos", "Menos llamadas"],
  },
  {
    Icon: IconBag,
    title: "Catálogo y pedidos",
    text: "Muestra lo que vendes y recibe los pedidos directo en tu WhatsApp.",
    points: ["Productos con fotos", "Pedidos por WhatsApp", "Precios siempre al día"],
  },
  {
    Icon: IconSystem,
    title: "Sistemas a medida",
    text: "Paneles, inventarios o seguimiento de órdenes hechos para tu forma de trabajar.",
    points: ["Panel de administración", "Reportes claros", "Crece con tu negocio"],
  },
];

/** Qué incluye: tarjetas con aparición escalonada. */
export default function Includes() {
  const ref = useRef<HTMLElement>(null);

  useScrollMotion(ref, ({ q, isDesktop }) => {
    const head = q("[data-includes-head]")[0];
    if (!head) return;

    revealTitle(q("[data-includes-head] [data-word]"), head);
    revealUp(q("[data-reveal]"));

    // En escritorio entran juntas y se escalonan; en móvil, una por una.
    q("[data-includes-card]").forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 70, rotate: index % 2 === 0 ? -2.5 : 2.5 },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          duration: 1,
          ease: "power3.out",
          delay: isDesktop ? index * 0.12 : 0,
          scrollTrigger: { trigger: card, start: "top 92%", once: true },
        },
      );
    });
  });

  return (
    <section ref={ref} className={styles.includes} aria-labelledby="includes-title">
      <div className={styles.wrap}>
        <header className={styles.head} data-includes-head>
          <p className="kicker">
            <span className="fourbar">
              <i />
              <i />
              <i />
              <i />
            </span>
            Qué incluye
          </p>
          <h2 id="includes-title" className={`section-title ${styles.title}`}>
            <SplitWords text="Todo lo que tu negocio necesita en línea." />
          </h2>
          <p className="section-lead" data-reveal>
            Empezamos por lo que más te urge y lo demás se suma cuando lo necesites.
          </p>
        </header>

        <ul className={styles.grid}>
          {ITEMS.map(({ Icon, title, text, points }, index) => (
            <li key={title} className={styles.card} data-includes-card>
              <div className={styles.cardInner}>
                <div className={styles.cardTop}>
                  <span className={styles.icon}>
                    <Icon />
                  </span>
                  <span className={styles.index} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardText}>{text}</p>
                <ul className={styles.points}>
                  {points.map((point) => (
                    <li key={point}>
                      <IconCheck />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
