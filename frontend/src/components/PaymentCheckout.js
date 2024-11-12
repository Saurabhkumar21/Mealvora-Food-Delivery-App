import React from 'react';
import axios from 'axios';

const PaymentCheckout = () => {
  const initiatePayment = async () => {
    const orderResponse = await axios.post('http://localhost:5000/api/payment/create-order', {
      amount: 500,  // Specify the amount (e.g., 500 INR)
      currency: 'INR'
    });

    const { id, amount, currency } = orderResponse.data;

    const options = {
      key: '',  // Replace with Razorpay Key ID
      amount: amount,
      currency: currency,
      name: 'Mealvora - Food Delivery',
      description: 'Payment for your order',
      order_id: id,
      handler: async (response) => {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

        // Call backend to verify payment
        try {
          const verificationResponse = await axios.post('http://localhost:5000/api/payment/verify', {
            order_id: razorpay_order_id,
            payment_id: razorpay_payment_id,
            signature: razorpay_signature
          });

          if (verificationResponse.data.status === 'success') {
            alert('Payment Verified Successfully!');
          } else {
            alert('Payment Verification Failed');
          }
        } catch (error) {
          console.error("Verification Error:", error);
          alert("Payment Verification Failed");
        }
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#3399cc'
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return <button onClick={initiatePayment}>Pay Now</button>;
};

export default PaymentCheckout;
