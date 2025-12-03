import { Link } from 'react-router-dom'
import mern from "../images/becomeamernstackdeveloper-mobile.png"
import python from "../images/python.png"
import datasac from "../images/unnamed.png"
import instructor from "../images/Screenshot 2025-12-03 124846.png"

function Home() {
  const featuredCourses = [
    {
      name: 'MERN Full Stack',
      description: 'Master MongoDB, Express, React, and Node.js with real-world projects',
      icon: mern
    },
    {
      name: 'Python Full Stack',
      description: 'Complete Python web development with Django/Flask and modern frameworks',
      icon: python
    },
    {
      name: 'Data Science',
      description: 'Analytics, Machine Learning, and AI with cutting-edge tools',
      icon: datasac
    }
  ]

  const features = [
    { title: 'Expert Instructors', description: 'Learn from industry professionals', icon: '👨‍🏫' },
    { title: 'Hands-on Projects', description: 'Build real-world applications', icon: '💻' },
    { title: 'Job Assistance', description: 'Career support and placement', icon: '🎯' },
    { title: 'Flexible Learning', description: 'Study at your own pace', icon: '⏰' }
  ]

  return (
    <div>
      {/* HERO SECTION */}
    <section
  className="hero"
  style={{
    backgroundImage: `url('https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=1600&q=80')`,
  }}
>
  <h1>Welcome to Alterera Academy</h1>
  <p>Transform Your Career with Industry-Leading Training Programs</p>

  <Link
    to="/register"
    className="btn"
    style={{ animation: 'fadeInUp 0.8s ease-out 0.4s backwards' }}
  >
    Register Now
  </Link>
</section>


      <div className="container">

       
        <section style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{
            fontSize: '2.75rem',
            marginBottom: '1.5rem',
            fontWeight: '700',
            fontFamily: 'Poppins, sans-serif',
            background: 'var(--primary-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Why Choose Alterera Academy?
          </h2>
          <p style={{
            fontSize: '1.2rem',
            maxWidth: '900px',
            margin: '0 auto',
            color: 'var(--text-secondary)',
            lineHeight: '1.8'
          }}>
            We provide comprehensive training programs designed to equip you with
            the skills needed to excel in today's competitive tech industry.
            Our expert instructors and hands-on approach ensure you're job-ready.
          </p>
        </section>

        {/* FEATURES */}
        <section style={{ marginBottom: '5rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            {features.map((feature, index) => (
              <div key={index} style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '16px',
                textAlign: 'center',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--primary-color-light)',
                transition: 'var(--transition)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'var(--shadow-md)'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{feature.icon}</div>
                <h3 style={{
                  color: 'var(--primary-color)',
                  marginBottom: '0.5rem',
                  fontSize: '1.3rem',
                  fontWeight: '700'
                }}>{feature.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED COURSES */}
        <section>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            marginBottom: '3rem',
            fontWeight: '700',
            fontFamily: 'Poppins, sans-serif',
            color: 'var(--text-primary)'
          }}>
            Featured Courses
          </h2>
          <div className="courses-grid">
            {featuredCourses.map((course, index) => (
              <div key={index} className="course-card">
                <img src={course.icon} alt={course.name} style={{ width: '100%', height: '240px', objectFit: 'contain', borderRadius: '8px', marginBottom: '1rem', backgroundColor: 'var(--light-color)' }} />
                <h3>{course.name}</h3>
                <p>{course.description}</p>
                <Link to="/courses" className="btn btn-primary" style={{ marginTop: '1.5rem', width: '100%', textAlign: 'center' }}>
                  View All Courses
                </Link>
              </div>
            ))}
          </div>
        </section>


        {/* INSTRUCTOR SECTION */}
        <section 
          style={{
            textAlign: 'center',
            marginTop: '5rem',
            padding: '4rem 2rem',
            background: 'linear-gradient(180deg, #E7F5FF, #FFFFFF)',
            borderRadius: '20px',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <img 
            src={instructor}
            alt="Course Instructor"
            style={{
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '6px solid white',
              boxShadow: '0 10px 35px rgba(0,0,0,0.15)',
              marginBottom: '1.5rem'
            }}
          />

          <h4 style={{
            color: 'var(--text-secondary)',
            fontWeight: '600',
            letterSpacing: '1px'
          }}>
            COURSE INSTRUCTOR
          </h4>

          <h2 style={{
            fontSize: '2.2rem',
            marginTop: '0.5rem',
            fontFamily: 'Poppins, sans-serif',
            fontWeight: '800',
            color: 'var(--text-primary)'
          }}>
            Ravi Kumar Pandey
          </h2>

          <p style={{
            fontSize: '1.1rem',
            marginTop: '0.5rem',
            color: 'var(--text-secondary)'
          }}>
            Ravi Kumar Pandey, CTO of Alterera Networks
          </p>
        </section>


      
        <section
  style={{
    textAlign: 'center',
    marginTop: '5rem',
    padding: '3.5rem 2.5rem',
    backgroundImage:
      "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    borderRadius: '16px',
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
    <h2
      style={{
        background: 'var(--primary-gradient)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '1rem',
        fontSize: '2.25rem',
        fontWeight: '700',
        fontFamily: 'Poppins, sans-serif',
        color: 'white'
      }}
    >
      Ready to Start Your Journey?
    </h2>

    <p
      style={{
        marginBottom: '2rem',
        fontSize: '1.15rem',
        color: '#f0f0f0'
      }}
    >
      Join thousands of successful students who transformed their careers with us
    </p>

    <Link to="/register" className="btn btn-primary" style={{ fontSize: '1.1rem' }}>
      Enroll Today
    </Link>
  </div>

</section>

      </div>
    </div>
  )
}

export default Home