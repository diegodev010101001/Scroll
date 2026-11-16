import ArtLayer from "./ArtLayer";
import styles from "./art.module.css";
import { BOLT_D } from "./shapes";

const NEON = "#c8ff2e";

/** Discos de un lado de la barra (el otro lado se refleja). */
function Plates() {
  return (
    <>
      <rect x="86" y="150" width="30" height="254" rx="10" fill="#1c1f26" stroke={NEON} strokeWidth="3" />
      <rect x="120" y="176" width="24" height="202" rx="9" fill="#2f343e" />
      <rect x="148" y="206" width="20" height="142" rx="8" fill={NEON} />
      <rect x="172" y="256" width="16" height="42" rx="5" fill="#e6e9ee" />
    </>
  );
}

/** Gimnasio: barra olímpica, pesas y pulsos de energía en neón. */
export default function GymArt() {
  return (
    <>
      {/* Fondo: retícula, anillos y línea de pulso */}
      <ArtLayer depth="back" bleed>
        <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="gym-bg" cx="0.5" cy="0.45" r="0.75">
              <stop offset="0" stopColor="#1d2029" />
              <stop offset="1" stopColor="#090a0d" />
            </radialGradient>
            <linearGradient id="gym-pulse" gradientUnits="userSpaceOnUse" x1="940" y1="0" x2="1200" y2="0">
              <stop offset="0" stopColor={NEON} stopOpacity="0" />
              <stop offset="1" stopColor={NEON} stopOpacity="0.45" />
            </linearGradient>
            <pattern id="gym-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M80 0H0V80" fill="none" stroke="#fff" strokeOpacity="0.045" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="1600" height="1000" fill="url(#gym-bg)" />
          <rect width="1600" height="1000" fill="url(#gym-grid)" />
          <g fill="none" stroke={NEON}>
            <circle cx="800" cy="500" r="300" strokeOpacity="0.16" strokeWidth="2" />
            <circle cx="800" cy="500" r="430" strokeOpacity="0.1" strokeWidth="2" />
            <circle cx="800" cy="500" r="580" strokeOpacity="0.06" strokeWidth="2" />
          </g>
          <path
            d="M940 140H1250L1276 110L1308 176L1346 92L1380 164L1400 140H1600"
            fill="none"
            stroke="url(#gym-pulse)"
            strokeWidth="4"
            strokeLinejoin="round"
            data-desktop-only
          />
          <g fill={NEON} opacity="0.06" data-desktop-only>
            <polygon points="0,760 120,760 -80,1000 -200,1000" />
            <polygon points="200,760 320,760 120,1000 0,1000" />
            <polygon points="400,760 520,760 320,1000 200,1000" />
          </g>
        </svg>
      </ArtLayer>

      {/* Medio: rack, barra, pesa rusa y mancuerna */}
      <ArtLayer depth="mid">
        <svg viewBox="0 0 600 600">
          {/* Pulso de energía */}
          <g fill="none" stroke={NEON} strokeWidth="3">
            <circle className={styles.pulse} cx="300" cy="277" r="190" />
            <circle className={`${styles.pulse} ${styles.delay1}`} cx="300" cy="277" r="190" />
          </g>

          {/* Piso */}
          <ellipse cx="300" cy="552" rx="270" ry="20" fill={NEON} opacity="0.1" />
          <path d="M20 550H580" stroke="#30343d" strokeWidth="3" strokeLinecap="round" />

          {/* Rack */}
          <g fill="#23262e">
            <rect x="204" y="214" width="18" height="336" rx="4" />
            <rect x="378" y="214" width="18" height="336" rx="4" />
            <rect x="178" y="538" width="70" height="12" rx="6" />
            <rect x="352" y="538" width="70" height="12" rx="6" />
          </g>
          <g fill="#3a3f4b">
            <path d="M222 286h20v-12h8v22h-28z" />
            <path d="M378 286h-20v-12h-8v22h28z" />
          </g>

          {/* Barra con discos: sube con el scroll */}
          <g data-drift="0 -34 0">
            <rect x="24" y="270" width="552" height="14" rx="7" fill="#c9ced6" />
            <rect x="244" y="270" width="112" height="14" fill="#8f96a3" />
            <Plates />
            <g transform="translate(600 0) scale(-1 1)">
              <Plates />
            </g>
          </g>

          {/* Pesa rusa */}
          <path d="M84 444C74 392 162 392 152 444" fill="none" stroke="#30343d" strokeWidth="18" strokeLinecap="round" />
          <circle cx="118" cy="488" r="58" fill="#1c1f26" stroke="#3a3f4b" strokeWidth="3" />
          <circle cx="118" cy="488" r="24" fill="none" stroke={NEON} strokeWidth="5" />

          {/* Mancuerna */}
          <rect x="426" y="502" width="92" height="14" rx="5" fill="#c9ced6" />
          <rect x="398" y="476" width="40" height="66" rx="11" fill="#2f343e" stroke={NEON} strokeWidth="3" />
          <rect x="506" y="476" width="40" height="66" rx="11" fill="#2f343e" stroke={NEON} strokeWidth="3" />
        </svg>
      </ArtLayer>

      {/* Primer plano: rayo y marcas de energía */}
      <ArtLayer depth="front">
        <svg viewBox="0 0 600 600">
          <g transform="translate(470 6)">
            <path className={styles.bob} d={BOLT_D} fill={NEON} />
          </g>
          <g fill="none" stroke={NEON} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" data-drift="60 0 0">
            <path d="M24 66l20 20-20 20" />
            <path d="M56 66l20 20-20 20" opacity="0.6" />
            <path d="M88 66l20 20-20 20" opacity="0.3" />
          </g>
          <g stroke="#f2f5ee" strokeWidth="5" strokeLinecap="round">
            <path d="M566 312v28M552 326h28" data-drift="0 -70 90" />
            <path d="M40 366v20M30 376h20" opacity="0.6" data-drift="0 -110 -90" />
          </g>
          <circle cx="552" cy="446" r="7" fill={NEON} data-drift="0 -90 0" />
          <circle cx="28" cy="210" r="5" fill="#f2f5ee" opacity="0.7" data-drift="0 -60 0" />
        </svg>
      </ArtLayer>
    </>
  );
}
