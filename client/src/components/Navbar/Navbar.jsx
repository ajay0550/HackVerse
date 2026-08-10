import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

import api from "../../services/api";

export default function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/api/users/profile");

        setUser(data.user || data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);

        // Token is probably invalid/expired
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
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

          <NavLink to="/teams">
            Teams
          </NavLink>

          <NavLink to="/host">
            Host
          </NavLink>
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