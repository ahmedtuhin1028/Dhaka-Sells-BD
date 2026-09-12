import axios from 'axios';

const BKASH_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://checkout.pay.bka.sh/v1.2.0-beta' 
  : 'https://checkout.sandbox.bka.sh/v1.2.0-beta';

export async function getBkashToken() {
  const { data } = await axios.post(`${BKASH_BASE_URL}/checkout/token/grant`, {
    app_key: process.env.BKASH_APP_KEY,
    app_secret: process.env.BKASH_APP_SECRET
  }, {
    headers: {
      username: process.env.BKASH_USERNAME,
      password: process.env.BKASH_PASSWORD,
    }
  });
  return data.id_token;
}

export async function createBkashPayment(orderId: string, amount: number) {
  const token = await getBkashToken();
  
  const { data } = await axios.post(`${BKASH_BASE_URL}/checkout/payment/create`, {
    amount: amount.toString(),
    currency: "BDT",
    intent: "sale",
    merchantInvoiceNumber: orderId
  }, {
    headers: {
      Authorization: token,
      'X-APP-Key': process.env.BKASH_APP_KEY
    }
  });

  // Returns bkashURL which you redirect the user to
  return data.bkashURL; 
}
