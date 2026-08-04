import Stripe from 'stripe';

// Initialize Stripe with your Secret Key stored in Vercel Environment Variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // 1. Enable CORS & Handle HTTP Method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { businessName, email } = req.body;

    // 2. Create the PaymentIntent for $600.00 USD (60000 cents)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 60000,
      currency: 'usd',
      receipt_email: email,
      automatic_payment_methods: { enabled: true },
      metadata: {
        product: 'South Side Field Sign Megapass',
        business_name: businessName || 'N/A',
      },
    });

    // 3. Return client_secret (snake_case from Stripe SDK) mapped to camelCase for React
    return res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Stripe PaymentIntent Error:', err);
    return res.status(500).json({ error: err.message });
  }
}