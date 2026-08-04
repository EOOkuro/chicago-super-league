const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Your Secret Key (sk_live_...)

app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { businessName, email } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 60000, // $600.00 USD
      currency: 'usd',
      receipt_email: email,
      metadata: {
        product: 'South Side Field Sign Megapass',
        business_name: businessName,
      },
    });

    res.send({ clientSecret: paymentIntent.clientSecret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});