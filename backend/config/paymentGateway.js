const Stripe = require("stripe");
const dotenv = require("dotenv");

dotenv.config();

// Validate Stripe Secret Key
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY in environment variables");
}

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

module.exports = stripe;