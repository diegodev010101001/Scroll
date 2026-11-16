import ArtLayer from "./ArtLayer";
import styles from "./art.module.css";

const CUP_D =
  "M206 318H394C394 388 372 440 336 444H264C228 440 206 388 206 318Z";
const WINDOW_D = "M150 452V200A150 150 0 0 1 450 200V452Z";

const BEANS = [
  { x: 36, y: 168, rotate: -32, scale: 1.5, drift: "-18 -70 -50" },
  { x: 566, y: 96, rotate: 40, scale: 1.15, drift: "22 -90 70" },
  { x: 22, y: 566, rotate: 18, scale: 1.25, drift: "-12 -120 40" },
  { x: 584, y: 548, rotate: -52, scale: 1.7, drift: "26 -150 -60" },
  { x: 508, y: 262, rotate: 12, scale: 0.9, drift: "14 -60 90" },
];

/** Cafetería: ventana con luz cálida, tazas con vapor y granos de café. */
export default function CafeArt() {
  return (
    <>
      {/* Fondo: pared cálida con luz entrando */}
      <ArtLayer depth="back" bleed>
        <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="cafe-wall" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f9efdc" />
              <stop offset="1" stopColor="#ead4b0" />
            </linearGradient>
            <radialGradient id="cafe-glow">
              <stop offset="0" stopColor="#ffcf87" stopOpacity="0.95" />
              <stop offset="1" stopColor="#ffcf87" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1600" height="1000" fill="url(#cafe-wall)" />
          <circle cx="1060" cy="430" r="560" fill="url(#cafe-glow)" />
          <polygon points="1600,0 1600,240 560,1000 240,1000" fill="#fff" opacity="0.17" />
          <polygon points="1300,0 1450,0 150,1000 60,1000" fill="#fff" opacity="0.13" />
          <g fill="#c9925a" opacity="0.2" data-desktop-only>
            <circle cx="150" cy="170" r="7" />
            <circle cx="230" cy="110" r="4" />
            <circle cx="96" cy="270" r="4" />
            <circle cx="1500" cy="880" r="7" />
            <circle cx="1420" cy="930" r="4" />
          </g>
        </svg>
      </ArtLayer>

      {/* Fondo de la caja: ventana en arco */}
      <ArtLayer depth="back">
        <svg viewBox="0 0 600 600">
          <defs>
            <linearGradient id="cafe-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#fbd08f" />
              <stop offset="0.55" stopColor="#f6b46c" />
              <stop offset="1" stopColor="#ea9550" />
            </linearGradient>
            <clipPath id="cafe-window-clip">
              <path d={WINDOW_D} />
            </clipPath>
          </defs>
          <path d={WINDOW_D} fill="url(#cafe-sky)" />
          <g clipPath="url(#cafe-window-clip)">
            <circle cx="378" cy="158" r="44" fill="#fff3d4" />
            <path
              d="M150 452V352C200 322 250 330 300 356C350 380 400 330 450 342V452Z"
              fill="#e58f4b"
            />
            <path
              d="M150 452V398C210 376 262 392 320 410C370 424 410 398 450 392V452Z"
              fill="#cf7638"
            />
          </g>
          <path d="M300 52V452M150 232H450" stroke="#7a4a2a" strokeWidth="9" />
          <path d={WINDOW_D} fill="none" stroke="#7a4a2a" strokeWidth="13" />
        </svg>
      </ArtLayer>

      {/* Medio: repisa, taza grande, espresso y bolsa de café */}
      <ArtLayer depth="mid">
        <svg viewBox="0 0 600 600">
          <defs>
            <linearGradient id="cafe-cup" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#fffdf7" />
              <stop offset="1" stopColor="#ecd9bb" />
            </linearGradient>
            <clipPath id="cafe-cup-clip">
              <path d={CUP_D} />
            </clipPath>
          </defs>

          {/* Repisa */}
          <path d="M112 474h40l-40 40z" fill="#55331c" />
          <path d="M488 474h-40l40 40z" fill="#55331c" />
          <rect x="74" y="472" width="452" height="12" rx="6" fill="#2b1a10" opacity="0.14" />
          <rect x="44" y="450" width="512" height="24" rx="12" fill="#6b4226" />
          <rect x="60" y="454" width="480" height="5" rx="2.5" fill="#8a5a36" />

          {/* Bolsa de café */}
          <path d="M466 452V372L478 354H532L544 372V452Z" fill="#c9a36b" />
          <path d="M466 372L478 354H532L544 372Z" fill="#b38a50" />
          <rect x="476" y="346" width="58" height="12" rx="4" fill="#9c7440" />
          <circle cx="505" cy="412" r="19" fill="#2b1a10" />
          <ellipse cx="505" cy="412" rx="9" ry="6.5" fill="#c9a36b" transform="rotate(-30 505 412)" />

          {/* Espresso */}
          <ellipse cx="106" cy="451" rx="48" ry="6" fill="#8f3f1f" />
          <path d="M136 412C154 410 154 434 131 436" fill="none" stroke="#b5532a" strokeWidth="7" strokeLinecap="round" />
          <path d="M76 404H136C136 432 128 446 116 447H96C84 446 76 432 76 404Z" fill="#b5532a" />
          <ellipse cx="106" cy="404" rx="30" ry="5.5" fill="#cf6f43" />
          <ellipse cx="106" cy="405" rx="23" ry="3.6" fill="#3b2112" />

          {/* Vapor */}
          <g fill="none" stroke="#fffaf0" strokeWidth="9" strokeLinecap="round">
            <path className={styles.steam} d="M262 296C246 272 278 252 262 228C250 210 266 198 262 186" />
            <path
              className={`${styles.steam} ${styles.delay1}`}
              d="M300 290C282 262 318 240 300 212C286 190 306 174 300 158"
            />
            <path
              className={`${styles.steam} ${styles.delay2}`}
              d="M338 296C322 272 354 252 338 228C326 210 342 198 338 186"
            />
          </g>

          {/* Taza grande */}
          <ellipse cx="300" cy="455" rx="124" ry="8" fill="#2b1a10" opacity="0.2" />
          <ellipse cx="300" cy="448" rx="130" ry="14" fill="#fffaf0" />
          <ellipse cx="300" cy="446" rx="96" ry="8" fill="#ead9bd" />
          <path d="M392 340C442 334 448 404 376 410" fill="none" stroke="#fffaf0" strokeWidth="17" strokeLinecap="round" />
          <path d={CUP_D} fill="url(#cafe-cup)" />
          <g clipPath="url(#cafe-cup-clip)">
            <rect x="200" y="368" width="200" height="20" fill="#c07a3a" />
            <rect x="200" y="394" width="200" height="6" fill="#c07a3a" opacity="0.5" />
          </g>
          <ellipse cx="300" cy="318" rx="94" ry="15" fill="#fffdf8" />
          <ellipse cx="300" cy="320" rx="82" ry="11" fill="#5a341c" />
          <ellipse cx="300" cy="320" rx="34" ry="5" fill="#e9cfa6" />
          <ellipse cx="300" cy="320" rx="16" ry="2.4" fill="#5a341c" />
        </svg>
      </ArtLayer>

      {/* Primer plano: lámpara y granos flotando */}
      <ArtLayer depth="front">
        <svg viewBox="0 0 600 600">
          <path d="M70 -260V56" stroke="#2b1a10" strokeWidth="4" />
          <circle cx="70" cy="104" r="40" fill="#ffd98f" opacity="0.3" />
          <path d="M26 100A44 48 0 0 1 114 100Z" fill="#2b1a10" />
          <circle cx="70" cy="103" r="11" fill="#ffe2a8" />

          {BEANS.map((bean) => (
            <g
              key={`${bean.x}-${bean.y}`}
              transform={`translate(${bean.x} ${bean.y}) rotate(${bean.rotate}) scale(${bean.scale})`}
            >
              <g data-drift={bean.drift}>
                <ellipse rx="17" ry="12" fill="#4a2a16" />
                <path d="M-13 -3C-5 4 5 -4 13 3" fill="none" stroke="#2b1a10" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            </g>
          ))}
        </svg>
      </ArtLayer>
    </>
  );
}
