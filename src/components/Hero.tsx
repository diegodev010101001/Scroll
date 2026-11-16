"use client";

import { useRef } from "react";
import Dial from "@/components/art/Dial";
import { IconArrow, IconChat } from "@/components/art/icons";
import { gearPath, hexPath, SPARKLE_D } from "@/components/art/shapes";
import SplitWords from "@/components/SplitWords";
import { site, whatsappUrl } from "@/config/site";
import { useScrollMotion } from "@/hooks/useScrollMotion";
import { gsap } from "@/lib/gsap";
import styles from "./Hero.module.css";

const TICKS_D = gearPath({ cx: 300, cy: 300, teeth: 48, outer: 296, root: 288 });

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useScrollMotion(ref, ({ root, q, isDesktop }) => {
    // El CSS oculta el contenido antes de hidratar para que no parpadee.
    gsap.set(q("[data-prehide]"), { autoAlpha: 1 });

    // Entrada: el título se revela palabra por palabra.
    gsap
      .timeline({ defaults: { ease: "power4.out" } })
      .fromTo(
        q("[data-word]"),
        { yPercent: 120, rotate: 5 },
        { yPercent: 0, rotate: 0, duration: 1.15, stagger: 0.06 },
        0.15,
      )
      .fromTo(
        q("[data-hero-dial]"),
        { rotate: -160, scale: 0.4, autoAlpha: 0 },
        { rotate: 0, scale: 1, autoAlpha: 1, duration: 1.9, ease: "expo.out" },
        0.1,
      )
      .fromTo(
        q("[data-hero-fade]"),
        { autoAlpha: 0, y: 26 },
        { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1 },
        0.65,
      )
      .fromTo(
        q("[data-hero-underline]"),
        { scaleX: 0 },
        { scaleX: 1, duration: 0.9, ease: "power3.inOut" },
        0.95,
      )
      .fromTo(
        q("[data-hero-bit]"),
        { scale: 0, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.9, stagger: 0.07, ease: "back.out(2)" },
        0.8,
      )
      .fromTo(
        q("[data-hero-cue-inner]"),
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.8 },
        1.4,
      );

    // Scroll: cada capa se mueve a distinta velocidad y el dial gira.
    const scrollTl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true },
    });

    scrollTl
      .fromTo(q('[data-hero-layer="far"]'), { yPercent: 0 }, { yPercent: 14 }, 0)
      .fromTo(q('[data-hero-layer="grid"]'), { yPercent: 0 }, { yPercent: 7 }, 0)
      .fromTo(q('[data-hero-layer="dial"]'), { yPercent: 0 }, { yPercent: isDesktop ? -16 : -8 }, 0)
      .fromTo(q("[data-hero-spin]"), { rotate: 0 }, { rotate: 160 }, 0)
      .fromTo(q("[data-hero-content]"), { yPercent: 0, opacity: 1 }, { yPercent: -22, opacity: 0.1 }, 0)
      .fromTo(q("[data-hero-cue]"), { opacity: 1 }, { opacity: 0, duration: 0.12 }, 0);

    q("[data-hero-bit]").forEach((bit) => {
      const speed = Number(bit.dataset.speed ?? 1);
      scrollTl.fromTo(
        bit,
        { y: 0, rotate: 0 },
        { y: -220 * speed * (isDesktop ? 1 : 0.6), rotate: 90 * speed },
        0,
      );
    });

    // Parallax con el puntero (solo con mouse).
    if (!isDesktop || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const movers = q("[data-pointer]").map((element) => ({
      strength: Number(element.dataset.pointer),
      x: gsap.quickTo(element, "x", { duration: 0.9, ease: "power3" }),
      y: gsap.quickTo(element, "y", { duration: 0.9, ease: "power3" }),
    }));

    const onMove = (event: PointerEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      movers.forEach((mover) => {
        mover.x(nx * mover.strength);
        mover.y(ny * mover.strength);
      });
    };

    root.addEventListener("pointermove", onMove);
    return () => root.removeEventListener("pointermove", onMove);
  });

  return (
    <section ref={ref} className={styles.hero} aria-labelledby="hero-title">
      {/* Fondo por capas */}
      <div className={styles.bg} aria-hidden="true">
        <div className={styles.orbs} data-hero-layer="far" />
        <div className={styles.grid} data-hero-layer="grid" />
        <div className={styles.bits} data-pointer="-46">
          <span className={`${styles.bit} ${styles.bitBean}`} data-hero-bit data-speed="1.3">
            <svg viewBox="-20 -15 40 30">
              <ellipse rx="17" ry="12" fill="#e9c79a" transform="rotate(-28)" />
              <path d="M-13 -3C-5 4 5 -4 13 3" fill="none" stroke="#0c0b10" strokeWidth="2.5" strokeLinecap="round" transform="rotate(-28)" />
            </svg>
          </span>
          <span className={`${styles.bit} ${styles.bitRing}`} data-hero-bit data-speed="0.7">
            <svg viewBox="-30 -30 60 60">
              <circle r="24" fill="none" stroke="#c8ff2e" strokeWidth="7" />
            </svg>
          </span>
          <span className={`${styles.bit} ${styles.bitSparkle}`} data-hero-bit data-speed="1.7">
            <svg viewBox="-22 -22 44 44">
              <path d={SPARKLE_D} fill="#4f9df0" />
            </svg>
          </span>
          <span className={`${styles.bit} ${styles.bitNut}`} data-hero-bit data-speed="1">
            <svg viewBox="-26 -26 52 52">
              <path d={hexPath(24, 10)} fill="#ff6a13" fillRule="evenodd" />
            </svg>
          </span>
          <span className={`${styles.bit} ${styles.bitPlus}`} data-hero-bit data-speed="2.1">
            <svg viewBox="-12 -12 24 24">
              <path d="M0 -9V9M-9 0H9" stroke="#f5f1e8" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </span>
          <span className={`${styles.bit} ${styles.bitDot}`} data-hero-bit data-speed="2.4">
            <svg viewBox="-6 -6 12 12">
              <circle r="6" fill="#f5f1e8" opacity="0.7" />
            </svg>
          </span>
        </div>
      </div>

      <div className={styles.layout}>
        <div className={`${styles.content} ${styles.prehide}`} data-prehide data-hero-content>
          <p className={`kicker ${styles.kicker}`} data-hero-fade>
            <span className="fourbar">
              <i />
              <i />
              <i />
              <i />
            </span>
            <span>
              Ejemplos en vivo<span className={styles.kickerPlace}> · {site.location}</span>
            </span>
          </p>

          <h1 id="hero-title" className={styles.title}>
            <SplitWords text="Sitios web que le dan un" />{" "}
            <span className={styles.accent}>
              <SplitWords text="giro" />
              <span className={styles.underline} data-hero-underline aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>
            </span>{" "}
            <SplitWords text="a tu negocio." />
          </h1>

          <p className={styles.lead} data-hero-fade>
            Soy {site.owner}, desarrollador web. Desliza y descubre lo que puedo crear para ti: una
            sola página que se transforma en cuatro negocios distintos.
          </p>

          <div className={styles.actions} data-hero-fade>
            <a className="btn btn--paper" href="#giros">
              Ver los cuatro giros
              <IconArrow className={styles.down} />
            </a>
            <a
              className={`btn btn--ghost ${styles.whatsapp}`}
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconChat />
              <span className={styles.whatsappLabel}>Cotizar por WhatsApp</span>
            </a>
          </div>
        </div>

        <div className={`${styles.visual} ${styles.prehide}`} data-prehide aria-hidden="true">
          <div className={styles.dialLayer} data-hero-layer="dial">
            <div className={styles.dialFill} data-pointer="30">
              <div className={styles.dialFill} data-hero-dial>
                <svg className={styles.ticks} viewBox="0 0 600 600">
                  <path d={TICKS_D} fill="none" stroke="#f5f1e8" strokeOpacity="0.3" strokeWidth="1.5" />
                </svg>
                <div className={styles.dialFill} data-hero-spin>
                  <Dial className={styles.dial} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.cue} data-hero-cue aria-hidden="true">
        <div className={`${styles.cueInner} ${styles.prehide}`} data-prehide data-hero-cue-inner>
          <span>Desliza</span>
          <span className={styles.cueLine}>
            <span className={styles.cueDot} />
          </span>
        </div>
      </div>
    </section>
  );
}
