/**
 * Datos del sitio. Edita este archivo para cambiar marca, contacto y enlaces.
 * Ningún componente escribe estos valores a mano: todos leen de aquí.
 */
export const site = {
  brand: "DiegoDev",
  owner: "Diego",
  location: "Aguascalientes, México",

  /** Portafolio principal (otro proyecto). El header y el contacto enlazan aquí. */
  portfolioUrl: "https://diegofdev.vercel.app/",

  email: "diegofernandezmar@hotmail.com",

  whatsapp: {
    /** Lada de país sin "+". México = 52. */
    countryCode: "52",
    /** Número a 10 dígitos, sin espacios. */
    number: "4491559359",
    /** Cómo se muestra el número en pantalla. */
    display: "449 155 9359",
    /** Mensaje precargado al abrir el chat. */
    message:
      "Hola Diego, vi tus ejemplos de sitios web animados y me gustaría una página así para mi negocio.",
  },

  /** Metadata (SEO y Open Graph). */
  title: "Ejemplos de sitios web animados | DiegoDev",
  description:
    "Mira lo que puedo crear para tu negocio: una sola página que se transforma en cafetería, gimnasio, clínica dental y taller mecánico mientras haces scroll. Sitios web animados hechos en Aguascalientes, México.",

  /**
   * Sección "Ejemplo en vivo". Cuando la ruta esté construida,
   * cambia `available` a true para quitar la etiqueta "Próximamente".
   */
  liveExample: {
    href: "/restaurante",
    available: false,
  },
} as const;

/** Enlace wa.me con lada de país y mensaje precargado. */
export const whatsappUrl = `https://wa.me/${site.whatsapp.countryCode}${site.whatsapp.number}?text=${encodeURIComponent(
  site.whatsapp.message,
)}`;

export const mailtoUrl = `mailto:${site.email}?subject=${encodeURIComponent(
  "Quiero un sitio web para mi negocio",
)}`;
