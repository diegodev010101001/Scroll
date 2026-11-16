import ArtLayer from "./ArtLayer";
import styles from "./art.module.css";
import { SPARKLE_D, TOOTH_D } from "./shapes";

const CALENDAR_CELLS = [0, 1, 2, 3].flatMap((col) =>
  [0, 1].map((row) => ({ x: 16 + col * 31, y: 46 + row * 28, picked: col === 2 && row === 1 })),
);

/** Clínica dental: diente estilizado, destellos y tarjetas flotantes. */
export default function DentalArt() {
  return (
    <>
      {/* Fondo: formas suaves en azules y blanco */}
      <ArtLayer depth="back" bleed>
        <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="dental-bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f9fcff" />
              <stop offset="1" stopColor="#e1eefb" />
            </linearGradient>
            <pattern id="dental-plus" width="96" height="96" patternUnits="userSpaceOnUse">
              <path d="M48 40v16M40 48h16" stroke="#8fbdee" strokeWidth="3" strokeLinecap="round" />
            </pattern>
          </defs>
          <rect width="1600" height="1000" fill="url(#dental-bg)" />
          <circle cx="1180" cy="330" r="430" fill="#d3e6fa" opacity="0.6" />
          <circle cx="960" cy="860" r="320" fill="#fff" opacity="0.85" />
          <circle cx="260" cy="900" r="300" fill="#d3e6fa" opacity="0.45" />
          <circle cx="170" cy="120" r="190" fill="#fff" opacity="0.8" />
          <g fill="none" data-desktop-only>
            <circle cx="800" cy="500" r="520" stroke="#fff" strokeWidth="3" />
            <circle cx="800" cy="500" r="640" stroke="#c2ddf7" strokeWidth="2" />
          </g>
          <rect x="620" y="690" width="500" height="150" fill="url(#dental-plus)" opacity="0.35" data-desktop-only />
          <rect x="1060" y="40" width="500" height="300" fill="url(#dental-plus)" opacity="0.35" data-desktop-only />
        </svg>
      </ArtLayer>

      {/* Medio: disco azul con el diente */}
      <ArtLayer depth="mid">
        <svg viewBox="0 0 600 600">
          <defs>
            <linearGradient id="dental-disc" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#6ab0f3" />
              <stop offset="1" stopColor="#2473d6" />
            </linearGradient>
            <clipPath id="dental-tooth-clip">
              <path d={TOOTH_D} />
            </clipPath>
          </defs>
          <circle cx="300" cy="306" r="232" fill="#fff" opacity="0.55" />
          <circle cx="300" cy="300" r="214" fill="url(#dental-disc)" />
          <circle cx="300" cy="300" r="184" fill="none" stroke="#fff" strokeOpacity="0.28" strokeWidth="2" />
          <path d="M150 196A184 184 0 0 1 258 121" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="7" strokeLinecap="round" />

          <g transform="translate(300 304) scale(0.86) translate(-300 -300)">
            <path d={TOOTH_D} fill="#0f2a47" opacity="0.16" transform="translate(9 14)" />
            <path d={TOOTH_D} fill="#d6e7fa" />
            <g clipPath="url(#dental-tooth-clip)">
              <ellipse cx="262" cy="280" rx="130" ry="230" fill="#fff" />
            </g>
          </g>

          <g transform="translate(438 150) scale(1.5)">
            <path className={styles.twinkle} d={SPARKLE_D} fill="#fff" />
          </g>
          <g transform="translate(176 398) scale(0.9)">
            <path className={`${styles.twinkle} ${styles.delay2}`} d={SPARKLE_D} fill="#fff" />
          </g>
        </svg>
      </ArtLayer>

      {/* Primer plano: tarjetas de cita y sonrisa, destellos y burbujas */}
      <ArtLayer depth="front">
        <svg viewBox="0 0 600 600">
          {/* Tarjeta de cita */}
          <g transform="translate(430 52) rotate(7)">
            <g data-drift="0 -46 0">
              <rect x="5" y="9" width="150" height="110" rx="18" fill="#0f2a47" opacity="0.1" />
              <rect width="150" height="110" rx="18" fill="#fff" />
              <path d="M0 18A18 18 0 0 1 18 0H132A18 18 0 0 1 150 18V32H0Z" fill="#2a7de1" />
              <rect x="38" y="-8" width="8" height="18" rx="4" fill="#0f2a47" />
              <rect x="104" y="-8" width="8" height="18" rx="4" fill="#0f2a47" />
              {CALENDAR_CELLS.map((cell) => (
                <rect
                  key={`${cell.x}-${cell.y}`}
                  x={cell.x}
                  y={cell.y}
                  width="24"
                  height="20"
                  rx="6"
                  fill={cell.picked ? "#2a7de1" : "#e3effb"}
                />
              ))}
              <path d="M84 84l4 4 8-9" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>

          {/* Tarjeta de sonrisa */}
          <g transform="translate(6 440) rotate(-7)">
            <g data-drift="0 -80 0">
              <rect x="5" y="9" width="176" height="104" rx="22" fill="#0f2a47" opacity="0.1" />
              <rect width="176" height="104" rx="22" fill="#fff" />
              <path d="M48 44Q88 86 128 44" fill="none" stroke="#2a7de1" strokeWidth="11" strokeLinecap="round" />
              <g transform="translate(146 30) scale(0.7)">
                <path d={SPARKLE_D} fill="#7fd9c4" />
              </g>
            </g>
          </g>

          <g transform="translate(120 96) scale(1.5)">
            <path className={`${styles.twinkle} ${styles.delay1}`} d={SPARKLE_D} fill="#2a7de1" />
          </g>
          <g transform="translate(548 330) scale(1.1)">
            <path className={`${styles.twinkle} ${styles.delay3}`} d={SPARKLE_D} fill="#5aa3ec" />
          </g>
          <g transform="translate(486 536) scale(1.3)">
            <path className={styles.twinkle} d={SPARKLE_D} fill="#7fd9c4" />
          </g>

          <g fill="none" stroke="#5aa3ec" strokeWidth="4">
            <circle cx="52" cy="250" r="16" data-drift="0 -110 0" />
            <circle cx="560" cy="456" r="11" data-drift="0 -150 0" />
            <circle cx="34" cy="352" r="7" data-drift="0 -70 0" />
          </g>
        </svg>
      </ArtLayer>
    </>
  );
}
