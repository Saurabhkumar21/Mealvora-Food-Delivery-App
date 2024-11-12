import express from "express";
import crypto from 'crypto';
const router = express.Router();

router.post('/payment/create-order', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100,  // Amount in the smallest currency unit (e.g., paise for INR)
      currency: currency,
      receipt: `receipt_order_${Date.now()}`
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/payment/verify', (req, res) => {
  const { order_id, payment_id, razorpay_signature } = req.body;

  // Generate a hash using the payment_id and order_id
  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${order_id}|${payment_id}`)
    .digest('hex');

  // Compare the generated hash with the razorpay_signature
  if (generatedSignature === razorpay_signature) {
    res.json({ status: 'success' });
  } else {
    res.status(400).json({ status: 'failure' });
  }
});


export default router;