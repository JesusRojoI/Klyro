interface EmailData {
  nombre: string;
  email: string;
  servicio?: string;
  cotizacionId?: string;
  monto?: string;
  productos?: { nombre: string; precio: string; cantidad: number }[];
  total?: string;
}

async function sendEmail(to: string, subject: string, html: string) {
  console.log('📤 [CLIENTE] Enviando petición a /api/send-email...');
  console.log('📤 [CLIENTE] Destinatario:', to);
  console.log('📤 [CLIENTE] Asunto:', subject);
  
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, subject, html }),
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ [CLIENTE] Email enviado correctamente');
    } else {
      console.error('❌ [CLIENTE] Error del servidor:', result.error);
      console.error('❌ [CLIENTE] Detalles:', JSON.stringify(result, null, 2));
    }
    
    return result;
  } catch (error) {
    console.error('❌ [CLIENTE] Error de conexión:', error);
    return { success: false, error };
  }
}

export async function enviarConfirmacionCotizacion(data: EmailData) {
  console.log('📧 [COTIZACIÓN] Preparando email para:', data.email);
  
  await sendEmail(
    data.email,
    `Cotización Recibida - ${data.cotizacionId}`,
    `<h1>¡Gracias por tu cotización, ${data.nombre}!</h1>
     <p>Hemos recibido tu solicitud.</p>
     <p><strong>ID:</strong> ${data.cotizacionId}</p>
     <p><strong>Servicio:</strong> ${data.servicio}</p>
     <p><strong>Monto:</strong> $${data.monto}</p>
     <hr /><p>Klyro - Soluciones Tecnológicas</p>`
  );
}

export async function enviarConfirmacionCompra(data: EmailData) {
  console.log('📧 [COMPRA] Preparando email para:', data.email);
  
  const lista = data.productos?.map(p => `<li>${p.nombre} x${p.cantidad} - ${p.precio}</li>`).join('') || '';
  
  await sendEmail(
    data.email,
    'Confirmación de Compra - Klyro',
    `<h1>¡Compra Confirmada, ${data.nombre}!</h1>
     <h3>Productos:</h3><ul>${lista}</ul>
     <p><strong>Total:</strong> ${data.total}</p>
     <hr /><p>Gracias por confiar en Klyro.</p>`
  );
}

export async function notificarAdmin(data: EmailData, tipo: string) {
  console.log('📧 [ADMIN] Notificando a conecta@klyro.mx - Tipo:', tipo);
  
  await sendEmail(
    'conecta@klyro.mx',
    `Nueva ${tipo} - Klyro`,
    `<h1>Nueva ${tipo}</h1>
     <p><strong>Cliente:</strong> ${data.nombre}</p>
     <p><strong>Email:</strong> ${data.email}</p>
     <p><strong>Servicio:</strong> ${data.servicio || 'N/A'}</p>
     <p><strong>Monto:</strong> ${data.monto || data.total || 'N/A'}</p>`
  );
}