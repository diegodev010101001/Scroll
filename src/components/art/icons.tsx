import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
} as const;

export function IconArrow(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconArrowLeft(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base} strokeWidth={2.4} {...props}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

/** Burbuja de chat con auricular (enlace de WhatsApp). */
export function IconChat(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.6-1.2A9 9 0 1 0 12 3Z" />
      <path d="M9 8.6c-.4 3 2.6 6.200 6 6.400l1-1.600-2-1.200-.9.9c-1-.4-1.900-1.300-2.300-2.300l.9-.9L10.500 7.900Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M4 7.500l8 6 8-6" />
    </svg>
  );
}

export function IconPin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-6.200 7-11.500A7 7 0 0 0 5 9.500C5 14.800 12 21 12 21Z" />
      <circle cx="12" cy="9.500" r="2.500" />
    </svg>
  );
}

/* Íconos de "Qué incluye" (48×48) ----------------------------------------- */

const big = { ...base, viewBox: "0 0 48 48", strokeWidth: 2.4 } as const;

export function IconSite(props: IconProps) {
  return (
    <svg {...big} {...props}>
      <rect x="5" y="8" width="38" height="30" rx="5" />
      <path d="M5 16h38" />
      <path d="M13 25h12M13 31h7" />
      <rect x="30" y="23" width="8" height="9" rx="2" fill="currentColor" stroke="none" />
      <circle cx="10.500" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconCalendar(props: IconProps) {
  return (
    <svg {...big} {...props}>
      <rect x="6" y="9" width="36" height="32" rx="6" />
      <path d="M6 19h36M16 5v8M32 5v8" />
      <path d="M18 30l4.500 4.500L31 26" />
    </svg>
  );
}

export function IconBag(props: IconProps) {
  return (
    <svg {...big} {...props}>
      <path d="M9 16h30l-2.500 22a4 4 0 0 1-4 3.500h-17a4 4 0 0 1-4-3.500L9 16Z" />
      <path d="M17 20v-6a7 7 0 0 1 14 0v6" />
      <path d="M19 30h10" />
    </svg>
  );
}

export function IconSystem(props: IconProps) {
  return (
    <svg {...big} {...props}>
      <rect x="5" y="6" width="16" height="16" rx="4" />
      <rect x="27" y="6" width="16" height="10" rx="4" />
      <rect x="27" y="22" width="16" height="20" rx="4" />
      <rect x="5" y="28" width="16" height="14" rx="4" />
      <path d="M10 14h6" />
    </svg>
  );
}
