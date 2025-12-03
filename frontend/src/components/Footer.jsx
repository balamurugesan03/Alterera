function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{
            fontSize: '2rem',
            marginBottom: '1rem',
            fontWeight: '700',
            fontFamily: 'Poppins, sans-serif'
          }}>
            Alterera Academy
          </h3>
          <p style={{
            fontSize: '1.05rem',
            opacity: '0.9',
            maxWidth: '600px',
            margin: '0 auto 1.5rem'
          }}>
            Empowering futures through quality education and industry-relevant training programs
          </p>
        </div>

        <div style={{
          borderTop: '1px solid var(--border-light)',
          paddingTop: '2rem',
          marginTop: '1rem'
        }}>
          <p style={{
            fontSize: '0.95rem',
            opacity: '0.8'
          }}>
            &copy; {currentYear} Alterera Academy. All rights reserved.
          </p>
          <p style={{
            fontSize: '0.9rem',
            opacity: '0.7',
            marginTop: '0.5rem'
          }}>
            Building tomorrow's tech leaders today
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
