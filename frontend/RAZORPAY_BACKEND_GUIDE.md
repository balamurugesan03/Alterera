# Razorpay Backend Integration Guide

This guide explains the backend APIs required for the Razorpay payment integration in the registration flow.

## Prerequisites

1. Install Razorpay SDK on your backend:
   ```bash
   npm install razorpay
   ```

2. Set up Razorpay credentials in your environment variables:
   ```env
   RAZORPAY_KEY_ID=your_key_id
   RAZORPAY_KEY_SECRET=your_key_secret
   ```

3. Get your Razorpay credentials from [Razorpay Dashboard](https://dashboard.razorpay.com/)

## Required Backend APIs

### 1. Create Order API

**Endpoint:** `POST /api/payments/create-order`

**Description:** Creates a Razorpay order for the registration payment.

**Request Body:**
```json
{
  "amount": "50000",
  "currency": "INR",
  "receipt": "receipt_1234567890",
  "notes": {
    "name": "John Doe",
    "email": "john@example.com",
    "course": "MERN Full Stack"
  }
}
```

**Response:**
```json
{
  "orderId": "order_MjX2YzN4MTYxNDQ",
  "amount": 50000,
  "currency": "INR",
  "razorpayKey": "rzp_test_xxxxxxxxxxxxx"
}
```

**Sample Implementation (Node.js/Express):**
```javascript
const Razorpay = require('razorpay')

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

app.post('/api/payments/create-order', async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body

    const options = {
      amount: Number(amount) * 100, // Convert to paise
      currency: currency || 'INR',
      receipt: receipt,
      notes: notes
    }

    const order = await razorpay.orders.create(options)

    res.json({
      orderId: order.id,
      amount: order.amount / 100, // Convert back to rupees
      currency: order.currency,
      razorpayKey: process.env.RAZORPAY_KEY_ID
    })
  } catch (error) {
    console.error('Error creating Razorpay order:', error)
    res.status(500).json({
      message: 'Failed to create payment order'
    })
  }
})
```

### 2. Verify Payment API

**Endpoint:** `POST /api/payments/verify`

**Description:** Verifies the Razorpay payment signature and completes the registration.

**Request Body:**
```json
{
  "razorpay_payment_id": "pay_MjX2YzN4MTYxNDQ",
  "razorpay_order_id": "order_MjX2YzN4MTYxNDQ",
  "razorpay_signature": "generated_signature",
  "registrationData": {
    "name": "John Doe",
    "degree": "B.Tech",
    "mobile": "9876543210",
    "email": "john@example.com",
    "course": "MERN Full Stack",
    "amount": "50000"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payment verified and registration completed",
  "registrationId": "REG123456"
}
```

**Sample Implementation (Node.js/Express):**
```javascript
const crypto = require('crypto')

app.post('/api/payments/verify', async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      registrationData
    } = req.body

    // Step 1: Verify signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature'
      })
    }

    // Step 2: Verify payment status with Razorpay
    const payment = await razorpay.payments.fetch(razorpay_payment_id)

    if (payment.status !== 'captured') {
      return res.status(400).json({
        success: false,
        message: 'Payment not captured'
      })
    }

    // Step 3: Save registration to database
    const registration = {
      ...registrationData,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      paymentStatus: 'completed',
      registrationDate: new Date()
    }

    // Save to your database
    // const savedRegistration = await Registration.create(registration)

    // Step 4: Send confirmation email (optional)
    // await sendConfirmationEmail(registration)

    res.json({
      success: true,
      message: 'Payment verified and registration completed',
      registrationId: 'REG' + Date.now() // Use your actual registration ID
    })
  } catch (error) {
    console.error('Error verifying payment:', error)
    res.status(500).json({
      success: false,
      message: 'Payment verification failed'
    })
  }
})
```

## Database Schema

Add these fields to your registration schema:

```javascript
{
  name: String,
  degree: String,
  mobile: String,
  email: String,
  course: String,
  amount: Number,
  paymentId: String,        // Razorpay payment ID
  orderId: String,          // Razorpay order ID
  paymentStatus: String,    // 'completed', 'pending', 'failed'
  registrationDate: Date
}
```

## Security Best Practices

1. **Never expose your Razorpay Key Secret** - Keep it only on the backend
2. **Always verify payment signature** - This prevents payment manipulation
3. **Validate amount** - Check if the paid amount matches the course fee
4. **Log all transactions** - Keep audit logs for all payment attempts
5. **Use HTTPS** - Always use secure connections for payment APIs
6. **Implement rate limiting** - Prevent abuse of payment APIs
7. **Handle webhook events** - Implement Razorpay webhooks for real-time updates

## Testing

Use Razorpay test mode credentials for development:
- Test Key ID: `rzp_test_xxxxxxxxxxxxx`
- Test Key Secret: `xxxxxxxxxxxxxxxxxx`

### Test Cards:
- Success: `4111 1111 1111 1111`
- Failure: `4111 1111 1111 1112`
- CVV: Any 3 digits
- Expiry: Any future date

## Webhook Setup (Optional but Recommended)

Set up webhooks in Razorpay Dashboard to handle payment events:

```javascript
app.post('/api/payments/webhook', async (req, res) => {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET
  const signature = req.headers['x-razorpay-signature']

  // Verify webhook signature
  const expectedSignature = crypto
    .createHmac('sha256', webhookSecret)
    .update(JSON.stringify(req.body))
    .digest('hex')

  if (signature === expectedSignature) {
    const event = req.body.event
    const payload = req.body.payload.payment.entity

    if (event === 'payment.captured') {
      // Update registration status
      console.log('Payment captured:', payload.id)
    } else if (event === 'payment.failed') {
      // Handle failed payment
      console.log('Payment failed:', payload.id)
    }
  }

  res.json({ status: 'ok' })
})
```

## Support

For Razorpay integration issues:
- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay API Reference](https://razorpay.com/docs/api/)
- [Razorpay Support](https://razorpay.com/support/)
