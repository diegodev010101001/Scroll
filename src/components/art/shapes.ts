/**
 * Formas compartidas por las ilustraciones (trazos SVG generados con código).
 */

const round = (value: number) => Math.round(value * 100) / 100;

export type GearOptions = {
  /** Número de dientes. */
  teeth: number;
  /** Radio exterior (punta del diente). */
  outer: number;
  /** Radio interior (base del diente). */
  root: number;
  /** Radio del agujero central (0 = sin agujero). Usa fillRule="evenodd". */
  hole?: number;
  cx?: number;
  cy?: number;
  /** Ángulo del primer diente, en grados. */
  phase?: number;
};

/** Trazo de un engrane con dientes trapezoidales. */
export function gearPath({
  teeth,
  outer,
  root,
  hole = 0,
  cx = 0,
  cy = 0,
  phase = 0,
}: GearOptions): string {
  const step = (Math.PI * 2) / teeth;
  const start = (phase * Math.PI) / 180;
  const point = (radius: number, angle: number) =>
    `${round(cx + radius * Math.cos(angle))} ${round(cy + radius * Math.sin(angle))}`;

  const points: string[] = [];
  for (let i = 0; i < teeth; i += 1) {
    const angle = start + i * step;
    points.push(
      point(root, angle - step * 0.5),
      point(root, angle - step * 0.27),
      point(outer, angle - step * 0.15),
      point(outer, angle + step * 0.15),
      point(root, angle + step * 0.27),
    );
  }

  let d = `M${points.join("L")}Z`;
  if (hole > 0) {
    d += `M${round(cx + hole)} ${round(cy)}A${hole} ${hole} 0 1 0 ${round(cx - hole)} ${round(cy)}A${hole} ${hole} 0 1 0 ${round(cx + hole)} ${round(cy)}Z`;
  }
  return d;
}

/** Hexágono centrado en 0,0 con agujero circular opcional (fillRule="evenodd"). */
export function hexPath(radius: number, hole = 0): string {
  const points = Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i;
    return `${round(radius * Math.cos(angle))} ${round(radius * Math.sin(angle))}`;
  });
  let d = `M${points.join("L")}Z`;
  if (hole > 0) {
    d += `M${hole} 0A${hole} ${hole} 0 1 0 ${-hole} 0A${hole} ${hole} 0 1 0 ${hole} 0Z`;
  }
  return d;
}

/** Diente (molar) en un lienzo de 600×600, centrado en 300,300. */
export const TOOTH_D =
  "M300 150C270 118 215 112 192 150C165 195 185 265 200 320C212 365 215 440 240 468C262 490 275 440 280 400C284 370 290 350 300 350C310 350 316 370 320 400C325 440 338 490 360 468C385 440 388 365 400 320C415 265 435 195 408 150C385 112 330 118 300 150Z";

/** Destello de 4 puntas centrado en 0,0 (radio 20). */
export const SPARKLE_D =
  "M0 -20C2 -6 6 -2 20 0C6 2 2 6 0 20C-2 6 -6 2 -20 0C-6 -2 -2 -6 0 -20Z";

/** Rayo de energía (aprox. 95×180), con la esquina superior izquierda en 0,0. */
export const BOLT_D = "M50 0L0 96H38L12 178L94 68H52L78 0Z";

/**
 * Llave española horizontal centrada en 0,0 (largo aprox. 285).
 * Los trazos van en sentido horario y el agujero en antihorario, así se
 * rellena bien con la regla por defecto (nonzero), sin fillRule.
 */
export const WRENCH_D =
  "M-98 -10H100V10H-98Z" +
  // Extremo abierto
  "M139.9 11A30 30 0 1 1 139.9 -11L110 -11A11 11 0 0 0 110 11Z" +
  // Extremo de estrías (anillo con agujero)
  "M-85 0A27 27 0 1 1 -139 0A27 27 0 1 1 -85 0ZM-99 0A13 13 0 1 0 -125 0A13 13 0 1 0 -99 0Z";
