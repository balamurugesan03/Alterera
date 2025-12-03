import { useState } from 'react'
import axios from 'axios'
import { initiateRazorpayPayment } from '../utils/razorpay'
import upiQR from "../images/WhatsApp Image 2025-12-03 at 19.03.26_cbd45ddd.jpg";


function Register() {
  const REGISTRATION_FEE = 2000; // Fixed registration fee

  const [formData, setFormData] = useState({
    name: '',
    degree: '',
    mobile: '',
    email: '',
    course: '',
    courseFee: ''
  })

  const [message, setMessage] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(false)
  const [showQR, setShowQR] = useState(false);


  const courses = [
    { name: 'MERN Full Stack', fee: '5000' },
    { name: 'Python Full Stack', fee: '4500' },
    { name: 'Data Science', fee: '5500' },
    { name: 'Java Full Stack', fee: '4800' },
    { name: 'UI/UX Design', fee: '3500' },
    { name: 'Digital Marketing', fee: '3000' }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target

    // If course is changed, update the course fee automatically
    if (name === 'course') {
      const selectedCourse = courses.find(c => c.name === value)
      setFormData(prev => ({
        ...prev,
        [name]: value,
        courseFee: selectedCourse ? selectedCourse.fee : ''
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handlseSubmit = (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  // Show QR instead of Razorpay
  setShowQR(true);
};


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
    if (!formData.courseFee) {
      setMessage({ type: 'error', text: 'Course fee is required' })
      return false
    }
    return true
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   setMessage({ type: '', text: '' })

  //   if (!validateForm()) {
  //     return
  //   }

  //   setLoading(true)

  //   try {
  //     // Step 1: Create Razorpay order for registration fee
  //     const orderResponse = await axios.post('/api/payments/create-order', {
  //       amount: REGISTRATION_FEE,
  //       currency: 'INR',
  //       receipt: `receipt_${Date.now()}`,
  //       notes: {
  //         name: formData.name,
  //         email: formData.email,
  //         course: formData.course,
  //         type: 'registration_fee'
  //       }
  //     })

  //     const { orderId, amount, currency, razorpayKey } = orderResponse.data

  //     // Step 2: Initiate Razorpay payment
  //     await initiateRazorpayPayment({
  //       orderId,
  //       amount: REGISTRATION_FEE,
  //       currency,
  //       name: formData.name,
  //       email: formData.email,
  //       mobile: formData.mobile,
  //       courseName: formData.course,
  //       razorpayKey,
  //       onSuccess: async (paymentResponse) => {
  //         // Step 3: Verify payment and complete registration
  //         try {
  //           const verifyResponse = await axios.post('/api/payments/verify', {
  //             ...paymentResponse,
  //             registrationData: formData
  //           })

  //           setMessage({
  //             type: 'success',
  //             text: 'Registration fee payment successful! We will contact you soon with course details.'
  //           })

  //           // Reset form
  //           setFormData({
  //             name: '',
  //             degree: '',
  //             mobile: '',
  //             email: '',
  //             course: '',
  //             courseFee: ''
  //           })
  //         } catch (verifyError) {
  //           setMessage({
  //             type: 'error',
  //             text: verifyError.response?.data?.message || 'Payment verification failed. Please contact support.'
  //           })
  //         } finally {
  //           setLoading(false)
  //         }
  //       },
  //       onFailure: (errorMessage) => {
  //         setMessage({
  //           type: 'error',
  //           text: errorMessage
  //         })
  //         setLoading(false)
  //       }
  //     })
  //   } catch (error) {
  //     setMessage({
  //       type: 'error',
  //       text: error.response?.data?.message || 'Failed to initiate payment. Please try again.'
  //     })
  //     setLoading(false)
  //   }
  // }
  const handleSubmit = (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  // Show QR instead of Razorpay
  setShowQR(true);
};


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
      Pay ₹2,000 registration fee to secure your spot. Course fee to be paid separately.
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
            <label htmlFor="courseFee">Course Fee *</label>
            <input
              type="text"
              id="courseFee"
              name="courseFee"
              value={formData.courseFee ? `₹${formData.courseFee}` : ''}
              readOnly
              placeholder="Select a course to see the fee"
              required
              style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
            />
          </div>

          <div style={{
            padding: '1.5rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '12px',
            marginBottom: '1.5rem',
            color: 'white',
            textAlign: 'center'
          }}>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>Registration Fee</h3>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: '0.5rem 0' }}>₹2,000</p>
            <p style={{ fontSize: '0.95rem', opacity: '0.9', margin: '0' }}>
              Course fee will be paid separately after registration
            </p>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Processing...' : 'Pay Registration Fee ₹2,000'}
          </button>
        </form>
        {showQR && (
  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.7)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999
    }}
  >
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        textAlign: "center",
        width: "90%",
        maxWidth: "400px"
      }}
    >
      <h2>Scan & Pay ₹2000</h2>
      <img
        src={upiQR}
        alt="UPI QR Code"
        style={{ width: "100%", borderRadius: "12px", margin: "20px 0" }}
      />

      <p style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
        UPI ID: <span style={{ color: "green" }}>ravipandey7786@ybl</span>
      </p>

      <button
        onClick={() => setShowQR(false)}
        style={{
          marginTop: "20px",
          background: "#333",
          color: "white",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Close
      </button>
    </div>
  </div>
)}

      </div>
      </div>
    </div>
  )
}

export default Register
