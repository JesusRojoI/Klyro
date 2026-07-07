interface OctanoConfig {
  email: string;
  password: string;
  baseUrl: string;
  webhookSecret: string;
}

export const octanoConfig: OctanoConfig = {
  email: process.env.OCTANO_EMAIL || '',
  password: process.env.OCTANO_PASSWORD || '',
  baseUrl: process.env.OCTANO_BASE_URL || 'https://pagos.octanopayments.com/api/v1',
  webhookSecret: process.env.OCTANO_WEBHOOK_SECRET || '',
};

// Token en memoria
let authToken: string | null = null;
let tokenExpiry: number | null = null;

export async function octanoLogin(): Promise<string> {
  if (authToken && tokenExpiry && Date.now() < tokenExpiry) {
    return authToken;
  }

  try {
    console.log('🔐 [OCTANO] Autenticando...');
    
    if (!octanoConfig.email || !octanoConfig.password) {
      console.warn('⚠️ [OCTANO] Credenciales no configuradas');
      return 'simulated-token';
    }

    const response = await fetch(`${octanoConfig.baseUrl}/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: octanoConfig.email,
        password: octanoConfig.password,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error de autenticación');
    }

    const data = await response.json();
    
    if (!data.authToken) {
      throw new Error('No se recibió token de autenticación');
    }

    authToken = data.authToken;
    tokenExpiry = Date.now() + 15 * 60 * 1000;
    
    console.log('✅ [OCTANO] Autenticación exitosa');
    return data.authToken;
  } catch (error) {
    console.error('❌ [OCTANO] Error autenticando:', error);
    if (process.env.NODE_ENV === 'development') {
      return 'simulated-token';
    }
    throw error;
  }
}

export async function tokenizarTarjeta(token: string, cardData: {
  number: string;
  name: string;
  month: string;
  year: string;
}) {
  try {
    if (token === 'simulated-token') {
      return {
        token: `tok_sim_${Date.now()}`,
        last4: cardData.number.slice(-4),
      };
    }

    const response = await fetch(`${octanoConfig.baseUrl}/card/tokenizer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        cardData: {
          cardNumber: cardData.number.replace(/\s/g, ''),
          cardholderName: cardData.name,
          expirationYear: `20${cardData.year}`,
          expirationMonth: cardData.month,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error tokenizando tarjeta');
    }

    const data = await response.json();
    return {
      token: data.cardNumberToken || data.token,
      last4: cardData.number.slice(-4),
    };
  } catch (error) {
    console.error('❌ [OCTANO] Error tokenizando:', error);
    throw error;
  }
}

export async function procesarPago(token: string, datos: {
  amount: number;
  orderId: string;
  customerName: string;
  customerEmail: string;
  cardToken: string;
  cvv: string;
  customerData?: any;
}) {
  try {
    if (token === 'simulated-token') {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return {
        success: true,
        orderId: datos.orderId,
        status: 'approved',
        transactionId: `TXN-SIM-${Date.now()}`,
        message: 'Pago simulado exitosamente',
      };
    }

    const response = await fetch(`${octanoConfig.baseUrl}/sale`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount: Number(datos.amount),
        currency: '484',
        reference: datos.orderId,
        customerInformation: {
          firstName: datos.customerName?.split(' ')[0] || 'N/A',
          lastName: datos.customerName?.split(' ').slice(1).join(' ') || 'N/A',
          email: datos.customerEmail,
          ip: '127.0.0.1',
        },
        cardData: {
          cardNumberToken: datos.cardToken,
          cvv: datos.cvv,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error procesando pago');
    }

    const data = await response.json();
    return {
      success: data.status === 'APPROVED',
      orderId: datos.orderId,
      status: data.status === 'APPROVED' ? 'approved' : 'rejected',
      transactionId: data.transactionId || data.id,
      message: data.message || (data.status === 'APPROVED' ? 'Pago aprobado' : 'Pago rechazado'),
    };
  } catch (error) {
    console.error('❌ [OCTANO] Error procesando pago:', error);
    throw error;
  }
}