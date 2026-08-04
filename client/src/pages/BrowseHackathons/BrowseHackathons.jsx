import { useEffect, useState } from "react";
import "./BrowseHackathons.css";

import HackathonCard from "../../components/HackathonCard/HackathonCard";
import FilterBar from "../../components/FilterBar/FilterBar";

import { getHackathons } from "../../services/hackathonService";

export default function BrowseHackathons() {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchHackathons() {
      try {
        const data = await getHackathons();
        setHackathons(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load hackathons.");
      } finally {
        setLoading(false);
      }
    }

    fetchHackathons();
  }, []);

  return (
    <section className="browse-page">
      <div className="container">

        <div className="browse-header">

          <div>
            <p className="browse-tag">
              DISCOVER EVENTS
            </p>

            <h1>
              Browse Hackathons
            </h1>

            <p className="browse-subtitle">
              Find competitions, build amazing projects and collaborate with developers.
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

        {loading ? (

          <h2 style={{ textAlign: "center", marginTop: "50px" }}>
            Loading Hackathons...
          </h2>

        ) : error ? (

          <h2 style={{ textAlign: "center", color: "red", marginTop: "50px" }}>
            {error}
          </h2>

        ) : hackathons.length === 0 ? (

          <h2 style={{ textAlign: "center", marginTop: "50px" }}>
            No hackathons found.
          </h2>

        ) : (

          <div className="hackathon-grid">
            {hackathons.map((hackathon) => (
              <HackathonCard
                key={hackathon._id}
                hackathon={hackathon}
              />
            ))}
          </div>

        )}

      </div>
    </section>
  );
}