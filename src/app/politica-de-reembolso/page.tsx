import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function PoliticaReembolsoPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container-dm max-w-3xl">
          <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-primary transition-colors">Inicio</a>
            <span>/</span>
            <span className="text-white">Política de Reembolso</span>
          </div>

          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
            Política de Reembolso
          </h1>
          
          <p className="mt-4 text-sm text-muted-foreground">
            Última actualización: {new Date().toLocaleDateString("es-MX")}
          </p>

          <div className="mt-10 space-y-8 text-muted-foreground leading-relaxed">
            <div>
              <h2 className="text-xl font-semibold text-white mb-3">1. Plazo de Reembolso</h2>
              <p>
                Los clientes tienen derecho a solicitar un reembolso dentro de los primeros 5 días hábiles posteriores a la contratación del servicio, siempre que no se haya iniciado el trabajo de desarrollo o capacitación.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">2. Servicios de Desarrollo de Software</h2>
              <p>
                Para servicios de desarrollo de software, el reembolso aplica únicamente si el proyecto no ha iniciado. Una vez comenzado el desarrollo, se evaluará el porcentaje de avance para determinar el monto a reembolsar, descontando las horas trabajadas.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">3. Servicios de Capacitación</h2>
              <p>
                Para cursos y capacitaciones, se aceptan cancelaciones hasta 48 horas antes del inicio del curso con reembolso completo. Cancelaciones con menos de 48 horas de anticipación tendrán un cargo del 30% del valor del curso.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">4. Proceso de Reembolso</h2>
              <p>
                Para solicitar un reembolso, el cliente debe enviar un correo a <a href="mailto:contacto@klyro.mx" className="text-primary hover:underline">contacto@klyro.mx</a> con el asunto "Solicitud de Reembolso", incluyendo el ID de cotización, nombre completo y motivo de la solicitud.
              </p>
              <p className="mt-2">
                Una vez aprobada la solicitud, el reembolso se procesará en un plazo de 5 a 10 días hábiles a través del mismo método de pago utilizado.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">5. Casos No Reembolsables</h2>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li>Servicios completados y entregados al cliente</li>
                <li>Cursos de capacitación ya impartidos total o parcialmente</li>
                <li>Servicios personalizados que requirieron preparación previa significativa</li>
                <li>Solicitudes fuera del plazo establecido</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">6. Contacto</h2>
              <p>
                Para cualquier duda sobre nuestra política de reembolso: <a href="mailto:contacto@klyro.mx" className="text-primary hover:underline">contacto@klyro.mx</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}