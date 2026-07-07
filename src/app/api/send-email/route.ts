import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  console.log('📧 [EMAIL] Iniciando envío de correo...');
  
  try {
    const body = await request.json();
    const { to, subject, html } = body;

    console.log('📧 [EMAIL] Destinatario:', to);
    console.log('📧 [EMAIL] Asunto:', subject);
    console.log('📧 [EMAIL] API Key presente:', process.env.RESEND_API_KEY ? 'Sí' : 'No');
    /*
    const data = await resend.emails.send({
    
    from: 'Klyro <conecta@klyro.mx>', 
    to,
      subject,
      html,
    });
    */

    //BPBPBPBPBPBPBPB
   const data = await resend.emails.send({
  from: 'Klyro <onboarding@resend.dev>',
  to: 'jaknet.software.dev@gmail.com',
  subject: `[TEST] ${subject}`,
  html: `
    <p><strong>Destinatario original:</strong> ${to}</p>
    <hr />
    ${html}
  `,
});
//BPBPBPBPBPBPBPB

    console.log('✅ [EMAIL] Envío exitoso:', data);
    return NextResponse.json({ success: true, data });
    
  } catch (error: any) {
    console.error('❌ [EMAIL] Error al enviar:', error.message);
    console.error('❌ [EMAIL] Detalles completos:', JSON.stringify(error, null, 2));
    
    return NextResponse.json({ 
      success: false, 
      error: error.message,
      details: error 
    }, { status: 500 });
  }
}