import Stripe from "stripe";
import prisma from "../utils/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const stripe = new Stripe(process.env.STRIPE_SECERT_KEY);

// ✅ Create Payment
export const createPayment = asyncHandler(async (req, res) => {
  const { userId, placeId, amountChildren, amountAdults, quantityAdults, quantityChildren } = req.body;

  const totalAmount = (amountChildren * quantityChildren + amountAdults * quantityAdults);

  const user = await prisma.user.findUnique({ where: { id: userId } });
  const place = await prisma.place.findUnique({ where: { id: placeId } });

  if (!user || !place) {
    return res.status(404).json({ error: "User or Place not found" });
  }

  const product = await stripe.products.create({
    name: place.title,
  });

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: totalAmount * 100, // Amount in paise
    currency: "inr",
  });

  const session = await stripe.checkout.sessions.create({
    line_items: [{
      price: price.id,
      quantity: 1,
    }],
    mode: "payment",
    success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
    customer_email: user.email,
  });

  await prisma.payment.create({
    data: {
      userId,
      placeId,
      amount: totalAmount * 100,
      currency: "inr",
      status: "pending",
      sessionId: session.id,
    },
  });

  res.json({ url: session.url });
});


// ✅ Confirm Payment and Update User
export const confirmPayment = asyncHandler(async (req, res) => {
  const { session_id } = req.query;

  if (!session_id) {
    return res.status(400).json({ error: "Session ID is required" });
  }

  const session = await stripe.checkout.sessions.retrieve(session_id);

  if (session.payment_status !== "paid") {
    return res.status(400).json({ error: "Payment not completed" });
  }

  const payment = await prisma.payment.update({
    where: { sessionId: session_id },
    data: { status: "completed" },
  });

  // ✅ Update User
  await prisma.user.update({
    where: { id: payment.userId },
    data: {
      accepted: {
        push: payment.placeId, // Push placeId into accepted array
      },
    },
  });

  res.json({ message: "Payment confirmed, status updated, and user updated" });
});
