/* next/image no aplica basePath en el HTML del export estático (images.unoptimized). */
/* eslint-disable @next/next/no-img-element */
import { ButtonLink, Heading, Overline, Text } from "@/lib/design-system";
import { withBasePath } from "@/lib/site-path";

/**
 * Las cuatro artes del estudio, en el orden del flyer.
 * Texto en crema #F5F0E8: negro #000 y gris #333 (Design System v1). Nunca #3D9461 sobre #F5F0E8.
 */
const ARTES = [
  {
    id: "tatuaje",
    number: "01",
    title: "Tatuaje",
    description:
      "Grabado estilo Ghibli · café, tech, física, ciencias",
    price: "Flash $15.000",
    safety: "Material estéril, un solo uso",
    src: "/img/artes/01-tatuaje-900.webp",
    srcSet: [
      "/img/artes/01-tatuaje-600.webp 600w",
      "/img/artes/01-tatuaje-900.webp 900w",
      "/img/artes/01-tatuaje-1200.webp 1200w",
    ].join(", "),
    sizes: "(min-width: 1024px) 28rem, (min-width: 640px) 50vw, 100vw",
    width: 1200,
    height: 1200,
    alt: "Ilustración de un tatuador con delantal y guantes aplicando un helecho en un antebrazo, frente a láminas botánicas.",
  },
  {
    id: "shibari",
    number: "02",
    title: "Shibari",
    description:
      "Arte de la cuerda: nudos, ritmo y presencia, en un encuentro pausado y acordado.",
    safety: "Consentimiento y palabra de seguridad",
    src: "/img/artes/02-shibari.webp",
    alt: "Ilustración de un huevo envuelto en una red de cuerda anudada, sobre una base de madera junto a un rollo de cuerda y un helecho.",
  },
  {
    id: "fotografia",
    number: "03",
    title: "Fotografía",
    description:
      "Retrato y registro del estudio, con luz cuidada y un acuerdo claro antes de cada toma.",
    safety: "Acuerdos previos, confidencial",
    src: "/img/artes/03-fotografia.webp",
    alt: "Ilustración de una cámara de formato medio sobre trípode, con softbox, plantas y un taburete frente a un fondo de estudio.",
  },
  {
    id: "sesiones-dom",
    number: "04",
    title: "Sesiones dom",
    description:
      "Acompañamiento de una dinámica de roles acordada, con tiempo definido y un marco de cuidado.",
    safety: "Límites por escrito",
    src: "/img/artes/04-sesiones-dom.webp",
    alt: "Ilustración de un sillón tallado con un rollo de cuerda y guantes, junto a una mesa con vela, antifaz ornamental, llave y helechos.",
  },
] as const;
function withSrcSet(srcSet: string) {
  return srcSet
    .split(",")
    .map((entry) => {
      const [path, descriptor] = entry.trim().split(/\s+/);
      return `${withBasePath(path)} ${descriptor}`;
    })
    .join(", ");
}

export function ArtesSection() {
  return (
    <section id="servicios" aria-labelledby="servicios-heading" className="scroll-mt-24">
      <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-12">
        <div className="text-center lg:text-left">
          <Overline>El estudio</Overline>
          <Heading as="h2" id="servicios-heading" className="mt-2 text-2xl sm:text-3xl">
            Cuatro artes
          </Heading>
          <Text size="sm" muted className="mx-auto mt-3 max-w-xl lg:mx-0">
            Tatuaje, shibari, fotografía y sesiones dom. Cada práctica tiene su cuidado; la reserva
            sigue la agenda del sitio.
          </Text>
        </div>
        <figure className="overflow-hidden rounded-2xl border border-[#000000]/40 bg-[#F5F0E8]">
          <img
            src={withBasePath("/img/artes/hero-estudio.webp")}
            alt="Ilustración del estudio: un autómata con plantas sostiene musgo junto a un zorro, una cámara, un rollo de cuerda y una máquina de tatuar."
            width={900}
            height={1200}
            className="mx-auto h-auto w-full max-w-md lg:max-w-none"
          />
        </figure>
      </div>

      <ul className="m-0 mt-8 grid list-none gap-4 p-0 sm:mt-10 sm:grid-cols-2 sm:gap-6">
        {ARTES.map((arte) => (
          <li key={arte.id}>
            <article
              id={arte.id}
              aria-labelledby={`${arte.id}-heading`}
              className="flex h-full scroll-mt-24 flex-col overflow-hidden rounded-2xl bg-[#F5F0E8] text-[#333333]"
            >
              <img
                src={withBasePath(arte.src)}
                srcSet={"srcSet" in arte ? withSrcSet(arte.srcSet) : undefined}
                sizes={"sizes" in arte ? arte.sizes : undefined}
                alt={arte.alt}
                width={"width" in arte ? arte.width : 1200}
                height={"height" in arte ? arte.height : 1200}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <p className="text-sm font-semibold tracking-[0.22em] text-[#000000]">
                  <span className="sr-only">Módulo </span>
                  {arte.number}
                </p>
                <Heading
                  as="h3"
                  id={`${arte.id}-heading`}
                  className="mt-2 text-xl font-semibold tracking-wide text-[#333333]"
                >
                  {arte.title}
                </Heading>
                <p className="mt-2 text-sm leading-relaxed text-[#333333]">{arte.description}</p>
                <div className="mt-auto pt-4">
                  {"price" in arte ? (
                    <p className="mb-3 text-sm font-medium text-[#000000]">
                      <span className="sr-only">Precio: </span>
                      {arte.price}
                    </p>
                  ) : null}
                  <p className="border-t border-[#000000]/35 pt-3 text-sm font-medium text-[#000000]">
                    <span className="sr-only">Cuidado: </span>
                    {arte.safety}
                  </p>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>

      <div className="mt-8 text-center sm:mt-10">
        <ButtonLink href="#reserva" variant="brand" size="lg">
          Reservar una sesión
        </ButtonLink>
      </div>
    </section>
  );
}
