import "./Login.css";

export default function Login() {
  return (
    <div className="login-page">
      <div className="login-card">

        <p className="login-tag">
          Welcome Back
        </p>

        <h1>
          Sign in to HackVerse
        </h1>

        <p className="login-subtitle">
          Continue building, competing and collaborating.
        </p>

        <form>

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
              placeholder="Enter your password"
            />
          </div>

          <button className="login-button">
            Login
          </button>

        </form>

        <p className="bottom-text">
          Don't have an account?
          <span> Register</span>
        </p>

      </div>
    </div>
  );
}