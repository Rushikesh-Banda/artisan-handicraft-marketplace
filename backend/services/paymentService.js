const stripe = require(
  "../config/paymentGateway"
);


// Create Stripe Payment Intent
const createPaymentIntent = async ({
  amount,
  currency = "usd",
  orderId,
  customerEmail,
}) => {

  try {

    // Validate amount
    if (!amount || amount <= 0) {
      throw new Error(
        "Invalid payment amount"
      );
    }

    // Create payment intent
    const paymentIntent =
      await stripe.paymentIntents.create({

        amount: Math.round(amount * 100),

        currency,

        payment_method_types: ["card"],

        metadata: {
          orderId,
          customerEmail,
        },

        receipt_email: customerEmail,
      });

    return paymentIntent;

  } catch (error) {

    console.error(
      `Payment Error: ${error.message}`
    );

    throw new Error(
      "Payment intent creation failed"
    );
  }
};


module.exports = {
  createPaymentIntent,
};