/* next/image no aplica basePath en el HTML del export estático (images.unoptimized). */
/* eslint-disable @next/next/no-img-element */
import { ButtonLink, Heading, Overline, Text } from "@/lib/design-system";
import { withBasePath } from "@/lib/site-path";

/** Paleta Design System v1: Negro #000, Blanco #FFF, Gris texto #333, Acento #F5F0E8. */
const FLASH_PRICE = "Flash $15.000";
const WIDTHS = [432, 648, 864] as const;

const FLASHES = [
  {
    id: "robot-botanico",
    title: "Autómata y zorro",
    file: "robot-botanico",
    alt: "Grabado a línea de un autómata cubierto de helechos que sostiene un plantín entre las manos, sentado junto a un zorro.",
  },
  {
    id: "arbol-red",
    title: "Árbol en red",
    file: "arbol-red",
    alt: "Grabado a línea de una persona encapuchada, de pie en una loma, contemplando un árbol cuyas ramas forman una red de nodos.",
  },
  {
    id: "cabana-wifi",
    title: "Cabaña y señal",
    file: "cabana-wifi",
    alt: "Grabado a línea de una cabaña en una colina: un gato mira un portátil en la ventana redonda, con una señal inalámbrica, una chimenea y una bicicleta junto al camino.",
  },
  {
    id: "ballena-circuito",
    title: "Ballena y circuito",
    file: "ballena-circuito",
    alt: "Grabado a línea de una ballena con trazos de circuito dentro de un óvalo ornamental, rodeada de minisubmarinos, coral y una constelación.",
  },
] as const;

function srcFor(file: string, width: number) {
  return withBasePath(`/img/flash-ghibli-tech/${file}-${width}.webp`);
}

function srcSet(file: string) {
  return WIDTHS.map((w) => `${srcFor(file, w)} ${w}w`).join(", ");
}

export function FlashGhibliTechSection() {
  return (
    <section
      id="flash-ghibli-tech"
      aria-labelledby="flash-ghibli-tech-heading"
      className="scroll-mt-24"
    >
      <div className="text-center lg:text-left">
        <Overline>Flash reservable</Overline>
        <Heading as="h2" id="flash-ghibli-tech-heading" className="mt-2 text-2xl sm:text-3xl">
          Flash Ghibli-tech
        </Heading>
        <Text size="sm" muted className="mx-auto mt-3 max-w-xl lg:mx-0">
          Diseños de práctica listos para agendar: café, tech, física y ciencias, en grabado a
          línea. Cada motivo sale {FLASH_PRICE}. La reserva sigue la agenda del sitio.
        </Text>
      </div>

      <ul className="m-0 mt-8 grid list-none gap-4 p-0 sm:mt-10 sm:grid-cols-2 sm:gap-6">
        {FLASHES.map((flash) => (
          <li key={flash.id}>
            <article
              id={flash.id}
              aria-labelledby={`${flash.id}-heading`}
              className="flex h-full scroll-mt-24 flex-col overflow-hidden rounded-2xl bg-[#F5F0E8] text-[#333333]"
            >
              <img
                src={srcFor(flash.file, 864)}
                srcSet={srcSet(flash.file)}
                sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
                alt={flash.alt}
                width={864}
                height={1152}
                loading="lazy"
                className="aspect-[3/4] w-full bg-white object-contain"
              />
              <div className="flex flex-1 flex-col p-5 sm:p-6">
                <Heading
                  as="h3"
                  id={`${flash.id}-heading`}
                  className="text-xl font-semibold tracking-wide text-black"
                >
                  {flash.title}
                </Heading>
                <p className="mt-2 text-sm font-medium text-[#333333]">
                  <span className="sr-only">Precio: </span>
                  {FLASH_PRICE}
                </p>
                <div className="mt-auto pt-4">
                  <ButtonLink
                    href="#reserva"
                    variant="brand"
                    size="md"
                    className="w-full"
                  >
                    Reservar una sesión
                    <span className="sr-only"> {flash.title}</span>
                  </ButtonLink>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
