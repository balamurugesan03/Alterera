import { Link } from 'react-router-dom'

function Courses() {
  const courses = [
    {
      name: 'MERN Full Stack',
      description: 'Master the complete MERN stack - MongoDB, Express.js, React, and Node.js. Build modern, scalable web applications from scratch.',
      duration: '6 months',
      fee: '₹50,000',
      icon: '🚀',
      highlights: ['Real Projects', 'Live Training', 'Interview Prep']
    },
    {
      name: 'Python Full Stack',
      description: 'Learn full-stack development with Python, Django/Flask, PostgreSQL, and front-end technologies. Perfect for aspiring developers.',
      duration: '6 months',
      fee: '₹45,000',
      icon: '🐍',
      highlights: ['Django & Flask', 'REST APIs', 'Deployment']
    },
    {
      name: 'Data Science',
      description: 'Dive into data analytics, machine learning, and AI with Python. Learn pandas, NumPy, scikit-learn, and TensorFlow.',
      duration: '5 months',
      fee: '₹55,000',
      icon: '📊',
      highlights: ['ML Algorithms', 'Data Analysis', 'AI Projects']
    },
    {
      name: 'Java Full Stack',
      description: 'Comprehensive Java development with Spring Boot, Hibernate, REST APIs, and modern front-end frameworks.',
      duration: '6 months',
      fee: '₹48,000',
      icon: '☕',
      highlights: ['Spring Boot', 'Microservices', 'Cloud Deploy']
    },
    {
      name: 'UI/UX Design',
      description: 'Master user interface and user experience design. Learn Figma, Adobe XD, prototyping, and design thinking principles.',
      duration: '4 months',
      fee: '₹35,000',
      icon: '🎨',
      highlights: ['Figma', 'User Research', 'Prototyping']
    },
    {
      name: 'Digital Marketing',
      description: 'Complete digital marketing training including SEO, SEM, social media marketing, content marketing, and analytics.',
      duration: '3 months',
      fee: '₹30,000',
      icon: '📱',
      highlights: ['SEO/SEM', 'Social Media', 'Analytics']
    }
  ]

  return (
    <div>
     <section
  style={{
    backgroundImage:
      "url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: "white",
    padding: "5rem 2rem 4rem",
    textAlign: "center"
  }}
>
  <div
    style={{
      background: "rgba(0, 0, 0, 0.55)",
      padding: "3rem 1rem",
      borderRadius: "12px"
    }}
  >
    <h1
      style={{
        fontSize: "3.5rem",
        marginBottom: "1.5rem",
        fontWeight: "800",
        fontFamily: "Poppins, sans-serif",
        letterSpacing: "-1px"
      }}
    >
      Our Courses
    </h1>

    <p
      style={{
        fontSize: "1.3rem",
        maxWidth: "800px",
        margin: "0 auto",
        opacity: "0.95",
        lineHeight: "1.7"
      }}
    >
      Choose from our comprehensive range of industry-relevant courses designed to boost your career
    </p>
  </div>
</section>


      <div className="container">
        <div className="courses-grid">
          {courses.map((course, index) => (
            <div key={index} className="course-card">
              <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>{course.icon}</div>
              <h3>{course.name}</h3>
              <p>{course.description}</p>

              <div style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
                marginTop: '1.5rem',
                marginBottom: '1rem'
              }}>
                {course.highlights.map((highlight, idx) => (
                  <span key={idx} style={{
                    background: 'var(--primary-color-light)',
                    color: 'var(--primary-color)',
                    padding: '0.4rem 0.9rem',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}>
                    {highlight}
                  </span>
                ))}
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '1.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--primary-color-light)'
              }}>
                <div>
                  <p style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '0.3rem'
                  }}>
                    Duration
                  </p>
                  <p style={{
                    fontWeight: '700',
                    color: 'var(--text-primary)',
                    fontSize: '1.1rem'
                  }}>
                    {course.duration}
                  </p>
                </div>
                <p className="course-fee">{course.fee}</p>
              </div>

              <Link to="/register" className="btn btn-primary" style={{
                marginTop: '1.5rem',
                width: '100%',
                textAlign: 'center',
                display: 'block'
              }}>
                Register Now
              </Link>
            </div>
          ))}
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '4rem',
          padding: '3.5rem 2.5rem',
          background: 'white',
          borderRadius: '16px',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--primary-color-light)'
        }}>
          <h3 style={{
            background: 'var(--primary-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1rem',
            fontSize: '2rem',
            fontWeight: '700',
            fontFamily: 'Poppins, sans-serif'
          }}>Not sure which course is right for you?</h3>
          <p style={{
            marginBottom: '2rem',
            fontSize: '1.1rem',
            color: 'var(--text-secondary)'
          }}>Contact us for personalized guidance and course recommendations</p>
          <Link to="/contact" className="btn btn-primary">Get in Touch</Link>
        </div>
      </div>
    </div>
  )
}

export default Courses
