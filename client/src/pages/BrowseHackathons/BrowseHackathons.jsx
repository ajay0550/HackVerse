import "./BrowseHackathons.css";
import HackathonCard from "../../components/HackathonCard/HackathonCard";
import FilterBar from "../../components/FilterBar/FilterBar";

const hackathons = [
  {
    id: 1,
    title: "HackVerse 2026",
    description: "National level hackathon for developers.",
    prize: "₹100,000",
    date: "10 Aug 2026",
    teamSize: "4 Members",
    mode: "Online",
  },
  {
    id: 2,
    title: "AI Challenge",
    description: "Build AI solutions to real-world problems.",
    prize: "₹50,000",
    date: "22 Aug 2026",
    teamSize: "3 Members",
    mode: "Offline",
  },
  {
    id: 3,
    title: "CodeFest",
    description: "24-hour coding marathon.",
    prize: "₹75,000",
    date: "30 Aug 2026",
    teamSize: "5 Members",
    mode: "Hybrid",
  },
];

export default function BrowseHackathons() {
  return (
    <section className="browse-page">
      <div className="container">
        <div className="browse-header">
          <div>
            <p className="browse-tag">DISCOVER EVENTS</p>

            <h1>Browse Hackathons</h1>

            <p className="browse-subtitle">
              Find competitions, build amazing projects and collaborate with
              developers.
            </p>
          </div>

          <div className="browse-search">
            <input
              type="text"
              placeholder="Search hackathons..."
            />
          </div>
        </div>

        
        <FilterBar />

        
        <div className="hackathon-grid">
          {hackathons.map((hackathon) => (
            <HackathonCard
              key={hackathon.id}
              hackathon={hackathon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}