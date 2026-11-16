import type { ComponentType } from "react";
import CafeArt from "@/components/art/CafeArt";
import DentalArt from "@/components/art/DentalArt";
import GarageArt from "@/components/art/GarageArt";
import GymArt from "@/components/art/GymArt";

/**
 * Los cuatro giros del escenario. Cada escena declara aquí TODO lo que la
 * hace distinta: paleta, tipografía, textos, servicios e ilustración.
 * El orden del arreglo es el orden en que aparecen al hacer scroll.
 */

export type ScenePalette = {
  /** Fondo base de la escena. */
  bg: string;
  /** Superficie de tarjetas y chips. */
  surface: string;
  /** Texto principal. */
  ink: string;
  /** Texto secundario. */
  muted: string;
  /** Color de acento (títulos de apoyo, íconos, anillo de transición). */
  accent: string;
  /** Texto sobre el color de acento. */
  onAccent: string;
};

export type SceneTypography = {
  /** Variable CSS de la fuente display (se cargan en src/app/layout.tsx). */
  font: string;
  weight: number;
  uppercase: boolean;
  letterSpacing: string;
  lineHeight: number;
  /** Multiplicador del tamaño del titular (las condensadas piden más). */
  scale: number;
  /** Si las palabras con *énfasis* van en cursiva además de en color. */
  italicEmphasis?: boolean;
};

export type ScenePhotoConfig = {
  /** Ruta dentro de /public, por ejemplo "/images/cafe.webp". */
  src: string;
  /**
   * "fondo"   → foto a sangre que cubre la escena (WebP/JPG de 1920 px).
   * "recorte" → objeto con transparencia en el lugar de la ilustración (PNG/WebP).
   */
  variant: "fondo" | "recorte";
  /** Solo "fondo": opacidad del velo que ayuda a leer el texto (0 a 1). */
  scrim?: number;
};

export type Scene = {
  id: string;
  /** Tipo de negocio. Se muestra en el contador y en la etiqueta. */
  label: string;
  /** Nombre ficticio del negocio de ejemplo. */
  brand: string;
  /** Titular. Envuelve palabras entre *asteriscos* para darles énfasis. */
  title: string;
  description: string;
  servicesLabel: string;
  /** 3 o 4 cosas que se pueden construir para este tipo de negocio. */
  services: string[];
  palette: ScenePalette;
  typography: SceneTypography;
  /** De qué lado va la ilustración en escritorio. */
  layout: "art-right" | "art-left";
  /** Estilo de los chips de servicios. */
  chip: "pill" | "sharp" | "soft" | "plate";
  /**
   * Ilustración de la escena: un componente que devuelve sus capas
   * (<ArtLayer depth="back|mid|front">).
   */
  Art: ComponentType;
  /**
   * Opcional: foto que reemplaza a la ilustración. Guarda el archivo en
   * public/images y declara aquí su ruta (ver public/images/README.md).
   *   photo: { src: "/images/cafe.webp", variant: "fondo" }
   */
  photo?: ScenePhotoConfig;
};

export const scenes: Scene[] = [
  {
    id: "cafe",
    label: "Cafetería",
    brand: "Café Aurora",
    title: "El aroma de tu café, *ahora en línea.*",
    description:
      "Tu menú siempre al día, pedidos que llegan directo a tu WhatsApp y clientes que regresan por su recompensa.",
    servicesLabel: "Lo que puedo construir para tu cafetería",
    services: [
      "Menú digital con QR",
      "Pedidos por WhatsApp",
      "Tarjeta de lealtad",
      "Reserva de mesas",
    ],
    palette: {
      bg: "#f3e7d3",
      surface: "#fff8ea",
      ink: "#2b1a10",
      muted: "#664a36",
      accent: "#9a4d12",
      onAccent: "#fff6e6",
    },
    typography: {
      font: "var(--font-fraunces)",
      weight: 600,
      uppercase: false,
      letterSpacing: "-0.02em",
      lineHeight: 1.02,
      scale: 1,
      italicEmphasis: true,
    },
    layout: "art-right",
    chip: "pill",
    Art: CafeArt,
  },
  {
    id: "gym",
    label: "Gimnasio",
    brand: "Pulso Gym",
    title: "Más socios. Menos filas en *recepción.*",
    description:
      "Membresías que se pagan en línea, horarios que se consultan desde el celular y clases que se llenan solas.",
    servicesLabel: "Lo que puedo construir para tu gimnasio",
    services: [
      "Membresías en línea",
      "Horarios y clases",
      "Pagos y renovaciones",
      "Reserva de lugar",
    ],
    palette: {
      bg: "#0b0c10",
      surface: "#181a20",
      ink: "#f2f5ee",
      muted: "#b3b8c2",
      accent: "#c8ff2e",
      onAccent: "#0b0c10",
    },
    typography: {
      font: "var(--font-anton)",
      weight: 400,
      uppercase: true,
      letterSpacing: "0.005em",
      lineHeight: 1.04,
      scale: 1.12,
    },
    layout: "art-left",
    chip: "sharp",
    Art: GymArt,
  },
  {
    id: "dental",
    label: "Clínica dental",
    brand: "Clínica Sonríe",
    title: "Sonrisas que empiezan con una *cita fácil.*",
    description:
      "Tus pacientes agendan en un minuto, reciben su recordatorio y llegan confiando en tu trabajo.",
    servicesLabel: "Lo que puedo construir para tu clínica",
    services: [
      "Citas en línea",
      "Recordatorios automáticos",
      "Galería antes y después",
      "Ficha de tratamientos",
    ],
    palette: {
      bg: "#eef6fd",
      surface: "#ffffff",
      ink: "#0f2a47",
      muted: "#43607f",
      accent: "#1a63c0",
      onAccent: "#ffffff",
    },
    typography: {
      font: "var(--font-outfit)",
      weight: 500,
      uppercase: false,
      letterSpacing: "-0.03em",
      lineHeight: 1.06,
      scale: 0.98,
    },
    layout: "art-right",
    chip: "soft",
    Art: DentalArt,
  },
  {
    id: "taller",
    label: "Taller mecánico",
    brand: "Taller Torque",
    title: "Tu taller, con todo *bajo control.*",
    description:
      "Cada cliente sabe cómo va su auto, cotiza sin llamar y agenda su servicio en segundos.",
    servicesLabel: "Lo que puedo construir para tu taller",
    services: [
      "Seguimiento de órdenes",
      "Cotizador en línea",
      "Citas de servicio",
      "Historial por vehículo",
    ],
    palette: {
      bg: "#22262b",
      surface: "#2e3339",
      ink: "#f1f1ee",
      muted: "#b9c0c7",
      accent: "#ff6a13",
      onAccent: "#14171a",
    },
    typography: {
      font: "var(--font-barlow)",
      weight: 700,
      uppercase: true,
      letterSpacing: "0.005em",
      lineHeight: 0.98,
      scale: 1.2,
    },
    layout: "art-left",
    chip: "plate",
    Art: GarageArt,
  },
];
