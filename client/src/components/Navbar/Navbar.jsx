import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container navbar-container">

        <Link to="/" className="logo">
          HackVerse
        </Link>

        <nav className="nav-links">
          <NavLink to="/hackathons">Browse</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/host">Host</NavLink>
        </nav>

        <div className="nav-actions">
          <NavLink to="/login" className="nav-login">
            Login
          </NavLink>

          <NavLink to="/register" className="nav-register">
            Register
          </NavLink>
        </div>

      </div>
    </header>
  );
}