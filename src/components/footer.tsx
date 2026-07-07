import { MapPin, Mail, Phone } from "lucide-react";
import Image from "next/image";

const developmentLinks = [
  { label: "Desarrollo de Aplicaciones", href: "/desarrollo-de-aplicaciones/" },
  { label: "Desarrollo Empresarial", href: "/desarrollo-empresarial/" },
  { label: "Desarrollo de Software Especializado", href: "/desarrollo-software-especializado/" },
  { label: "Sistemas de Inventario y Logística", href: "/sistemas-inventario-logistica/" },
  { label: "Servicios Complementarios", href: "/servicios-complementarios/" },
];

const trainingLinks = [
  { label: "Sistemas Informáticos", href: "/#sistemas-informaticos" },
  { label: "Lenguajes de Programación", href: "/#lenguajes" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0b0b0d]">
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 bg-primary/10 blur-[120px]" />

      <div className="container-dm relative py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Contact */}
          <div className="space-y-5">
            <FooterContact icon={MapPin}>
              Calle Campeche 410, Int. A, Col. Hipodromo Condesa, Cuauhtemoc,
              C.P. 06170, CDMX
            </FooterContact>
            <FooterContact icon={Mail}>
              <a
                href="mailto:conecta@klyro.mx"
                className="transition hover:text-primary"
              >
                conecta@klyro.mx
              </a>
            </FooterContact>
            <FooterContact icon={Phone}>
              <a href="tel:5555534107" className="transition hover:text-primary">
                55 5553 4107
              </a>
            </FooterContact>
          </div>

          {/* Planes de Desarrollo */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white">
              Planes de Desarrollo
            </h3>
            <span className="mt-3 block h-0.5 w-12 bg-primary" />
            <ul className="mt-6 space-y-3">
              {developmentLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Capacitaciones */}
          <div>
            <h3 className="font-display text-lg font-semibold text-white">
              Capacitaciones
            </h3>
            <span className="mt-3 block h-0.5 w-12 bg-primary" />
            <ul className="mt-6 space-y-3">
              {trainingLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Logo + pagos */}
        <div className="mt-16 flex flex-col items-center gap-6">
          <Image
            src="/logo.svg"
            alt="Klyro"
            width={64}
            height={64}
            className="h-16 w-auto opacity-90"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          
          {/* Métodos de pago */}
          <div className="flex items-center gap-4">
            <Image
              src="/visa.svg"
              alt="Visa"
              width={50}
              height={30}
              className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity"
              style={{ filter: "brightness(0) invert(1)" }}
            />
            <Image
              src="/mastercard.svg"
              alt="Mastercard"
              width={40}
              height={30}
              className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>
        </div>

        {/* Legal */}
        <div className="mt-12 flex flex-col items-center gap-2 border-t border-white/5 pt-8 text-center text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <a href="/aviso-de-privacidad/" className="transition hover:text-white">
              Aviso de Privacidad
            </a>
            <span className="text-white/20">|</span>
            <a href="/terminos-y-condiciones/" className="transition hover:text-white">
              Términos y Condiciones de Uso
            </a>
            <span className="text-white/20">|</span>
            <a href="/politica-de-reembolso/" className="transition hover:text-white">
              Política de Reembolso
            </a>
          </div>
          <p className="mt-2 text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} Klyro. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterContact({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
      <p className="text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}