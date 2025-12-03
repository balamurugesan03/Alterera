import { useState } from 'react'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [submitMessage, setSubmitMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitMessage('Thank you for your message! We will get back to you soon.')

    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    })

    // Clear message after 5 seconds
    setTimeout(() => setSubmitMessage(''), 5000)
  }

  return (
    <div>
     <section
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80')",
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
      Contact Us
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
      Get in touch with us for course inquiries, admissions, or any questions
    </p>
  </div>
</section>


      <div className="container">
      <div
  style={{
    marginTop: '3rem',
    padding: '3rem 2rem',
    backgroundImage:
      "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    borderRadius: '16px',
    boxShadow: 'var(--shadow-lg)',
    position: 'relative',
    overflow: 'hidden',
    color: 'white'
  }}
>

  {/* Overlay */}
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.55)'
    }}
  ></div>

  {/* Content */}
  <div style={{ position: 'relative', zIndex: 2 }}>
    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📍</div>
      <h3 style={{ fontSize: '2rem', fontWeight: '700' }}>Alterera Academy</h3>
    </div>

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginTop: '2rem'
      }}
    >
      <div>
        <p style={{ fontWeight: '700', color: 'var(--primary-color)' }}>Address</p>
        <p>1ST FLOOR, Kalpana Market, GNB Rd, Silphukuri, Guwahati, Assam 781003</p>
      </div>

      <div>
        <p style={{ fontWeight: '700', color: 'var(--primary-color)' }}>Email</p>
        <p>hello@Alterera.com</p>
      </div>

      <div>
        <p style={{ fontWeight: '700', color: 'var(--primary-color)' }}>Mobile</p>
        <p>+919906514212</p>
      </div>

      <div>
        <p style={{ fontWeight: '700', color: 'var(--primary-color)' }}>Office Hours</p>
        <p>Monday – friday<br />9:00 AM – 6:00 PM</p>
      </div>
    </div>

    {/* Google Map */}
    <div style={{ marginTop: '3rem', borderRadius: '12px', overflow: 'hidden' }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3177.1828209740074!2d91.75732180108172!3d26.18475097837061!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a598f686e15b1%3A0xcc0da3e76387cb7f!2sAlterera%20Networks%20%7C%20AI%20%26%20Tech%20Solutions%20in%20Guwahati%2C%20Assam!5e0!3m2!1sen!2sin!4v1764765075918!5m2!1sen!2sin"
        width="100%"
        height="350"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</div>


        <div className="form-container">
          <h2 style={{
            textAlign: 'center',
            marginBottom: '2rem',
            fontSize: '2rem',
            fontWeight: '700',
            fontFamily: 'Poppins, sans-serif',
            background: 'var(--primary-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Send Us a Message
          </h2>

        {submitMessage && (
          <div className="success-message">
            {submitMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Your Email *</label>
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
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Send Message
          </button>
        </form>
      </div>

       <div
  style={{
    marginTop: '3rem',
    padding: '3.5rem 2.5rem',
    backgroundImage:
      "url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1600&q=80')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    borderRadius: '16px',
    textAlign: 'center',
    boxShadow: 'var(--shadow-lg)',
    border: '1px solid var(--primary-color-light)',
    position: 'relative',
    overflow: 'hidden',
    color: 'white'
  }}
>

  {/* Overlay */}
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.55)',
      borderRadius: '16px'
    }}
  ></div>

  {/* Content */}
  <div style={{ position: 'relative', zIndex: 2 }}>
    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏫</div>

    <h3
      style={{
        background: 'var(--primary-gradient)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '1rem',
        fontSize: '1.75rem',
        fontWeight: '700',
        fontFamily: 'Poppins, sans-serif',
        color: 'white'
      }}
    >
      Visit Our Campus
    </h3>

    <p
      style={{
        color: '#f0f0f0',
        fontSize: '1.05rem',
        marginBottom: '1rem'
      }}
    >
      We'd love to show you around! Schedule a campus tour to see our facilities and meet our instructors.
    </p>

    <p
      style={{
        marginTop: '1.5rem',
        fontSize: '1.05rem',
        color: '#ffffff'
      }}
    >
      Call us at{" "}
      <strong style={{ color: 'var(--primary-color)' }}>+91 98765 43210</strong> to book your visit.
    </p>
  </div>

</div>

      </div>
    </div>
  )
}

export default Contact
