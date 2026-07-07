import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function AvisoPrivacidadPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container-dm max-w-3xl">
          <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <a href="/" className="hover:text-primary transition-colors">Inicio</a>
            <span>/</span>
            <span className="text-white">Aviso de Privacidad</span>
          </div>

          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
            Aviso de Privacidad
          </h1>
          
          <p className="mt-4 text-sm text-muted-foreground">
            Última actualización: {new Date().toLocaleDateString("es-MX")}
          </p>

          <div className="mt-10 space-y-8 text-muted-foreground leading-relaxed">
            <div>
              <h2 className="text-xl font-semibold text-white mb-3">1. Identidad y Domicilio del Responsable</h2>
              <p>
                Klyro, con domicilio en Calle Campeche 410, Int. A, Col. Hipodromo Condesa, Cuauhtemoc, C.P. 06170, CDMX, es el responsable del tratamiento de los datos personales que nos proporcione, los cuales serán protegidos conforme a lo dispuesto por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">2. Datos Personales que Recabamos</h2>
              <p>
                Para las finalidades señaladas en este aviso, podemos recabar sus datos personales de distintas formas: cuando usted nos los proporciona directamente; cuando visita nuestro sitio web; y cuando obtenemos información a través de otras fuentes permitidas por la ley.
              </p>
              <p className="mt-2">Los datos que recabamos incluyen:</p>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li>Nombre completo</li>
                <li>Dirección de correo electrónico</li>
                <li>Número de teléfono</li>
                <li>Dirección postal</li>
                <li>Información de facturación</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">3. Finalidades del Tratamiento de Datos</h2>
              <p>
                Sus datos personales serán utilizados para las siguientes finalidades:
              </p>
              <ul className="mt-2 list-disc pl-6 space-y-1">
                <li>Proveer los servicios y productos solicitados</li>
                <li>Procesar pagos y facturación</li>
                <li>Enviar comunicaciones sobre nuestros servicios</li>
                <li>Realizar encuestas de satisfacción</li>
                <li>Dar seguimiento a solicitudes de cotización</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">4. Transferencia de Datos</h2>
              <p>
                Klyro se compromete a no transferir sus datos personales a terceros sin su consentimiento, salvo las excepciones previstas en la ley. Sus datos podrán ser compartidos con proveedores de servicios de pago únicamente para procesar transacciones.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">5. Derechos ARCO</h2>
              <p>
                Usted tiene derecho a conocer qué datos personales tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o incompleta (Rectificación); que la eliminemos de nuestros registros cuando considere que no está siendo utilizada conforme a los principios y deberes que establece la normativa (Cancelación); así como oponerse al uso de sus datos personales para fines específicos (Oposición). Estos derechos se conocen como derechos ARCO.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white mb-3">6. Contacto</h2>
              <p>
                Para cualquier duda sobre este aviso de privacidad, puede contactarnos a través del correo electrónico: <a href="mailto:contacto@klyro.mx" className="text-primary hover:underline">contacto@klyro.mx</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}