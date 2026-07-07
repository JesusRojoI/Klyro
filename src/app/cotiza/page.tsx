"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Send, CheckCircle, ArrowRight, Copy, ShoppingCart, RefreshCw, CreditCard } from "lucide-react";

export default function CotizaPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [cotizacionId, setCotizacionId] = useState("");
  const [modoId, setModoId] = useState<"auto" | "personalizado">("auto");
  const [idPersonalizado, setIdPersonalizado] = useState("");
  const [errorId, setErrorId] = useState("");
  const [montoCotizacion, setMontoCotizacion] = useState("");
  const [errorMonto, setErrorMonto] = useState("");
  
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    areaInteres: "",
    participantes: "1",
    modalidad: "En Línea",
    mensaje: "",
    idCotizacion: "",
    montoAsignado: "",
  });

  const generarIdCotizacion = () => {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const random = Math.floor(Math.random() * 9000) + 1000;
    return `KLY-${año}${mes}-${random}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validarIdPersonalizado = (id: string): boolean => {
    if (id.length < 3) {
      setErrorId("El ID debe tener al menos 3 caracteres");
      return false;
    }
    if (id.length > 50) {
      setErrorId("El ID no puede exceder 50 caracteres");
      return false;
    }
    setErrorId("");
    return true;
  };

  const validarMonto = (monto: string): boolean => {
    const montoNum = parseFloat(monto);
    if (isNaN(montoNum) || montoNum <= 0) {
      setErrorMonto("Ingresa un monto válido mayor a $0");
      return false;
    }
    if (montoNum > 999999) {
      setErrorMonto("El monto no puede exceder $999,999");
      return false;
    }
    setErrorMonto("");
    return true;
  };

  const handleSubmitContacto = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (modoId === "auto") {
      const nuevoId = generarIdCotizacion();
      setCotizacionId(nuevoId);
      setFormData({
        ...formData,
        idCotizacion: nuevoId,
      });
      setStep(2);
    } else {
      if (!validarIdPersonalizado(idPersonalizado)) return;
      setCotizacionId(idPersonalizado);
      setFormData({
        ...formData,
        idCotizacion: idPersonalizado,
      });
      setStep(2);
    }
  };

  const handleIrAPago = () => {
    setStep(3);
  };

  const handleAgregarAlCarrito = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validarMonto(montoCotizacion)) return;
    
    const carritoActual = JSON.parse(localStorage.getItem("klyro_carrito") || "[]");
    
    const productoCotizacion = {
      id: Date.now(),
      nombre: `Cotización: ${formData.areaInteres}`,
      precio: montoCotizacion,
      tipo: "Cotización Personalizada",
      cantidad: parseInt(formData.participantes) || 1,
      fecha: new Date().toISOString(),
      cotizacionId: cotizacionId,
      modalidad: formData.modalidad,
      email: formData.email,
    };
    
    carritoActual.push(productoCotizacion);
    localStorage.setItem("klyro_carrito", JSON.stringify(carritoActual));
    
    setStep(4);
  };

  const copiarIdCotizacion = () => {
    navigator.clipboard.writeText(cotizacionId);
    alert("¡ID de cotización copiado al portapapeles!");
  };

  const regenerarId = () => {
    if (modoId === "auto") {
      const nuevoId = generarIdCotizacion();
      setCotizacionId(nuevoId);
      setFormData({
        ...formData,
        idCotizacion: nuevoId,
      });
    }
  };

  const steps = [
    { number: 1, title: "Ponte en contacto con nosotros", subtitle: "Contáctanos" },
    { number: 2, title: "Recibe una cotización a tu medida", subtitle: "Cotización" },
    { number: 3, title: "Realiza el pago de la cotización aquí mismo", subtitle: "Pago" },
    { number: 4, title: "Diseñaremos una estrategia a tu medida", subtitle: "Estrategia" },
  ];

  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container-dm">
          {/* Steps indicator */}
          <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div
                key={s.number}
                className={`relative rounded-2xl border p-6 transition-all ${
                  step === s.number
                    ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                    : step > s.number
                    ? "border-primary/50 bg-primary/5"
                    : "border-white/10 bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold ${
                      step === s.number
                        ? "bg-primary text-white"
                        : step > s.number
                        ? "bg-primary/30 text-primary"
                        : "bg-white/10 text-muted-foreground"
                    }`}
                  >
                    {step > s.number ? <CheckCircle className="h-5 w-5" /> : `0${s.number}`}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{s.subtitle}</p>
                    <p className="text-xs text-muted-foreground">{s.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main content */}
          <div className="mx-auto max-w-3xl">
            {/* Step 1: Contact Form */}
            {step === 1 && (
              <form onSubmit={handleSubmitContacto} className="space-y-6">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm">
                  <h2 className="mb-6 font-display text-2xl font-bold text-white">
                    Contáctanos
                  </h2>
                  
                  <div className="space-y-5">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-white">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Tu nombre completo"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-white">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="tu@email.com"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-white">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="55 1234 5678"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-white">
                        Área de Interés *
                      </label>
                      <select
                        name="areaInteres"
                        value={formData.areaInteres}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="" disabled>Selecciona un área</option>
                        <option value="Desarrollo de Aplicaciones">Desarrollo de Aplicaciones</option>
                        <option value="Desarrollo Empresarial">Desarrollo Empresarial</option>
                        <option value="Desarrollo de Software Especializado">Desarrollo de Software Especializado</option>
                        <option value="Sistemas de Inventario y Logística">Sistemas de Inventario y Logística</option>
                        <option value="Servicios Complementarios">Servicios Complementarios</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-white">
                        Participantes *
                      </label>
                      <input
                        type="number"
                        name="participantes"
                        value={formData.participantes}
                        onChange={handleChange}
                        min="1"
                        required
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-white">
                        Modalidad *
                      </label>
                      <select
                        name="modalidad"
                        value={formData.modalidad}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="En Línea">En Línea</option>
                        <option value="Presencial">Presencial</option>
                        <option value="Híbrido">Híbrido</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-white">
                        Mensaje
                      </label>
                      <textarea
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        rows={4}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Cuéntanos más sobre tu proyecto..."
                      />
                    </div>

                    {/* Selector de modo de ID */}
                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                      <p className="mb-3 text-sm font-medium text-white">
                        ¿Cómo quieres tu ID de Cotización?
                      </p>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setModoId("auto");
                            setErrorId("");
                          }}
                          className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                            modoId === "auto"
                              ? "border-primary bg-primary/20 text-white"
                              : "border-white/10 text-muted-foreground hover:text-white"
                          }`}
                        >
                          🔄 Generar automáticamente
                        </button>
                        <button
                          type="button"
                          onClick={() => setModoId("personalizado")}
                          className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                            modoId === "personalizado"
                              ? "border-primary bg-primary/20 text-white"
                              : "border-white/10 text-muted-foreground hover:text-white"
                          }`}
                        >
                          ✏️ Personalizado
                        </button>
                      </div>

                      {modoId === "auto" && (
                        <p className="mt-3 text-xs text-muted-foreground">
                          Se generará un ID único tipo <span className="font-mono text-primary/80">KLY-202601-1234</span>
                        </p>
                      )}

                      {modoId === "personalizado" && (
                        <div className="mt-3">
                          <input
                            type="text"
                            value={idPersonalizado}
                            onChange={(e) => {
                              setIdPersonalizado(e.target.value);
                              validarIdPersonalizado(e.target.value);
                            }}
                            placeholder="Ej: MI-PROYECTO-2026"
                            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                          {errorId && (
                            <p className="mt-1 text-xs text-red-400">{errorId}</p>
                          )}
                          {!errorId && (
                            <p className="mt-1 text-xs text-muted-foreground">
                              Cualquier string de 3 a 50 caracteres
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:brightness-110 active:scale-95"
                  >
                    <Send className="h-5 w-5" />
                    Enviar Solicitud
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: ID de Cotización generado */}
            {step === 2 && (
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 backdrop-blur-sm">
                <div className="text-center">
                  <CheckCircle className="mx-auto h-16 w-16 text-primary" />
                  <h2 className="mt-4 font-display text-2xl font-bold text-white">
                    ¡Solicitud Recibida!
                  </h2>
                  <p className="mt-3 text-muted-foreground">
                    Tu solicitud ha sido registrada. Guarda tu ID de cotización para continuar con el proceso.
                  </p>
                </div>

                {/* ID de Cotización */}
                <div className="mt-8 rounded-2xl border-2 border-primary/30 bg-black/30 p-6">
                  <p className="text-center text-sm font-medium text-muted-foreground">
                    TU ID DE COTIZACIÓN
                  </p>
                  <div className="mt-2 flex items-center justify-center gap-3">
                    <p className="font-mono text-3xl font-bold text-primary tracking-wider">
                      {cotizacionId}
                    </p>
                    <button
                      type="button"
                      onClick={copiarIdCotizacion}
                      className="rounded-lg bg-primary/10 p-2 text-primary transition-colors hover:bg-primary/20"
                      title="Copiar ID"
                    >
                      <Copy className="h-5 w-5" />
                    </button>
                    {modoId === "auto" && (
                      <button
                        type="button"
                        onClick={regenerarId}
                        className="rounded-lg bg-primary/10 p-2 text-primary transition-colors hover:bg-primary/20"
                        title="Regenerar ID"
                      >
                        <RefreshCw className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                  <p className="mt-3 text-center text-xs text-muted-foreground">
                    {modoId === "auto"
                      ? "Copia este ID o genera uno nuevo"
                      : "Copia este ID para tu referencia"}
                  </p>
                </div>

                {/* Detalles del pedido */}
                <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <h3 className="font-semibold text-white">Resumen de tu solicitud:</h3>
                  <div className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <p><span className="text-white/70">Servicio:</span> {formData.areaInteres}</p>
                    <p><span className="text-white/70">Modalidad:</span> {formData.modalidad}</p>
                    <p><span className="text-white/70">Participantes:</span> {formData.participantes}</p>
                    <p><span className="text-white/70">Email:</span> {formData.email}</p>
                  </div>
                </div>

                <button
                  onClick={handleIrAPago}
                  className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:brightness-110 active:scale-95"
                >
                  Continuar
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            )}

            {/* Step 3: Fijar monto y agregar al carrito */}
            {step === 3 && (
              <form onSubmit={handleAgregarAlCarrito} className="space-y-6">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="h-6 w-6 text-primary" />
                    <h2 className="font-display text-2xl font-bold text-white">
                      Realiza el pago de la cotización aquí mismo
                    </h2>
                  </div>
                  
                  <p className="mb-6 text-sm text-muted-foreground">
                    Fija el monto de tu cotización. Este será el valor que aparecerá en tu carrito de compras.
                  </p>

                  {/* ID de cotización */}
                  <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <p className="text-xs text-muted-foreground">ID de Cotización:</p>
                    <p className="mt-1 font-mono text-lg font-bold text-primary">{cotizacionId}</p>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-white">
                        Monto de la Cotización ($) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <input
                          type="number"
                          value={montoCotizacion}
                          onChange={(e) => {
                            setMontoCotizacion(e.target.value);
                            validarMonto(e.target.value);
                          }}
                          required
                          min="1"
                          max="999999"
                          step="0.01"
                          className="w-full rounded-xl border border-white/10 bg-white/[0.03] pl-8 pr-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder="0.00"
                        />
                      </div>
                      {errorMonto && (
                        <p className="mt-1 text-xs text-red-400">{errorMonto}</p>
                      )}
                      {!errorMonto && montoCotizacion && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          + IVA (16%): {parseFloat(montoCotizacion) > 0 ? (parseFloat(montoCotizacion) * 0.16).toLocaleString("es-MX", { style: "currency", currency: "MXN" }) : "$0.00"}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:brightness-110 active:scale-95"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Agregar al Carrito
                  </button>
                </div>
              </form>
            )}

            {/* Step 4: Confirmación de agregado al carrito */}
            {step === 4 && (
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center backdrop-blur-sm">
                <ShoppingCart className="mx-auto h-16 w-16 text-primary" />
                <h2 className="mt-4 font-display text-2xl font-bold text-white">
                  ¡Agregado al Carrito!
                </h2>
                <p className="mt-3 text-muted-foreground">
                  Tu artículo se ha agregado al carrito correctamente. Te invitamos a revisar tu bandeja de correo para ver la confirmación.
                </p>
                
                <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] p-4 text-left">
                  <p className="text-sm text-muted-foreground">Cotización: <span className="font-mono text-primary">{cotizacionId}</span></p>
                  <p className="mt-1 text-sm text-muted-foreground">Servicio: {formData.areaInteres}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Monto: ${parseFloat(montoCotizacion).toLocaleString("es-MX", { minimumFractionDigits: 2 })}</p>
                  <p className="mt-1 text-sm text-muted-foreground">Email: {formData.email}</p>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <a
                    href="/carrito"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-white transition-all hover:brightness-110 active:scale-95"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Ver Carrito
                  </a>
                  <a
                    href="/"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-8 py-3 font-semibold text-muted-foreground transition-all hover:border-primary/30 hover:text-white"
                  >
                    Volver al Inicio
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}