import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Desarrollo de Aplicaciones",
    description:
      "Creamos aplicaciones modernas, seguras y escalables para web y dispositivos móviles, adaptadas a las necesidades de tu negocio.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop&q=80",
    href: "/desarrollo-de-aplicaciones/",
  },
  {
    title: "Desarrollo Empresarial",
    description:
      "Diseñamos soluciones tecnológicas para optimizar procesos, mejorar la productividad y apoyar el crecimiento sostenible de tu empresa.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&q=80",
    href: "/desarrollo-empresarial/",
  },
  {
    title: "Desarrollo de software Especializado",
    description:
      "Desarrollamos software a medida para la gestión financiera, contable y administrativa, con herramientas que agilizan y aseguran la operación.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop&q=80",
    href: "/desarrollo-software-especializado/",
  },
  {
    title: "Sistemas de Inventario y Logística",
    description:
      "Implementamos sistemas eficientes de control de inventarios y logística que garantizan precisión, trazabilidad y optimización de recursos.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop&q=80",
    href: "/sistemas-inventario-logistica/",
  },
  {
    title: "Servicios complementarios",
    description:
      "Soporte, mantenimiento y consultoría tecnológica que acompañan cada solución para mantener tu operación segura, actualizada y siempre en marcha.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop&q=80",
    href: "/servicios-complementarios/",
  },
];

export function Services() {
  return (
    <section id="servicios" className="relative py-20 md:py-28">
      <div className="container-dm">
        <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.25em] text-primary">
          Tu Visión
        </span>
        <h2 className="max-w-2xl font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl">
          Impulsa tu negocio
        </h2>
        <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
          Tu negocio merece tecnología de vanguardia. Escríbenos y lo hacemos
          posible.
        </p>

        <div className="mt-14 divide-y divide-white/10 border-t border-white/10">
          {services.map((service) => (
            <article
              key={service.title}
              className="group grid grid-cols-1 items-center gap-6 py-9 md:grid-cols-2 md:gap-12"
            >
              <div>
                <h3 className="font-display text-2xl font-semibold text-white md:text-[28px]">
                  {service.title}
                </h3>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <a
                  href={service.href}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03] active:scale-95"
                >
                  Conoce Nuestros Planes
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>

              <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-105 md:h-56"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}