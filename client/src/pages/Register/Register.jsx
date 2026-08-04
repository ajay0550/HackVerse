import "./Register.css";

export default function Register() {
  return (
    <div className="register-page">
      <div className="register-card">

        <p className="register-tag">
          Join HackVerse
        </p>

        <h1>
          Create your account
        </h1>

        <p className="register-subtitle">
          Start participating in hackathons and building amazing projects.
        </p>

        <form>

          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
            />
          </div>

          <div className="input-group">
            <label>Role</label>

            <select>
              <option>Student</option>
              <option>Organizer</option>
            </select>
          </div>

          <button className="register-button">
            Create Account
          </button>

        </form>

        <p className="bottom-text">
          Already have an account?
          <span> Login</span>
        </p>

      </div>
    </div>
  );
}