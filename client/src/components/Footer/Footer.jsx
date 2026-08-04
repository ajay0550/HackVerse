import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">

        <div className="footer-main">

          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              HackVerse
            </Link>

            <p>
              Find teammates.
              <br />
              Build projects.
              <br />
              Win hackathons.
            </p>
          </div>

          <div className="footer-links">

            <div>
              <h4>Platform</h4>

              <Link to="/hackathons">Browse Hackathons</Link>
              <Link to="/">Home</Link>
            </div>

            <div>
              <h4>Account</h4>

              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>

          </div>

        </div>

        <div className="footer-bottom">
          <p>© 2026 HackVerse. All rights reserved.</p>

          <p>Built with ❤️ using React & Node.js</p>
        </div>

      </div>
    </footer>
  );
}