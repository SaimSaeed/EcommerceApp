// stripeService.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET);

export const retrievePaymentIntent = async (paymentIntentId) => {
    return await stripe.paymentIntents.retrieve(paymentIntentId);
};