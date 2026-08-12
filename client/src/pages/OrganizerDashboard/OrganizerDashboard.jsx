import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./OrganizerDashboard.css";

import { CalendarDays, Trophy, Users, ArrowRight } from "lucide-react";

import { getMyHackathons } from "../../services/hackathonService";

export default function OrganizerDashboard() {
  const [hackathons, setHackathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const data = await getMyHackathons();

        setHackathons(data);
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message ||
            "Failed to load your hackathons."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHackathons();
  }, []);

  if (loading) {
    return (
      <section className="organizer-page">
        <div className="container">
          <p className="organizer-loading">
            Loading your hackathons...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="organizer-page">
      <div className="container">

        <div className="organizer-header">
          <div>
            <p className="organizer-tag">
              ORGANIZER DASHBOARD
            </p>

            <h1>
              My Hackathons
            </h1>

            <p>
              Manage your hackathons and review participant
              submissions.
            </p>
          </div>

          <Link
            to="/host"
            className="create-hackathon-btn"
          >
            Host Hackathon
          </Link>
        </div>

        {error && (
          <p className="organizer-error">
            {error}
          </p>
        )}

        {!error && hackathons.length === 0 && (
          <div className="empty-organizer">
            <h2>
              No hackathons yet
            </h2>

            <p>
              Create your first hackathon and start
              building your community.
            </p>

            <Link
              to="/host"
              className="create-hackathon-btn"
            >
              Create Hackathon
            </Link>
          </div>
        )}

        {!error && hackathons.length > 0 && (
          <div className="organizer-grid">

            {hackathons.map((hackathon) => (
              <div
                className="organizer-card"
                key={hackathon._id}
              >

                <div className="organizer-card-top">
                  <span className="organizer-status">
                    ● ACTIVE
                  </span>

                  <span className="organizer-mode">
                    {hackathon.mode}
                  </span>
                </div>

                <h2>
                  {hackathon.title}
                </h2>

                <p className="organizer-description">
                  {hackathon.description}
                </p>

                <div className="organizer-info">

                  <div>
                    <CalendarDays size={17} />
                    <span>
                      {new Date(
                        hackathon.startDate
                      ).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div>
                    <Trophy size={17} />
                    <span>
                      ₹{hackathon.prizePool?.toLocaleString()}
                    </span>
                  </div>

                  <div>
                    <Users size={17} />
                    <span>
                      Max {hackathon.maxTeamSize}
                    </span>
                  </div>

                </div>

                <Link
                  to={`/organizer/hackathons/${hackathon._id}`}
                  className="manage-hackathon-btn"
                >
                  Manage Hackathon
                  <ArrowRight size={17} />
                </Link>

              </div>
            ))}

          </div>
        )}

      </div>
    </section>
  );
}