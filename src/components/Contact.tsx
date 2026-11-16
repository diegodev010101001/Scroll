"use client";

import { useRef } from "react";
import Dial from "@/components/art/Dial";
import { IconArrow, IconChat, IconMail, IconPin } from "@/components/art/icons";
import SplitWords from "@/components/SplitWords";
import { mailtoUrl, site, whatsappUrl } from "@/config/site";
import { useScrollMotion } from "@/hooks/useScrollMotion";
import { gsap } from "@/lib/gsap";
import styles from "./Contact.module.css";

/** Anillos de color que preceden al fondo final (los dos primeros solo en escritorio). */
const RINGS = [
  { color: "var(--c-cafe)", desktopOnly: true },
  { color: "var(--c-gym)", desktopOnly: true },
  { color: "var(--c-dental)", desktopOnly: false },
  { color: "var(--c-taller)", desktopOnly: false },
];

const circle = (radius: number) => `circle(${radius}% at 50% 50%)`;

/**
 * Contacto: el fondo se transforma una última vez. La sección queda fija,
 * el dial gira y de su centro salen los cuatro colores hasta abrir el panel.
 */
export default function Contact() {
  const ref = useRef<HTMLElement>(null);

  useScrollMotion(ref, ({ root, q, isDesktop }) => {
    const pin = q("[data-contact-pin]")[0];
    const panel = q("[data-contact-panel]")[0];
    if (!pin || !panel) return;

    const rings = q("[data-contact-ring]").filter(
      (ring) => isDesktop || !ring.hasAttribute("data-desktop-only"),
    );
    const step = 0.05;
    const burst = 0.16;

    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: () => `+=${root.offsetHeight - pin.offsetHeight}`,
        scrub: isDesktop ? 0.6 : 0.35,
        invalidateOnRefresh: true,
      },
    });

    tl.fromTo(
      q("[data-contact-dial]"),
      { rotate: -90, scale: 0.82 },
      { rotate: 270, scale: 1.12, duration: 0.6, ease: "power1.inOut" },
      0,
    ).fromTo(
      q("[data-contact-prelude-text]"),
      { opacity: 1, y: 0 },
      { opacity: 0, y: -28, duration: 0.14 },
      0.08,
    );

    rings.forEach((ring, index) => {
      tl.fromTo(
        ring,
        { clipPath: circle(0) },
        { clipPath: circle(75), duration: 0.5, ease: "power2.inOut" },
        burst + index * step,
      );
    });

    tl.fromTo(
      panel,
      { clipPath: circle(0) },
      { clipPath: circle(75), duration: 0.5, ease: "power2.inOut" },
      burst + rings.length * step,
    )
      .fromTo(
        q("[data-contact-panel] [data-word]"),
        { yPercent: 120 },
        { yPercent: 0, duration: 0.22, ease: "power3.out", stagger: { amount: 0.08 } },
        0.58,
      )
      .fromTo(
        q("[data-contact-fade]"),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.18, ease: "power2.out", stagger: 0.035 },
        0.64,
      )
      // Pequeña pausa final con todo en su sitio antes de soltar la sección.
      .to({}, { duration: 0.08 });

    // Teclado: si el foco entra al panel antes de abrirse, lleva el scroll al final.
    const onFocus = () => {
      const trigger = tl.scrollTrigger;
      if (trigger && trigger.progress < 0.98) window.scrollTo({ top: trigger.end + 2 });
    };
    panel.addEventListener("focusin", onFocus);
    return () => panel.removeEventListener("focusin", onFocus);
  });

  return (
    <section ref={ref} id="contacto" className={styles.contact} aria-labelledby="contact-title">
      <div className={styles.pin} data-contact-pin>
        <div className={styles.prelude} aria-hidden="true">
          <p className={`kicker ${styles.preludeText}`} data-contact-prelude-text>
            Un último giro
          </p>
          <div className={styles.dialWrap} data-contact-dial>
            <Dial className={styles.dial} />
          </div>
        </div>

        {RINGS.map((ring) => (
          <span
            key={ring.color}
            className={styles.ring}
            style={{ background: ring.color }}
            data-contact-ring
            data-desktop-only={ring.desktopOnly ? "" : undefined}
            aria-hidden="true"
          />
        ))}

        <div className={styles.panel} data-contact-panel>
          <div className={styles.inner}>
            <p className={`kicker ${styles.kicker}`} data-contact-fade>
              <span className="fourbar">
                <i />
                <i />
                <i />
                <i />
              </span>
              Contacto
            </p>

            <h2 id="contact-title" className={styles.title}>
              <SplitWords text="¿Le damos un *giro* a tu negocio?" />
            </h2>

            <p className={styles.lead} data-contact-fade>
              Cuéntame qué necesitas y te respondo con ideas claras para tu sitio. La primera
              plática no cuesta.
            </p>

            <div className={styles.actions} data-contact-fade>
              <a
                className="btn btn--whatsapp btn--lg"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconChat />
                Escríbeme por WhatsApp
              </a>
              <a className="btn btn--outline-ink btn--lg" href={mailtoUrl}>
                <IconMail />
                Enviar un correo
              </a>
            </div>

            <div className={styles.portfolio} data-contact-fade>
              <p className={styles.portfolioText}>
                ¿Quieres conocer más de mi trabajo? Proyectos, tecnologías y más sobre mí.
              </p>
              <a className={`btn btn--paper btn--lg ${styles.portfolioBtn}`} href={site.portfolioUrl}>
                Ver mi portafolio completo
                <IconArrow />
              </a>
            </div>

            <ul className={styles.meta} data-contact-fade>
              <li>
                <a href={mailtoUrl}>
                  <IconMail />
                  {site.email}
                </a>
              </li>
              <li>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <IconChat />
                  <span className="sr-only">WhatsApp: </span>
                  {site.whatsapp.display}
                </a>
              </li>
              <li>
                <IconPin />
                {site.location}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
