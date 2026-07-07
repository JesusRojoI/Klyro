import { Users, Sparkles, ShieldCheck } from "lucide-react";
export function WhyUs() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="container-dm">
        <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.25em] text-primary">
          Klyro
        </span>
        <h2 className="max-w-2xl font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl">
          ¿Por qué escogernos?
        </h2>
        <p className="mt-5 max-w-xl text-base text-muted-foreground md:text-lg">
          Nuestro equipo está formado por profesionales altamente cualificados y creativos que comparten un objetivo común: ayudarte a alcanzar tus metas en línea.
        </p>
      </div>
    </section>
  );
}