'use server';

import { Resend } from 'resend';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let resendInstance: any = null;

if (typeof window === 'undefined') {
  try {
    if (process.env.RESEND_API_KEY) {
      resendInstance = new Resend(process.env.RESEND_API_KEY);
      console.log('✅ Resend inicializado en el servidor');
    } else {
      console.warn('⚠️ RESEND_API_KEY no configurada. Los correos no se enviarán.');
    }
  } catch (error) {
    console.warn('⚠️ Error cargando Resend:', error);
  }
}

type TemplateFn = (data: Record<string, unknown>) => { subject: string; html: string };

const templates: Record<string, TemplateFn> = {
  cotizacionCliente: (data) => {
    const es = data.idioma === 'es';
    
    return {
      subject: `📋 ${es ? 'Nueva Cotización' : 'New Quote'} - Klyro`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; background: #0a0a0a; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; background: #111; border-radius: 16px; border: 1px solid #1fda7133; overflow: hidden; }
            .header { background: linear-gradient(135deg, #1fda71, #0a2a0f); padding: 30px 20px; text-align: center; }
            .header h1 { margin: 0; color: #fff; font-size: 26px; }
            .header p { margin: 5px 0 0; color: #1fda71; font-size: 14px; }
            .content { padding: 30px; }
            .content h2 { color: #1fda71; margin: 0 0 15px; font-size: 20px; }
            .content p { color: #ccc; font-size: 15px; margin: 8px 0; }
            .info { background: #1a1a1a; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #1fda7122; }
            .info p { margin: 6px 0; color: #ddd; }
            .info strong { color: #fff; }
            .badge { display: inline-block; background: #1fda71; color: #0a0a0a; padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: bold; margin-top: 15px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; border-top: 1px solid #1fda7111; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🌿 Klyro</h1>
              <p>${es ? 'Soluciones Tecnológicas' : 'Technology Solutions'}</p>
            </div>
            <div class="content">
              <h2>${es ? `¡Gracias por tu cotización, ${data.nombre}!` : `Thank you for your quote, ${data.nombre}!`}</h2>
              <p>${es ? 'Hemos recibido tu solicitud de cotización.' : 'We have received your quote request.'}</p>
              <div class="info">
                <p><strong>ID:</strong> ${data.cotizacionId}</p>
                <p><strong>${es ? 'Servicio' : 'Service'}:</strong> ${data.servicio}</p>
                <p><strong>${es ? 'Monto' : 'Amount'}:</strong> $${data.monto}</p>
              </div>
              <p>${es ? 'Nos pondremos en contacto contigo pronto.' : 'We will contact you soon.'}</p>
              <span class="badge">Klyro</span>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Klyro. ${es ? 'Todos los derechos reservados.' : 'All rights reserved.'}</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
  },

  cotizacionAdmin: (data) => {
    const es = data.idioma === 'es';
    return {
      subject: `📋 ${es ? 'Nueva Cotización' : 'New Quote'} - ${data.cotizacionId}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; background: #0a0a0a; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; background: #111; border-radius: 16px; border: 1px solid #1fda7133; overflow: hidden; }
            .header { background: #1fda71; padding: 20px; text-align: center; }
            .header h1 { margin: 0; color: #0a0a0a; font-size: 22px; }
            .content { padding: 30px; }
            .content p { color: #ccc; font-size: 15px; margin: 8px 0; }
            .info { background: #1a1a1a; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #1fda7122; }
            .info p { margin: 6px 0; color: #ddd; }
            .info strong { color: #fff; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header"><h1>📋 ${es ? 'Nueva Cotización' : 'New Quote'}</h1></div>
            <div class="content">
              <div class="info">
                <p><strong>${es ? 'Cliente' : 'Client'}:</strong> ${data.nombre}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>${es ? 'Servicio' : 'Service'}:</strong> ${data.servicio || 'N/A'}</p>
                <p><strong>ID:</strong> ${data.cotizacionId || 'N/A'}</p>
                <p><strong>${es ? 'Monto' : 'Amount'}:</strong> ${data.monto || 'N/A'}</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    };
  },

  paymentConfirmation: (data) => {
    const es = data.idioma === 'es';
    return {
      subject: es 
        ? `✅ ¡Compra Confirmada! - Klyro (${data.orderId})`
        : `✅ Purchase Confirmed! - Klyro (${data.orderId})`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; background: #0a0a0a; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 20px auto; background: #111; border-radius: 16px; border: 1px solid #1fda7133; overflow: hidden; }
            .header { background: linear-gradient(135deg, #1fda71, #0a2a0f); padding: 30px 20px; text-align: center; }
            .header h1 { margin: 0; color: #fff; font-size: 26px; }
            .content { padding: 30px; }
            .content h2 { color: #1fda71; margin: 0 0 15px; font-size: 20px; }
            .content p { color: #ccc; font-size: 15px; margin: 8px 0; }
            .details { background: #1a1a1a; padding: 20px; border-radius: 12px; margin: 20px 0; border: 1px solid #1fda7122; }
            .details p { margin: 6px 0; color: #ddd; }
            .details strong { color: #fff; }
            .badge { display: inline-block; background: #1fda71; color: #0a0a0a; padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: bold; margin-top: 15px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; border-top: 1px solid #1fda7111; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header"><h1>🌿 Klyro</h1></div>
            <div class="content">
              <h2>${es ? `¡Gracias por tu compra, ${data.name}!` : `Thank you for your purchase, ${data.name}!`}</h2>
              <p>${es ? 'Tu pago ha sido confirmado exitosamente.' : 'Your payment has been successfully confirmed.'}</p>
              <div class="details">
                <p><strong>${es ? 'Orden' : 'Order'}:</strong> ${data.orderId}</p>
                <p><strong>${es ? 'Total' : 'Total'}:</strong> ${data.total}</p>
              </div>
              <span class="badge">Klyro</span>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} Klyro. ${es ? 'Todos los derechos reservados.' : 'All rights reserved.'}</p>
            </div>
          </div>
        </body>
        </html>
      `
    };
  },
};

export async function sendEmail({ to, template, data }: {
  to: string;
  template: keyof typeof templates;
  data: Record<string, unknown>;
}) {
  if (typeof window !== 'undefined') {
    console.warn('⚠️ sendEmail no puede ejecutarse en el cliente');
    return { success: false, error: 'sendEmail solo puede ejecutarse en el servidor' };
  }

  try {
    if (!resendInstance) {
      console.warn('⚠️ Resend no inicializado.');
      return { success: false, error: 'Resend no inicializado.' };
    }

    console.log(`📧 Enviando correo "${template}" a ${to}...`);
    const templateData = templates[template](data);
    const from = process.env.EMAIL_FROM || 'Klyro <conecta@klyro.mx>';

    const result = await resendInstance.emails.send({
      from,
      to: [to],
      subject: templateData.subject,
      html: templateData.html,
    });

    if (result.error) {
      console.error('❌ Error de Resend:', result.error);
      return { success: false, error: result.error.message };
    }

    console.log(`✅ Correo enviado a ${to}`);
    return { success: true, data: result.data };
  } catch (error) {
    console.error('❌ Error enviando correo:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Error desconocido' };
  }
}

export async function enviarConfirmacionCotizacion(data: {
  nombre: string;
  email: string;
  servicio?: string;
  cotizacionId?: string;
  monto?: string;
  idioma?: string;
}) {
  return sendEmail({
    to: data.email,
    template: 'cotizacionCliente',
    data: { ...data, idioma: data.idioma || 'es' }
  });
}

export async function enviarConfirmacionCompra(data: {
  nombre: string;
  email: string;
  productos?: unknown[];
  total?: string;
  idioma?: string;
}) {
  return sendEmail({
    to: data.email,
    template: 'paymentConfirmation',
    data: { name: data.nombre, orderId: `ORD-${Date.now().toString(36)}`, total: data.total, idioma: data.idioma || 'es' }
  });
}

export async function notificarAdmin(data: {
  nombre: string;
  email: string;
  servicio?: string;
  cotizacionId?: string;
  monto?: string;
  total?: string;
  idioma?: string;
}, tipo: string) {
  const adminEmail = process.env.ADMIN_EMAIL || 'gestion@plusbitnova.com';
  return sendEmail({
    to: adminEmail,
    template: tipo === 'Compra' ? 'paymentConfirmation' : 'cotizacionAdmin',
    data: { ...data, name: data.nombre, orderId: data.cotizacionId || 'N/A', total: data.monto || data.total || 'N/A', idioma: data.idioma || 'es' }
  });
}