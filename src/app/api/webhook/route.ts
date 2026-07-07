import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  
  console.log('🔔 [WEBHOOK] Notificación de Octano recibida:', body);
  
  // Aquí puedes procesar la confirmación de pago
  // Por ejemplo, actualizar estado de la orden

  return NextResponse.json({ received: true });
}