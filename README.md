# DiegoDev · Ejemplos de sitios web animados

Página de ejemplos ("showcase") de **DiegoDev** (Aguascalientes, México). Muestra
con la propia página lo que se puede construir para negocios locales: sitios con
animaciones de scroll.

**Concepto: "Una página, cuatro giros".** Un escenario se queda fijo mientras
haces scroll y se transforma de cafetería a gimnasio, a clínica dental y a
taller mecánico: cambian colores, tipografía, ilustración y textos.

> Este proyecto es **independiente** del portafolio (`https://diegofdev.vercel.app/`).
> Tiene su propia carpeta, su propio repositorio y su propio proyecto en Vercel.
> Solo enlaza al portafolio; no depende de él para funcionar.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19 + TypeScript
- [GSAP](https://gsap.com) + ScrollTrigger, con `@gsap/react` (`useGSAP`) para el ciclo de vida
- [Lenis](https://lenis.darkroom.engineering) para el scroll suave, sincronizado con ScrollTrigger
- CSS Modules + un CSS global pequeño. Sin Tailwind ni librerías de UI
- `next/font` para las tipografías (se sirven desde el propio sitio)
- Ilustraciones 100 % SVG hechas con código. No hay fotos ni imágenes externas

## Cómo correrlo

Necesitas Node.js 20.9 o más reciente.

```bash
npm install      # instala dependencias
npm run dev      # desarrollo en http://localhost:3000
npm run build    # compila para producción (revisa TypeScript)
npm run start    # sirve la versión compilada
npm run lint     # ESLint
```

## Estructura

```
src/
├─ app/
│  ├─ layout.tsx            Fuentes, metadata (SEO / Open Graph), header y scroll suave
│  ├─ page.tsx              La página: ordena las secciones
│  ├─ globals.css           Colores, reset, botones y utilidades
│  ├─ icon.svg              Favicon
│  ├─ opengraph-image.tsx   Imagen para redes, generada con código
│  └─ restaurante/          Placeholder del ejemplo en vivo ("Próximamente")
├─ config/
│  ├─ site.ts               ← TUS DATOS: marca, WhatsApp, correo, portafolio
│  └─ scenes.ts             ← LOS CUATRO GIROS: paleta, textos, servicios, ilustración
├─ components/              Una sección por archivo (+ su .module.css)
│  ├─ Hero · Intro · Stage · Process · Includes · LiveExample · Contact
│  ├─ Header · Footer · SmoothScroll · SplitWords · StageScroller
│  └─ art/                  Ilustraciones SVG (CafeArt, GymArt, DentalArt, GarageArt, Dial…)
├─ hooks/
│  ├─ useSmoothScroll.ts    Lenis + ScrollTrigger (y su limpieza)
│  ├─ useScrollMotion.ts    Ciclo de vida común de las animaciones por sección
│  └─ useStageTimeline.ts   El timeline del escenario de los cuatro giros
└─ lib/
   ├─ gsap.ts               Registro de plugins y cortes de pantalla
   └─ reveal.ts             Apariciones reutilizables
public/images/              Vacía. Lee su README para usar fotos en lugar de ilustraciones
```

## Editar tus datos

Todo está en **`src/config/site.ts`**. Ningún componente tiene estos datos
escritos a mano:

| Campo | Qué es |
| --- | --- |
| `brand`, `owner`, `location` | Marca, tu nombre y ubicación |
| `portfolioUrl` | URL del portafolio. La usan el header ("← Volver al portafolio"), el botón "Ver mi portafolio completo" y el footer |
| `email` | Correo de contacto |
| `whatsapp.countryCode` + `whatsapp.number` | Arman el enlace `wa.me` (México = `52` + 10 dígitos) |
| `whatsapp.display` | Cómo se muestra el número |
| `whatsapp.message` | Mensaje precargado al abrir el chat |
| `title`, `description` | Metadata para Google y redes |
| `liveExample` | Ruta del ejemplo en vivo y si ya está disponible |

## Editar los cuatro giros

Todo está en **`src/config/scenes.ts`**. Cada escena declara:

| Campo | Qué controla |
| --- | --- |
| `label` | Tipo de negocio (contador y etiqueta) |
| `brand` | Nombre ficticio del negocio de ejemplo |
| `title` | Titular. Pon palabras entre `*asteriscos*` para resaltarlas |
| `description` | Texto de apoyo |
| `servicesLabel`, `services` | Los 3 o 4 chips de "lo que puedo construir" |
| `palette` | Fondo, superficie, texto, texto secundario, acento y texto sobre acento |
| `typography` | Fuente display, peso, mayúsculas, interletrado, interlineado y escala |
| `layout` | `"art-right"` o `"art-left"`: de qué lado va la ilustración en escritorio |
| `chip` | Estilo de chips: `"pill"`, `"sharp"`, `"soft"` o `"plate"` |
| `Art` | Componente con la ilustración (carpeta `src/components/art`) |
| `photo` | Opcional: foto que reemplaza a la ilustración |

Cosas útiles:

- **Cambiar textos o colores:** edita el objeto de la escena y guarda.
- **Reordenar:** cambia el orden del arreglo `scenes`.
- **Agregar o quitar un giro:** agrega o quita un objeto. El escenario, el
  contador (`01 / 04`) y la barra de progreso se ajustan solos al total.
- **Cuidar el contraste:** `ink` sobre `bg` y `onAccent` sobre `accent` deben
  leerse bien (los cuatro actuales cumplen WCAG AA).
- **Usar otra tipografía:** cárgala en `src/app/layout.tsx` con `next/font`,
  dale una variable (por ejemplo `--font-mifuente`) y úsala en
  `typography.font: "var(--font-mifuente)"`.

### Ilustraciones

Cada ilustración es un componente que devuelve capas `<ArtLayer>`:

```tsx
<ArtLayer depth="back" bleed>…</ArtLayer>  // fondo a sangre (cubre toda la escena)
<ArtLayer depth="mid">…</ArtLayer>         // medio: la "caja de arte" junto al texto
<ArtLayer depth="front">…</ArtLayer>       // primer plano (no se muestra en móvil)
```

El escenario mueve cada capa a distinta velocidad (parallax). Dentro del SVG
puedes marcar elementos para que reaccionen al scroll, sin tocar el código de
animación:

| Atributo | Efecto |
| --- | --- |
| `data-spin="150" data-origin="190 215"` | Gira 150° alrededor de ese punto (engranes, rines) |
| `data-drift="20 -80 45"` | Se desplaza `x y` y rota durante la escena (granos, tuercas) |
| `data-drift-from="-40 0 0"` | Posición inicial del desplazamiento |
| `data-desktop-only` | No se muestra en pantallas pequeñas |

Las clases `steam`, `pulse`, `twinkle` y `bob` de `art.module.css` dan
movimiento en reposo (vapor, pulsos, destellos) y solo corren en la escena activa.

### Usar fotos en lugar de ilustraciones

Guarda la foto en `public/images` y decláralo en la escena:

```ts
photo: { src: "/images/cafe.webp", variant: "fondo" },
```

Formatos, tamaños y opciones: **`public/images/README.md`**.

## Cómo funcionan las animaciones

- **Scroll suave:** `useSmoothScroll` crea Lenis, avisa a ScrollTrigger en cada
  scroll (`lenis.on("scroll", ScrollTrigger.update)`) y usa `gsap.ticker` como
  único reloj. Al desmontar se quita el ticker y se destruye la instancia.
- **Secciones fijas:** el "pin" se hace con CSS (`position: sticky`), así el
  navegador lo fija sin saltos en celulares. ScrollTrigger solo mueve los
  timelines con el scroll (`scrub`).
- **Cambio de giro:** cada escena se abre sobre la anterior con un
  `clip-path: circle()` que crece desde su ilustración, precedido por un anillo
  del color de acento.
- **Rendimiento:** solo se animan `transform`, `opacity` y `clip-path`. Las
  escenas que no se ven no se pintan, y `will-change` se aplica solo a las
  capas de la escena visible.
- **Móvil:** menos capas (sin primer plano ni anillo), parallax reducido y
  menos animaciones en reposo. El cambio de giro con scroll se mantiene.
- **`prefers-reduced-motion`:** con `gsap.matchMedia` no se crea nada de GSAP
  ni Lenis. El CSS deja la versión estática: sin secciones fijas ni parallax,
  con las cuatro escenas apiladas y legibles.
- **Limpieza:** todo lo de GSAP se crea dentro de `useGSAP`
  (`useScrollMotion`), que lo revierte al desmontar. No quedan ScrollTriggers
  duplicados en modo estricto ni al navegar entre rutas.

## Ejemplo en vivo (`/restaurante`)

Hoy es un placeholder ("Próximamente: ejemplo de restaurante") en
`src/app/restaurante/page.tsx`. Cuando construyas la ruta real, cambia
`liveExample.available` a `true` en `src/config/site.ts` para quitar la
etiqueta "Próximamente" del botón.

## Desplegar en Vercel (proyecto nuevo)

No necesita configuración especial: sin `basePath`, sin variables obligatorias
y sin depender de otro dominio.

### 1. Crea el repositorio nuevo

Desde esta carpeta:

```bash
git init
git add .
git commit -m "Sitio de ejemplos animados"
```

Luego crea un repositorio **vacío** en GitHub (por ejemplo `diegodev-ejemplos`,
sin README ni .gitignore) y conéctalo:

```bash
git branch -M main
git remote add origin https://github.com/TU-USUARIO/diegodev-ejemplos.git
git push -u origin main
```

Con GitHub CLI es un solo paso después del commit:

```bash
gh repo create diegodev-ejemplos --private --source=. --push
```

### 2. Impórtalo en Vercel

1. Entra a [vercel.com/new](https://vercel.com/new).
2. En **Import Git Repository** elige `diegodev-ejemplos`.
3. En **Project Name** escribe `diegodev-ejemplos`. Ese nombre define la URL.
4. Deja todo lo demás como viene (Vercel detecta Next.js) y pulsa **Deploy**.

Al terminar, el sitio queda en `https://diegodev-ejemplos.vercel.app` (si el
nombre está libre). Cada `git push` a `main` vuelve a desplegar.

### 3. Cambiar el nombre después

Si el proyecto se creó con otro nombre:

1. **Settings → General → Project Name**: cámbialo a `diegodev-ejemplos` y guarda.
2. **Settings → Domains**: si la URL no cambió sola, agrega
   `diegodev-ejemplos.vercel.app` y, si quieres, elimina la anterior.

### 4. (Opcional) Dominio propio

Las imágenes de Open Graph usan la URL de producción que Vercel asigna. Si
conectas un dominio propio, agrega en **Settings → Environment Variables**:

```
NEXT_PUBLIC_SITE_URL=https://tudominio.com
```

### 5. Enlázalo desde tu portafolio

En el proyecto del portafolio (aparte) agrega un enlace a la URL nueva. Este
sitio ya regresa al portafolio desde el header y desde el contacto.

## Verificación

Lo que conviene revisar antes de publicar cambios:

- `npm run build` y `npm run lint` sin errores.
- Hero, los cuatro giros y el contacto en escritorio y en celular.
- Sin scroll horizontal de 360 px a 1920 px.
- Con "reducir movimiento" activado en el sistema, la página se lee completa
  y sin animaciones.
