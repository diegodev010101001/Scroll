import { ImageResponse } from "next/og";
import { site } from "@/config/site";

/** Imagen de Open Graph generada con código (sin archivos de imagen). */

export const alt = `Ejemplos de sitios web animados por ${site.brand}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const QUARTER = 188;

const quarters = [
  { background: "#e9c79a", borderTopLeftRadius: QUARTER },
  { background: "#c8ff2e", borderTopRightRadius: QUARTER },
  { background: "#ff6a13", borderBottomLeftRadius: QUARTER },
  { background: "#4f9df0", borderBottomRightRadius: QUARTER },
];

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "70px 84px",
          background: "#0c0b10",
          color: "#f5f1e8",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 640 }}>
          <div style={{ display: "flex", fontSize: 28, letterSpacing: 5, color: "#aaa6b8" }}>
            {`${site.brand.toUpperCase()} · EJEMPLOS EN VIVO`}
          </div>
          <div style={{ display: "flex", marginTop: 30, fontSize: 82, lineHeight: 1.04, letterSpacing: -3 }}>
            Sitios web que le dan un giro a tu negocio
          </div>
          <div style={{ display: "flex", marginTop: 36, fontSize: 29, color: "#aaa6b8" }}>
            Cafetería · Gimnasio · Clínica dental · Taller
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", width: QUARTER * 2 + 12, gap: 12 }}>
          {quarters.map((quarter) => (
            <div
              key={quarter.background}
              style={{ display: "flex", width: QUARTER, height: QUARTER, ...quarter }}
            />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
