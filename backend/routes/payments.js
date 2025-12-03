import express from 'express'
import Razorpay from 'razorpay'
import crypto from 'crypto'
import Registration from '../models/Registration.js'

const router = express.Router()

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

// POST /api/payments/create-order - Create Razorpay order
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency, receipt, notes } = req.body

    if (!amount) {
      return res.status(400).json({
        status: 'error',
        message: 'Amount is required'
      })
    }

    const options = {
      amount: Number(amount) * 100, // Convert to paise
      currency: currency || 'INR',
      receipt: receipt || `receipt_${Date.now()}`,
      notes: notes || {}
    }

    const order = await razorpay.orders.create(options)

    res.json({
      status: 'success',
      orderId: order.id,
      amount: order.amount / 100, // Convert back to rupees
      currency: order.currency,
      razorpayKey: process.env.RAZORPAY_KEY_ID
    })
  } catch (error) {
    console.error('Error creating Razorpay order:', error)
    res.status(500).json({
      status: 'error',
      message: 'Failed to create payment order'
    })
  }
})

// POST /api/payments/verify - Verify payment and complete registration
router.post('/verify', async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      registrationData
    } = req.body

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing payment verification parameters'
      })
    }

    // Step 1: Verify signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid payment signature'
      })
    }

    // Step 2: Verify payment status with Razorpay
    const payment = await razorpay.payments.fetch(razorpay_payment_id)

    if (payment.status !== 'captured') {
      return res.status(400).json({
        status: 'error',
        message: 'Payment not captured'
      })
    }

    // Step 3: Check if registration already exists with this email
    const existingRegistration = await Registration.findOne({
      email: registrationData.email
    })

    if (existingRegistration && existingRegistration.paymentStatus === 'completed') {
      return res.status(400).json({
        status: 'error',
        message: 'A registration with this email already exists'
      })
    }

    // Step 4: Save or update registration to database
    const registration = new Registration({
      ...registrationData,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      paymentStatus: 'completed',
      status: 'confirmed'
    })

    await registration.save()

    res.json({
      status: 'success',
      message: 'Payment verified and registration completed',
      registrationId: registration._id,
      data: {
        id: registration._id,
        name: registration.name,
        course: registration.course,
        email: registration.email,
        paymentStatus: registration.paymentStatus
      }
    })
  } catch (error) {
    console.error('Error verifying payment:', error)

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message)
      return res.status(400).json({
        status: 'error',
        message: messages.join(', ')
      })
    }

    res.status(500).json({
      status: 'error',
      message: 'Payment verification failed'
    })
  }
})

// POST /api/payments/webhook - Handle Razorpay webhook events (optional)
router.post('/webhook', async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET
    const signature = req.headers['x-razorpay-signature']

    if (!webhookSecret) {
      console.warn('Webhook secret not configured')
      return res.json({ status: 'ok' })
    }

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
        await Registration.findOneAndUpdate(
          { paymentId: payload.id },
          {
            paymentStatus: 'completed',
            status: 'confirmed'
          }
        )
        console.log('Payment captured:', payload.id)
      } else if (event === 'payment.failed') {
        // Handle failed payment
        await Registration.findOneAndUpdate(
          { paymentId: payload.id },
          { paymentStatus: 'failed' }
        )
        console.log('Payment failed:', payload.id)
      }
    } else {
      console.warn('Invalid webhook signature')
    }

    res.json({ status: 'ok' })
  } catch (error) {
    console.error('Webhook error:', error)
    res.json({ status: 'error' })
  }
})

export default router
