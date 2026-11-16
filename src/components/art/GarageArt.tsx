import ArtLayer from "./ArtLayer";
import styles from "./art.module.css";
import { gearPath, hexPath, WRENCH_D } from "./shapes";

const ORANGE = "#ff6a13";

/**
 * Tres engranes que encajan. `spin` son los grados que gira cada uno durante
 * la escena: la proporción sigue el número de dientes (12 : 8 : 6) para que
 * se vean engranados mientras giran con el scroll.
 */
const GEARS = [
  { cx: 190, cy: 215, teeth: 12, outer: 120, root: 97, hole: 26, phase: -25, spin: 150, fill: "#59626d", inner: "#454c55", innerR: 74, holes: 6, holeR: 13, holeAt: 50 },
  { cx: 353.1, cy: 138.9, teeth: 8, outer: 84, root: 61, hole: 18, phase: 132.5, spin: -225, fill: ORANGE, inner: "#db520a", innerR: 44, holes: 4, holeR: 8, holeAt: 31 },
  { cx: 446, cy: 224, teeth: 6, outer: 66, root: 43, hole: 13, phase: 192.5, spin: 300, fill: "#aab2ba", inner: "#8a939c", innerR: 30, holes: 3, holeR: 5, holeAt: 21 },
];

const CAR_D =
  "M112 486C108 452 118 432 150 426L214 418C246 372 280 352 330 350L396 350C436 352 466 380 496 416L548 428C574 434 584 456 582 486C582 496 576 500 566 500H128C118 500 113 496 112 486Z";

const WHEELS = [212, 462];
const SPOKES = [0, 72, 144, 216, 288];

const NUTS = [
  { x: 58, y: 62, r: 26, fill: ORANGE, drift: "-10 -80 120" },
  { x: 562, y: 318, r: 17, fill: "#aab2ba", drift: "8 -60 -160" },
  { x: 30, y: 388, r: 15, fill: "#8a939c", drift: "-8 -120 200" },
];

/** Taller mecánico: engranes que giran con el scroll, llave y auto. */
export default function GarageArt() {
  return (
    <>
      {/* Fondo: placa de acero, retícula tipo plano y engrane gigante */}
      <ArtLayer depth="back" bleed>
        <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="taller-bg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#2e3339" />
              <stop offset="1" stopColor="#191c20" />
            </linearGradient>
            <pattern id="taller-grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M50 0H0V50" fill="none" stroke="#fff" strokeOpacity="0.04" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="1600" height="1000" fill="url(#taller-bg)" />
          <rect width="1600" height="1000" fill="url(#taller-grid)" />
          <polygon points="0,0 560,0 330,1000 0,1000" fill="#fff" opacity="0.022" />
          <g data-spin="40" data-origin="800 500" data-desktop-only>
            <path
              d={gearPath({ cx: 800, cy: 500, teeth: 18, outer: 470, root: 426 })}
              fill="none"
              stroke="#fff"
              strokeOpacity="0.07"
              strokeWidth="3"
            />
            <circle cx="800" cy="500" r="330" fill="none" stroke="#fff" strokeOpacity="0.05" strokeWidth="2" />
          </g>
        </svg>
      </ArtLayer>

      {/* Medio: engranes y auto sobre la rampa */}
      <ArtLayer depth="mid">
        <svg viewBox="0 0 600 600">
          <defs>
            <clipPath id="taller-car-clip">
              <path d={CAR_D} />
            </clipPath>
          </defs>

          {GEARS.map((gear) => (
            <g key={gear.teeth} data-spin={gear.spin} data-origin={`${gear.cx} ${gear.cy}`}>
              <path d={gearPath(gear)} fill={gear.fill} fillRule="evenodd" />
              <circle cx={gear.cx} cy={gear.cy} r={gear.innerR} fill="none" stroke={gear.inner} strokeWidth="5" />
              {Array.from({ length: gear.holes }, (_, i) => {
                const angle = ((Math.PI * 2) / gear.holes) * i + (gear.phase * Math.PI) / 180;
                return (
                  <circle
                    key={i}
                    cx={Math.round((gear.cx + gear.holeAt * Math.cos(angle)) * 100) / 100}
                    cy={Math.round((gear.cy + gear.holeAt * Math.sin(angle)) * 100) / 100}
                    r={gear.holeR}
                    fill={gear.inner}
                  />
                );
              })}
            </g>
          ))}

          {/* Chispas donde encajan los engranes */}
          <g stroke="#ffc46b" strokeWidth="4" strokeLinecap="round" data-desktop-only>
            <path className={styles.twinkle} d="M282 150l-12-16M296 158l4-20M276 166l-20-4" />
          </g>

          {/* Rampa y piso */}
          <path d="M20 558H580" stroke="#3a4047" strokeWidth="3" strokeLinecap="round" />
          <rect x="92" y="536" width="496" height="14" rx="7" fill={ORANGE} />
          <g fill="#1b1e22">
            <rect x="150" y="539" width="34" height="8" rx="4" />
            <rect x="282" y="539" width="34" height="8" rx="4" />
            <rect x="414" y="539" width="34" height="8" rx="4" />
          </g>

          {/* Auto: entra rodando con el scroll */}
          <g data-drift="6 0 0" data-drift-from="-44 0 0">
            <path d={CAR_D} fill="#dfe3e7" />
            <g clipPath="url(#taller-car-clip)">
              <rect x="100" y="462" width="500" height="44" fill="#aab2ba" />
              <rect x="100" y="456" width="500" height="6" fill={ORANGE} />
              {WHEELS.map((x) => (
                <circle key={x} cx={x} cy="492" r="54" fill="#15181b" />
              ))}
            </g>
            <path d="M252 414C276 380 300 366 332 364L392 364C424 366 446 386 468 414Z" fill="#1b1e22" />
            <path d="M286 414L318 366H336L304 414Z" fill="#fff" opacity="0.12" />
            <rect x="352" y="362" width="10" height="54" fill="#dfe3e7" />
            <path d="M357 416V456" stroke="#8a939c" strokeWidth="2" />
            <rect x="374" y="430" width="24" height="6" rx="3" fill="#8a939c" />
            <rect x="558" y="440" width="20" height="12" rx="6" fill="#ffc46b" />
            <rect x="113" y="436" width="14" height="14" rx="5" fill={ORANGE} />

            {WHEELS.map((x) => (
              <g key={x}>
                <circle cx={x} cy="492" r="44" fill="#101214" />
                <g data-spin="200" data-origin={`${x} 492`}>
                  <circle cx={x} cy="492" r="27" fill="#c3c9cf" />
                  {SPOKES.map((angle) => (
                    <rect
                      key={angle}
                      x={x - 3}
                      y={492 - 25}
                      width="6"
                      height="20"
                      rx="3"
                      fill="#59626d"
                      transform={`rotate(${angle} ${x} 492)`}
                    />
                  ))}
                  <circle cx={x} cy="492" r="8" fill={ORANGE} />
                </g>
              </g>
            ))}
          </g>
        </svg>
      </ArtLayer>

      {/* Primer plano: llave y tuercas */}
      <ArtLayer depth="front">
        <svg viewBox="0 0 600 600">
          <g transform="translate(492 86) rotate(-38)">
            <g data-drift="0 -30 14">
              <path d={WRENCH_D} fill="#14171a" opacity="0.35" transform="translate(8 8)" />
              <path d={WRENCH_D} fill="#e6e9ec" />
              <rect x="-70" y="-3" width="140" height="6" rx="3" fill="#aab2ba" />
            </g>
          </g>

          {NUTS.map((nut) => (
            <g key={`${nut.x}-${nut.y}`} transform={`translate(${nut.x} ${nut.y})`}>
              <path d={hexPath(nut.r, nut.r * 0.45)} fill={nut.fill} fillRule="evenodd" data-drift={nut.drift} />
            </g>
          ))}
        </svg>
      </ArtLayer>
    </>
  );
}
