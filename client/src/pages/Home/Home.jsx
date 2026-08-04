import "./Home.css";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import HackathonCard from "../../components/HackathonCard/HackathonCard";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import WhyHackVerse from "../../components/WhyHackVerse/WhyHackVerse";

const featured = [
  {
    id: 1,
    title: "HackVerse 2026",
    description: "India's largest student hackathon.",
    prize: "₹1,00,000",
    date: "10 Aug",
    teamSize: "4 Members",
    mode: "Online",
  },
  {
    id: 2,
    title: "AI Challenge",
    description: "Build AI for healthcare.",
    prize: "₹75,000",
    date: "18 Aug",
    teamSize: "3 Members",
    mode: "Hybrid",
  },
  {
    id: 3,
    title: "CodeStorm",
    description: "24-hour coding marathon.",
    prize: "₹50,000",
    date: "25 Aug",
    teamSize: "5 Members",
    mode: "Offline",
  },
];

export default function Home() {
  return (
    <>
      <div className="page">
        <div className="container hero">
          <p className="hero-tag">
            FOR STUDENTS • ORGANIZERS • DEVELOPERS
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
            build teams, collaborate and submit projects —
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

      <section className="featured-section">
        <div className="container">

          <SectionTitle
            tag="FEATURED"
            title="Featured Hackathons"
            subtitle="Join exciting competitions from universities and companies across the country."
          />

          <div className="hackathon-grid">
            {featured.map((hackathon) => (
              <HackathonCard
                key={hackathon.id}
                hackathon={hackathon}
              />
            ))}
          </div>

        </div>
      </section>
      <HowItWorks />
      <WhyHackVerse />
    </>
  );
}