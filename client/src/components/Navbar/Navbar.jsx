import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-container">

        <Link to="/" className="logo">
          HackVerse
        </Link>

        <nav className="nav-links">
          <Link to="/hackathons">Browse</Link>
          <Link to="/teams">Teams</Link>
          <Link to="/host">Host</Link>
        </nav>

        <div className="nav-actions">
          <button className="login-btn">
            Login
          </button>
        </div>

      </div>
    </header>
  );
}