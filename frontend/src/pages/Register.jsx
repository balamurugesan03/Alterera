import { useState } from 'react'
import axios from 'axios'
import { initiateRazorpayPayment } from '../utils/razorpay'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    degree: '',
    mobile: '',
    email: '',
    course: '',
    amount: ''
  })

  const [message, setMessage] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(false)

  const courses = [
    { name: 'MERN Full Stack', fee: '50000' },
    { name: 'Python Full Stack', fee: '45000' },
    { name: 'Data Science', fee: '55000' },
    { name: 'Java Full Stack', fee: '48000' },
    { name: 'UI/UX Design', fee: '35000' },
    { name: 'Digital Marketing', fee: '30000' }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Auto-fill amount when course is selected
    if (name === 'course') {
      const selectedCourse = courses.find(c => c.name === value)
      if (selectedCourse) {
        setFormData(prev => ({
          ...prev,
          amount: selectedCourse.fee
        }))
      }
    }
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setMessage({ type: 'error', text: 'Please enter your name' })
      return false
    }
    if (!formData.degree.trim()) {
      setMessage({ type: 'error', text: 'Please enter your degree' })
      return false
    }
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile)) {
      setMessage({ type: 'error', text: 'Please enter a valid 10-digit mobile number' })
      return false
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' })
      return false
    }
    if (!formData.course) {
      setMessage({ type: 'error', text: 'Please select a course' })
      return false
    }
    if (!formData.amount) {
      setMessage({ type: 'error', text: 'Please enter the amount' })
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      // Step 1: Create Razorpay order
      const orderResponse = await axios.post('/api/payments/create-order', {
        amount: formData.amount,
        currency: 'INR',
        receipt: `receipt_${Date.now()}`,
        notes: {
          name: formData.name,
          email: formData.email,
          course: formData.course
        }
      })

      const { orderId, amount, currency, razorpayKey } = orderResponse.data

      // Step 2: Initiate Razorpay payment
      await initiateRazorpayPayment({
        orderId,
        amount,
        currency,
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        courseName: formData.course,
        razorpayKey,
        onSuccess: async (paymentResponse) => {
          // Step 3: Verify payment and complete registration
          try {
            const verifyResponse = await axios.post('/api/payments/verify', {
              ...paymentResponse,
              registrationData: formData
            })

            setMessage({
              type: 'success',
              text: 'Payment successful! Registration completed. We will contact you soon.'
            })

            // Reset form
            setFormData({
              name: '',
              degree: '',
              mobile: '',
              email: '',
              course: '',
              amount: ''
            })
          } catch (verifyError) {
            setMessage({
              type: 'error',
              text: verifyError.response?.data?.message || 'Payment verification failed. Please contact support.'
            })
          } finally {
            setLoading(false)
          }
        },
        onFailure: (errorMessage) => {
          setMessage({
            type: 'error',
            text: errorMessage
          })
          setLoading(false)
        }
      })
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to initiate payment. Please try again.'
      })
      setLoading(false)
    }
  }

  return (
    <div>
     <section
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: "white",
    padding: "5rem 2rem 4rem",
    textAlign: "center",
    position: "relative"
  }}
>
  {/* Overlay */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: "rgba(0, 0, 0, 0.55)"
    }}
  ></div>

  {/* Content */}
  <div style={{ position: "relative", zIndex: 2 }}>
    <h1
      style={{
        fontSize: "3.5rem",
        marginBottom: "1.5rem",
        fontWeight: "800",
        fontFamily: "Poppins, sans-serif",
        letterSpacing: "-1px"
      }}
    >
      Course Registration
    </h1>

    <p
      style={{
        fontSize: "1.3rem",
        maxWidth: "700px",
        margin: "0 auto",
        opacity: "0.95",
        lineHeight: "1.7"
      }}
    >
      Fill out the form below to register for your desired course
    </p>
  </div>
</section>


      <div className="container">

      <div className="form-container">
        {message.text && (
          <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="degree">Degree/Qualification *</label>
            <input
              type="text"
              id="degree"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              placeholder="e.g., B.Tech, BCA, M.Sc"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile Number *</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="10-digit mobile number"
              maxLength="10"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="course">Course Interested For *</label>
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            >
              <option value="">-- Select a Course --</option>
              {courses.map((course, index) => (
                <option key={index} value={course.name}>
                  {course.name} - ₹{course.fee}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="amount">Course Fee (₹) *</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Course fee"
              readOnly
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </form>
      </div>
      </div>
    </div>
  )
}

export default Register
