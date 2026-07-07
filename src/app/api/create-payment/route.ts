import { NextResponse } from 'next/server';
import { octanoLogin, tokenizarTarjeta, procesarPago } from '@/lib/octano';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, description, customerName, customerEmail, orderId, cardData } = body;

    console.log('💳 [PAGO] Iniciando proceso...');

    // 1. Login
    const token = await octanoLogin();
    if (!token) {
      return NextResponse.json({ success: false, error: 'Error de autenticación' }, { status: 500 });
    }

    // 2. Tokenizar tarjeta
    let cardToken: string;
    
    if (token === 'simulated-token') {
      cardToken = `tok_sim_${Date.now()}`;
      console.log('🔐 [PAGO] Usando token simulado');
    } else {
      console.log('💳 [PAGO] Tokenizando tarjeta real...');
      const tokenizado = await tokenizarTarjeta(token, {
        number: cardData.numeroTarjeta,
        name: cardData.nombreTarjeta,
        month: cardData.fechaExpiracion.split('/')[0],
        year: cardData.fechaExpiracion.split('/')[1],
      });
      cardToken = tokenizado.token;
      console.log('✅ [PAGO] Tarjeta tokenizada');
    }

    // 3. Procesar pago
    const resultado = await procesarPago(token, {
      amount,
      orderId,
      customerName,
      customerEmail,
      cardToken,
      cvv: cardData.cvv || '000',
    });

    console.log('✅ [PAGO] Resultado:', resultado);
    return NextResponse.json({ success: resultado.success, data: resultado });

  } catch (error: any) {
    console.error('❌ [PAGO] Error:', error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}