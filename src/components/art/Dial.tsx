import { gearPath, SPARKLE_D, TOOTH_D } from "./shapes";

/** Colores de los cuatro giros (fondo del cuadrante + color del ícono). */
export const QUADRANTS = [
  { id: "cafe", bg: "#f1e3cc", ink: "#4a2a16", d: "M300 300L40 300A260 260 0 0 1 300 40Z" },
  { id: "gym", bg: "#14161a", ink: "#c8ff2e", d: "M300 300L300 40A260 260 0 0 1 560 300Z" },
  { id: "dental", bg: "#dcecfb", ink: "#2473d6", d: "M300 300L560 300A260 260 0 0 1 300 560Z" },
  { id: "taller", bg: "#3a4047", ink: "#ff6a13", d: "M300 300L300 560A260 260 0 0 1 40 300Z" },
] as const;

const MINI_GEAR_D = gearPath({ teeth: 8, outer: 46, root: 33, hole: 13 });

type DialProps = {
  className?: string;
  /** Color del fondo sobre el que se dibuja (separa los cuadrantes). */
  gap?: string;
};

/**
 * Dial de cuatro cuadrantes: el símbolo de "una página, cuatro giros".
 * Cada cuadrante es un tipo de negocio. Decorativo.
 */
export default function Dial({ className, gap = "#0c0b10" }: DialProps) {
  return (
    <svg className={className} viewBox="0 0 600 600" aria-hidden="true" focusable="false">
      <circle cx="300" cy="300" r="272" fill="none" stroke="#f5f1e8" strokeOpacity="0.16" strokeWidth="2" />

      {QUADRANTS.map((quad) => (
        <path key={quad.id} d={quad.d} fill={quad.bg} stroke={gap} strokeWidth="8" strokeLinejoin="round" data-dial-quad />
      ))}

      {/* Cafetería: taza con vapor */}
      <g transform="translate(194 198)" data-dial-icon>
        <ellipse cx="-2" cy="38" rx="48" ry="8" fill="#b5713a" />
        <path d="M32 0C54 -2 54 24 27 24" fill="none" stroke="#4a2a16" strokeWidth="8" strokeLinecap="round" />
        <path d="M-38 -8H34C34 18 23 34 8 34H-12C-27 34 -38 18 -38 -8Z" fill="#4a2a16" />
        <path
          d="M-16 -24C-23 -33 -9 -40 -16 -50M8 -24C1 -33 15 -40 8 -50"
          fill="none"
          stroke="#c07a3a"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>

      {/* Gimnasio: mancuerna */}
      <g transform="translate(406 194) rotate(-45)" fill="#c8ff2e" data-dial-icon>
        <rect x="-26" y="-6" width="52" height="12" rx="3" />
        <rect x="-42" y="-27" width="15" height="54" rx="5" />
        <rect x="27" y="-27" width="15" height="54" rx="5" />
        <rect x="-56" y="-18" width="11" height="36" rx="4" />
        <rect x="45" y="-18" width="11" height="36" rx="4" />
      </g>

      {/* Clínica dental: diente */}
      <g transform="translate(406 408)" data-dial-icon>
        <path d={TOOTH_D} fill="#2473d6" transform="scale(0.3) translate(-300 -300)" />
        <path d={SPARKLE_D} fill="#2473d6" transform="translate(48 -44) scale(0.8)" />
      </g>

      {/* Taller: engrane */}
      <g transform="translate(194 406)" data-dial-icon>
        <path d={MINI_GEAR_D} fill="#ff6a13" fillRule="evenodd" />
      </g>

      {/* Centro: flechas de giro */}
      <circle cx="300" cy="300" r="62" fill={gap} />
      <circle cx="300" cy="300" r="50" fill="none" stroke="#f5f1e8" strokeOpacity="0.22" strokeWidth="2" />
      <g fill="none" stroke="#f5f1e8" strokeWidth="6" strokeLinecap="round">
        <path d="M277.5 287A26 26 0 0 1 322.5 287" />
        <path d="M322.5 313A26 26 0 0 1 277.5 313" />
      </g>
      <g fill="#f5f1e8">
        <path d="M329 297L330 282L316 289Z" />
        <path d="M271 303L270 318L284 311Z" />
      </g>
    </svg>
  );
}

/** Versión mínima del dial para el logo. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 12H1A11 11 0 0 1 12 1Z" fill="#e9c79a" />
      <path d="M12 12V1A11 11 0 0 1 23 12Z" fill="#c8ff2e" />
      <path d="M12 12H23A11 11 0 0 1 12 23Z" fill="#4f9df0" />
      <path d="M12 12V23A11 11 0 0 1 1 12Z" fill="#ff6a13" />
      <circle cx="12" cy="12" r="3.4" fill="#0c0b10" />
    </svg>
  );
}
