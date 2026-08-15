import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();

  const { user, loading, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">

        <Link to="/" className="logo">
          HackVerse
        </Link>

        <nav className="nav-links">

          <NavLink to="/hackathons">
            Browse
          </NavLink>

          {user?.role === "student" && (
            <NavLink to="/teams">
              Teams
            </NavLink>
          )}


          {user?.role === "organiser" && (
            <NavLink to="/organizer">
              Dashboard
            </NavLink>
          )}

        </nav>

        <div className="nav-actions">


          {!loading && !user && (
            <>
              <NavLink
                to="/login"
                className="nav-login"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="nav-register"
              >
                Register
              </NavLink>
            </>
          )}

          
          {!loading && user && (
            <>
              <span className="nav-user">
                Hi, {user.name}
              </span>

              <button
                type="button"
                className="nav-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>
    </header>
  );
}