# Imágenes de las escenas

Esta carpeta está vacía a propósito: hoy todas las ilustraciones del sitio son
SVG hechos con código (`src/components/art`). Cuando quieras usar **fotos
reales** de un negocio, guárdalas aquí y sigue estos pasos.

## 1. Prepara la foto

Hay dos formas de usar una foto, según el archivo que tengas:

| Tipo | Formato | Tamaño recomendado | Para qué sirve |
| --- | --- | --- | --- |
| **Fondo** | WebP o JPG | 1920 px de ancho (aprox. 1920×1280), menos de 400 KB | Cubre toda la escena, detrás del texto |
| **Recorte** | PNG o WebP **con transparencia** | 1200×1200 px, menos de 500 KB | Un objeto sin fondo (una taza, un auto) en el lugar de la ilustración |

Consejos:

- Prefiere **WebP**: pesa mucho menos que JPG o PNG con la misma calidad.
- Usa nombres simples, en minúsculas y sin espacios: `cafe.webp`, `taller-auto.png`.
- En fotos de fondo, deja "aire" del lado donde va el texto (izquierda en
  cafetería y dental, derecha en gimnasio y taller).

## 2. Copia el archivo aquí

```
public/images/cafe.webp
```

Todo lo que está en `public/` se sirve desde la raíz del sitio, así que esa
foto queda disponible en `/images/cafe.webp`.

## 3. Declara la foto en la escena

Abre `src/config/scenes.ts` y agrega el campo `photo` a la escena que quieras
cambiar. Mientras `photo` exista, reemplaza a la ilustración (`Art`):

```ts
{
  id: "cafe",
  // ...
  Art: CafeArt,
  photo: { src: "/images/cafe.webp", variant: "fondo" },
},
```

Opciones de `photo`:

- `variant: "fondo"`: la foto cubre toda la escena. Lleva un velo del color de
  fondo de la escena para que el texto se lea; ajústalo con `scrim` (de `0` a
  `1`, por defecto `0.55`). Ejemplo: `{ src: "/images/gym.jpg", variant: "fondo", scrim: 0.7 }`.
- `variant: "recorte"`: la imagen se coloca en la caja de la ilustración y se
  mueve con el parallax igual que el SVG original.

Para volver a la ilustración, borra la línea `photo`.

## 4. Combinar foto e ilustración (avanzado)

`Art` es cualquier componente que devuelva capas `<ArtLayer>`. Si quieres una
foto de fondo **y** capas SVG encima, crea un componente en
`src/components/art` y úsalo como `Art` (sin el campo `photo`):

```tsx
// src/components/art/CafeMixto.tsx
import ArtLayer from "./ArtLayer";
import ScenePhoto from "./ScenePhoto";

export default function CafeMixto() {
  return (
    <>
      <ScenePhoto src="/images/cafe.webp" variant="fondo" />
      <ArtLayer depth="front">
        <svg viewBox="0 0 600 600">{/* granos, destellos… */}</svg>
      </ArtLayer>
    </>
  );
}
```

Las fotos se optimizan solas con `next/image` (tamaños responsivos y carga
diferida), así que no necesitas generar varias versiones.
