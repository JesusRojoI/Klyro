import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function TerminosCondicionesPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container-dm max-w-3xl">
          <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-primary transition-colors">Inicio</a>
            <span>/</span>
            <span className="text-white">Términos y Condiciones de Uso</span>
          </div>

          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
            Términos y Condiciones de Uso
          </h1>
          
          <p className="mt-4 text-sm text-muted-foreground">
            Última actualización: {new Date().toLocaleDateString("es-MX")}
          </p>

          <div className="mt-10 space-y-8 text-muted-foreground leading-relaxed">
            <div>
              <h2 className="text-xl font-semibold text-white mb-3">1. Aceptación de los Términos</h2>
              <p>
                Al acceder y utilizar el sitio web de Klyro (klyro.mx), usted acepta cumplir con estos términos y condiciones de uso. Si no está de acuerdo con alguna parte de estos términos, le recomendamos no utilizar nuestro sitio web ni nuestros servicios.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">2. Descripción del Servicio</h2>
              <p>
                Klyro ofrece servicios de desarrollo de software, capacitación tecnológica y consultoría. Todos los servicios están sujetos a disponibilidad y a la aceptación de una cotización formal por parte del cliente.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">3. Propiedad Intelectual</h2>
              <p>
                Todo el contenido de este sitio web, incluyendo textos, gráficos, logotipos, iconos, imágenes y software, es propiedad de Klyro y está protegido por las leyes de propiedad intelectual. Queda prohibida su reproducción total o parcial sin autorización expresa.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">4. Cotizaciones y Pagos</h2>
              <p>
                Todas las cotizaciones tienen una validez de 15 días hábiles a partir de su emisión. Los precios están sujetos a cambios sin previo aviso. El pago de los servicios se realizará conforme a lo establecido en la cotización aceptada por el cliente.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">5. Limitación de Responsabilidad</h2>
              <p>
                Klyro no será responsable por daños directos, indirectos, incidentales o consecuentes que resulten del uso o la imposibilidad de uso de nuestros servicios. Nos esforzamos por mantener la información del sitio actualizada, pero no garantizamos su exactitud completa.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">6. Modificaciones</h2>
              <p>
                Klyro se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Los cambios entrarán en vigor inmediatamente después de su publicación en el sitio web. El uso continuado de nuestros servicios después de dichas modificaciones constituye la aceptación de los nuevos términos.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">7. Contacto</h2>
              <p>
                Para cualquier duda sobre estos términos, contáctenos en: <a href="mailto:contacto@klyro.mx" className="text-primary hover:underline">contacto@klyro.mx</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}