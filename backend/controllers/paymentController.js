import dotenv from "dotenv";
import AsyncErrorHandler from "../middleware/AsyncErrorHandler.js";
import stripe from "stripe";
dotenv.config({ path: "../config/config.env" });

export const processPayment = AsyncErrorHandler(async (req, res, next) => {
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
  const paymentIntent = await stripeInstance.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
    metadata: {
      company: "E-commerce",
    },
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: "always",
    },
  });

  res.status(200).json({
    success: true,
    message: "Payment was successful",
    client_secret: paymentIntent.client_secret,
  });
});
