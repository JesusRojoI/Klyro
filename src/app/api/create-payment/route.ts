import { NextResponse } from 'next/server';
import { octanoLogin, tokenizarTarjeta, procesarPago } from '@/lib/octano';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, orderId, customerName, customerEmail, cardData } = body;

    console.log('💳 [PAGO] Iniciando proceso...');

    const token = await octanoLogin();
    if (!token) {
      return NextResponse.json({ success: false, error: 'Error de autenticación' }, { status: 500 });
    }

    let cardToken: string;
    if (token === 'simulated-token') {
      cardToken = `tok_sim_${Date.now()}`;
    } else {
      const exp = cardData.fechaExpiracion.split('/');
      const tokenizado = await tokenizarTarjeta(token, {
        number: cardData.numeroTarjeta,
        name: cardData.nombreTarjeta,
        month: exp[0],
        year: exp[1],
      });
      cardToken = tokenizado.token;
    }

    const resultado = await procesarPago(token, {
      amount,
      orderId,
      customerName,
      customerEmail,
      cardToken,
      cvv: cardData.cvv || '000',
    });

    return NextResponse.json({ success: resultado.success, data: resultado });
  } catch (error: any) {
    console.error('❌ [PAGO] Error:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}