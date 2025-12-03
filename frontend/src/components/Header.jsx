import { Link } from 'react-router-dom'
import altereraLogo from "../images/alterera.jpg"

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <img src={altereraLogo} alt="Alterera Academy" className="logo" />
          <h1 className="academy-name">Alterera Academy</h1>
        </div>

        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/register">Register</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
