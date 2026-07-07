import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden hero-glow">
      {/* extra ambient glows */}
      <div className="pointer-events-none absolute -right-40 top-24 h-[520px] w-[520px] rounded-full bg-primary/25 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[380px] w-[720px] -translate-x-1/2 bg-primary/10 blur-[120px]" />

      <div className="container-dm relative pt-32 md:pt-36">
        {/* Tu Código */}
        <h1 className="animate-fade-up font-display text-[19vw] font-bold leading-[0.9] tracking-tight text-white sm:text-[15vw] lg:text-[150px]">
          Tu Código
        </h1>

        {/* list + right bubble */}
        <div className="relative mt-8 flex flex-col gap-10 md:mt-12 md:flex-row md:items-start md:justify-between">
          <ul className="animate-fade-up space-y-3 text-lg text-white/85 [animation-delay:120ms] md:text-xl">
            {["Desarrollo de Software", "Capacitación", "Formación"].map(
              (item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {item}
                </li>
              ),
            )}
          </ul>

          <div className="bubble animate-fade-up w-full max-w-sm p-6 [animation-delay:220ms] md:mt-2">
            <span className="mb-4 block h-9 w-9 rounded-full bg-primary shadow-[0_0_30px_-4px_rgba(31,218,113,0.9)]" />
            <p className="text-lg font-semibold leading-snug text-white">
              Convierte el conocimiento en tu mayor ventaja competitiva.
            </p>
          </div>
        </div>

        {/* laptop */}
        <div className="relative z-10 -mt-2 md:-mt-16">
          <img
  src="/laptop.png"
  alt="Klyro - Soluciones tecnológicas inteligentes"
  className="mx-auto w-full max-w-[680px] animate-float drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
/>
        </div>

        {/* bottom-left CTA bubble overlapping the laptop */}
        <div className="relative z-20 md:-mt-24 lg:-mt-32">
          <div className="bubble animate-fade-up max-w-md p-6 [animation-delay:120ms]">
            <p className="text-lg font-medium leading-snug text-white/90">
              Haz crecer tu negocio con soluciones tecnológicas a la medida.
            </p>
            <a
  href="/cotiza"
  className="group mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(31,218,113,0.7)] transition-transform hover:scale-[1.03] active:scale-95"
>
              ¡Comencemos hoy!
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* Tu Visión */}
        <h1 className="mt-14 pb-4 text-right font-display text-[16vw] font-bold leading-[0.9] tracking-tight text-white sm:text-[13vw] lg:text-[130px]">
  Tu Visión
</h1>
      </div>

      {/* fade to next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
}