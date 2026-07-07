"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { 
  ArrowLeft, 
  Shield, 
  CreditCard, 
  Lock, 
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Tag
} from "lucide-react";

interface ProductoCarrito {
  id: number;
  nombre: string;
  precio: string;
  tipo: string;
  cantidad: number;
  fecha: string;
}

export default function FinalizarCompraPage() {
  const router = useRouter();
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);
  const [cuponAbierto, setCuponAbierto] = useState(false);
  const [codigoCupon, setCodigoCupon] = useState("");
  const [cuponAplicado, setCuponAplicado] = useState(false);
  const [descuento, setDescuento] = useState(0);
  
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    pais: "México",
    direccion: "",
    apartamento: "",
    poblacion: "",
    region: "Ciudad de México",
    codigoPostal: "",
    telefono: "",
    email: "",
    notas: "",
    nombreTarjeta: "",
    numeroTarjeta: "",
    fechaExpiracion: "",
    cvv: "",
  });

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem("klyro_carrito") || "[]");
    setCarrito(carritoGuardado);
    
    if (carritoGuardado.length === 0) {
      router.push("/carrito");
    }
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const extraerPrecio = (precio: string): number => {
    const match = precio.match(/[\d,]+/);
    if (match) {
      return parseInt(match[0].replace(/,/g, "")) || 0;
    }
    return 0;
  };

  const formatearPrecio = (cantidad: number): string => {
    return cantidad.toLocaleString("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const calcularSubtotal = (): number => {
    return carrito.reduce((total, item) => {
      return total + extraerPrecio(item.precio) * item.cantidad;
    }, 0);
  };

  const calcularIVA = (): number => {
    return calcularSubtotal() * 0.16;
  };

  const calcularTotal = (): number => {
    return calcularSubtotal() + calcularIVA() - descuento;
  };

  const aplicarCupon = () => {
    // Cupones de ejemplo
    const cupones: { [key: string]: number } = {
      "KLYRO10": 0.10, // 10% descuento
      "KLYRO20": 0.20, // 20% descuento
      "BIENVENIDO": 0.15, // 15% descuento
    };

    if (cupones[codigoCupon.toUpperCase()]) {
      const porcentaje = cupones[codigoCupon.toUpperCase()];
      const descuentoCalculado = calcularSubtotal() * porcentaje;
      setDescuento(descuentoCalculado);
      setCuponAplicado(true);
    } else {
      alert("Cupón no válido");
      setCuponAplicado(false);
      setDescuento(0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!formData.nombre || !formData.apellidos || !formData.email) {
      alert("Por favor completa los campos obligatorios");
      return;
    }

    // Aquí iría la lógica de procesamiento de pago
    alert("¡Pedido procesado con éxito! Gracias por tu compra.");
    localStorage.removeItem("klyro_carrito");
    router.push("/");
  };

  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container-dm">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <a href="/" className="hover:text-primary transition-colors">Inicio</a>
              <span>/</span>
              <a href="/carrito" className="hover:text-primary transition-colors">Carrito</a>
              <span>/</span>
              <span className="text-white">Finalizar Compra</span>
            </div>
            <h1 className="mt-6 font-display text-4xl font-bold text-white sm:text-5xl">
              Finalizar Compra
            </h1>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Columna izquierda - Datos de facturación y pago */}
              <div className="lg:col-span-2 space-y-8">
                {/* Detalles de facturación */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm md:p-8">
                  <h2 className="font-display text-2xl font-bold text-white">
                    Detalles de facturación
                  </h2>
                  
                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                        placeholder="Nombre"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-white">
                        Apellidos *
                      </label>
                      <input
                        type="text"
                        name="apellidos"
                        value={formData.apellidos}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Apellidos"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-white">
                        País / Región *
                      </label>
                      <select
                        name="pais"
                        value={formData.pais}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="México">México</option>
                        <option value="Estados Unidos">Estados Unidos</option>
                        <option value="Canadá">Canadá</option>
                        <option value="España">España</option>
                        <option value="Argentina">Argentina</option>
                        <option value="Colombia">Colombia</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-white">
                        Dirección de la calle *
                      </label>
                      <input
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Nombre de la calle y número de la casa"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-muted-foreground">
                        Apartamento, habitación, escalera, etc. (opcional)
                      </label>
                      <input
                        type="text"
                        name="apartamento"
                        value={formData.apartamento}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Apartamento, habitación, etc. (opcional)"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-white">
                        Población *
                      </label>
                      <input
                        type="text"
                        name="poblacion"
                        value={formData.poblacion}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-white">
                        Región / Provincia *
                      </label>
                      <select
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        <option value="Ciudad de México">Ciudad de México</option>
                        <option value="Estado de México">Estado de México</option>
                        <option value="Jalisco">Jalisco</option>
                        <option value="Nuevo León">Nuevo León</option>
                        <option value="Puebla">Puebla</option>
                        <option value="Querétaro">Querétaro</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-white">
                        Código postal / ZIP *
                      </label>
                      <input
                        type="text"
                        name="codigoPostal"
                        value={formData.codigoPostal}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-muted-foreground">
                        Teléfono (opcional)
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Teléfono"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-white">
                        Dirección de correo electrónico *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Dirección de correo electrónico"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="mb-2 block text-sm font-medium text-muted-foreground">
                        Notas del pedido (opcional)
                      </label>
                      <textarea
                        name="notas"
                        value={formData.notas}
                        onChange={handleChange}
                        rows={3}
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="Notas sobre tu pedido, por ejemplo, notas especiales para la entrega."
                      />
                    </div>
                  </div>
                </div>

                {/* Pago con tarjeta */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm md:p-8">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-6 w-6 text-primary" />
                    <h2 className="font-display text-2xl font-bold text-white">
                      Tarjeta de Crédito o débito
                    </h2>
                  </div>
                  
                  <p className="mt-3 text-sm text-muted-foreground">
                    Completa tu compra proporcionando tus datos de pago.
                  </p>

                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-white">
                        Nombre en la tarjeta
                      </label>
                      <input
                        type="text"
                        name="nombreTarjeta"
                        value={formData.nombreTarjeta}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-white">
                        Número de tarjeta
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="numeroTarjeta"
                          value={formData.numeroTarjeta}
                          onChange={handleChange}
                          required
                          maxLength={19}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder="•••• •••• •••• ••••"
                        />
                        <Lock className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-white">
                          MM/AA
                        </label>
                        <input
                          type="text"
                          name="fechaExpiracion"
                          value={formData.fechaExpiracion}
                          onChange={handleChange}
                          required
                          maxLength={5}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder="MM / YY"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-white">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          required
                          maxLength={4}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder="•••"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                    <Shield className="h-4 w-4 text-primary" />
                    Sus datos personales se utilizarán para procesar su pedido, respaldar su experiencia en este sitio web y para otros fines descritos en nuestra política de privacidad.
                  </div>
                </div>
              </div>

              {/* Columna derecha - Resumen del pedido */}
              <div className="lg:col-span-1">
                <div className="sticky top-28 rounded-2xl border border-primary/20 bg-white/[0.02] p-6 backdrop-blur-sm">
                  <h3 className="font-display text-xl font-bold text-white">
                    Tu pedido
                  </h3>
                  
                  {/* Tabla de productos */}
                  <div className="mt-6">
                    <div className="grid grid-cols-3 gap-2 border-b border-white/10 pb-3 text-xs font-medium text-muted-foreground">
                      <span className="col-span-2">Producto</span>
                      <span className="text-right">Subtotal</span>
                    </div>
                    
                    {carrito.map((item) => (
                      <div key={item.id} className="grid grid-cols-3 gap-2 border-b border-white/5 py-3 text-sm">
                        <span className="col-span-2 text-muted-foreground">
                          {item.tipo} - {item.nombre} × {item.cantidad}
                        </span>
                        <span className="text-right text-white">
                          {formatearPrecio(extraerPrecio(item.precio) * item.cantidad)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Totales */}
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-white">{formatearPrecio(calcularSubtotal())}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">+ IVA 16%</span>
                      <span className="text-white">{formatearPrecio(calcularIVA())}</span>
                    </div>
                    
                    {cuponAplicado && (
                      <div className="flex justify-between text-sm">
                        <span className="text-primary">Descuento</span>
                        <span className="text-primary">-{formatearPrecio(descuento)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between border-t border-white/10 pt-2">
                      <span className="font-semibold text-white">Total</span>
                      <span className="font-mono text-lg font-bold text-primary">
                        {formatearPrecio(calcularTotal())}
                      </span>
                    </div>
                  </div>

                  {/* Cupón */}
                  <div className="mt-6 border-t border-white/10 pt-4">
                    <button
                      type="button"
                      onClick={() => setCuponAbierto(!cuponAbierto)}
                      className="flex w-full items-center justify-between text-sm text-muted-foreground transition-colors hover:text-white"
                    >
                      <span className="flex items-center gap-2">
                        <Tag className="h-4 w-4" />
                        ¿Tienes un cupón?
                      </span>
                      {cuponAbierto ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                    
                    {cuponAbierto && (
                      <div className="mt-3 space-y-2">
                        <input
                          type="text"
                          value={codigoCupon}
                          onChange={(e) => setCodigoCupon(e.target.value)}
                          className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder="Código de cupón"
                        />
                        <button
                          type="button"
                          onClick={aplicarCupon}
                          className="w-full rounded-full border border-primary/30 px-4 py-2 text-sm text-primary transition-colors hover:bg-primary/10"
                        >
                          Aplicar cupón
                        </button>
                        {cuponAplicado && (
                          <p className="flex items-center gap-1 text-xs text-primary">
                            <CheckCircle2 className="h-3 w-3" />
                            Cupón aplicado con éxito
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Botón de pago */}
                  <button
                    type="submit"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-base font-semibold text-white shadow-lg shadow-primary/30 transition-all hover:brightness-110 active:scale-95"
                  >
                    <Lock className="h-5 w-5" />
                    Pagar {formatearPrecio(calcularTotal())}
                  </button>

                  <a
                    href="/carrito"
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm text-muted-foreground transition-all hover:border-primary/30 hover:text-white"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Volver al carrito
                  </a>

                  {/* Métodos de pago */}
                  {/* Métodos de pago y seguridad */}
<div className="mt-6 space-y-3">
  <div className="flex items-center justify-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-3">
    <img
      src="/octano_logo.svg"
      alt="Octano - Pasarela de pago"
      className="h-7 w-auto"
      style={{ filter: "brightness(0) invert(1)" }}
    />
    <div className="h-6 w-px bg-white/10" />
    <img
      src="/secure_logo.svg"
      alt="SSL Seguro"
      className="h-7 w-auto"
      style={{ filter: "brightness(0) invert(1)" }}
    />
  </div>
  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
    <Shield className="h-3 w-3 text-primary" />
    Pago seguro SSL
    <span className="text-white/20">|</span>
    <CreditCard className="h-3 w-3 text-primary" />
    Visa, Mastercard
  </div>
</div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}