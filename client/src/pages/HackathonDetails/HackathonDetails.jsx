import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./HackathonDetails.css";

import {
  CalendarDays,
  Trophy,
  Users,
  Globe,
  Clock,
} from "lucide-react";

import { getHackathonById } from "../../services/hackathonService";

export default function HackathonDetails() {
  const { id } = useParams();

  const [hackathon, setHackathon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchHackathon() {
      try {
        const data = await getHackathonById(id);

        setHackathon(data.hackathon || data);
      } catch (err) {
        console.error(err);
        setError("Failed to load hackathon.");
      } finally {
        setLoading(false);
      }
    }

    fetchHackathon();
  }, [id]);

  if (loading) {
    return (
      <section className="details-page">
        <div className="container">
          <h2>Loading Hackathon...</h2>
        </div>
      </section>
    );
  }

  if (error || !hackathon) {
    return (
      <section className="details-page">
        <div className="container">
          <h2>{error || "Hackathon not found."}</h2>
        </div>
      </section>
    );
  }

  const startDate = new Date(hackathon.startDate).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  const deadline = new Date(
    hackathon.registrationDeadline
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <section className="details-page">
      <div className="container">

        <div className="details-header">

          <span className="status-badge open">
            ● OPEN
          </span>

          <h1>{hackathon.title}</h1>

          <p>
            {hackathon.description}
          </p>

          <button className="join-btn">
            Join Hackathon
          </button>

        </div>

        <div className="details-grid">

          <div className="details-card">

            <h3>Event Details</h3>

            <div className="info-row">
              <CalendarDays size={18} />
              <span>{startDate}</span>
            </div>

            <div className="info-row">
              <Clock size={18} />
              <span>
                Registration ends {deadline}
              </span>
            </div>

            <div className="info-row">
              <Trophy size={18} />
              <span>
                ₹{hackathon.prizePool?.toLocaleString()} Prize Pool
              </span>
            </div>

            <div className="info-row">
              <Users size={18} />
              <span>
                Max Team Size: {hackathon.maxTeamSize}
              </span>
            </div>

            <div className="info-row">
              <Globe size={18} />
              <span>
                {hackathon.mode}
              </span>
            </div>

          </div>

          <div className="details-card">

            <h3>About</h3>

            <p>
              {hackathon.description}
            </p>

            {hackathon.location && (
              <p>
                Location: {hackathon.location}
              </p>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}