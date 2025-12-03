
export const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}


export const initiateRazorpayPayment = async ({
  orderId,
  amount,
  currency = 'INR',
  name,
  email,
  mobile,
  courseName,
  razorpayKey,
  onSuccess,
  onFailure
}) => {
  const isScriptLoaded = await loadRazorpayScript()

  if (!isScriptLoaded) {
    onFailure('Failed to load Razorpay SDK. Please check your internet connection.')
    return
  }

  const options = {
    key: razorpayKey,
    amount: amount * 100, 
    currency: currency,
    name: 'Alterera Academy',
    description: `Course Registration: ${courseName}`,
    order_id: orderId,
    prefill: {
      name: name,
      email: email,
      contact: mobile
    },
    theme: {
      color: '#667eea'
    },
    handler: function (response) {
     
      onSuccess({
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature
      })
    },
    modal: {
      ondismiss: function () {
        onFailure('Payment cancelled by user')
      }
    }
  }

  const razorpay = new window.Razorpay(options)

  razorpay.on('payment.failed', function (response) {
    onFailure(response.error.description || 'Payment failed. Please try again.')
  })

  razorpay.open()
}
