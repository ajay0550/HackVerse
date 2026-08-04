import Navbar from "./components/Navbar/Navbar";
import Login from "./pages/Login/Login";

export default function App() {
  return (
    <>
      <Navbar />
      <Login />

      <div className="page">
        <div className="container hero">

          <p className="hero-tag">
            🚀 The modern platform for hackathons
          </p>

          <h1 className="hero-title">
            Find teammates.
            <br />
            Build projects.
            <br />
            Win hackathons.
          </h1>

          <p className="hero-description">
            HackVerse helps students discover hackathons,
            build teams, collaborate, and submit projects—
            all in one place.
          </p>

          <div className="hero-buttons">

            <button className="primary-btn">
              Browse Hackathons
            </button>

            <button className="secondary-btn">
              Host a Hackathon
            </button>

          </div>

        </div>
      </div>
    </>
  );
}

