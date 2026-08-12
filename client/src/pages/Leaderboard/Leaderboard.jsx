import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Trophy,
  Medal,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";

import "./Leaderboard.css";

import { getHackathonById } from "../../services/hackathonService";
import { getHackathonLeaderboard } from "../../services/submissionService";

export default function Leaderboard() {
  const { id } = useParams();

  const [hackathon, setHackathon] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const hackathonData = await getHackathonById(id);
        const leaderboardData =
          await getHackathonLeaderboard(id);

        setHackathon(
          hackathonData.hackathon || hackathonData
        );

        setLeaderboard(leaderboardData);
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message ||
            "Failed to load leaderboard."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [id]);

  if (loading) {
    return (
      <section className="leaderboard-page">
        <div className="container">
          <p>Loading leaderboard...</p>
        </div>
      </section>
    );
  }

  if (error || !hackathon) {
    return (
      <section className="leaderboard-page">
        <div className="container">
          <p className="leaderboard-error">
            {error || "Hackathon not found."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="leaderboard-page">
      <div className="container">

        <Link
          to={`/hackathons/${hackathon._id}`}
          className="leaderboard-back"
        >
          <ArrowLeft size={18} />
          Back to Hackathon
        </Link>

        <div className="leaderboard-header">

          <div className="trophy-icon">
            <Trophy size={30} />
          </div>

          <p className="leaderboard-tag">
            RESULTS
          </p>

          <h1>
            {hackathon.title}
          </h1>

          <p>
            Hackathon Leaderboard
          </p>

        </div>

        {leaderboard.length === 0 ? (

          <div className="leaderboard-empty">

            <Trophy size={40} />

            <h2>
              No results yet
            </h2>

            <p>
              Teams will appear here once their
              submissions have been judged.
            </p>

          </div>

        ) : (

          <div className="leaderboard-list">

            {leaderboard.map((submission, index) => {

              const position = index + 1;

              return (
                <div
                  className={`leaderboard-row ${
                    position <= 3
                      ? `rank-${position}`
                      : ""
                  }`}
                  key={submission._id}
                >

                  <div className="rank">

                    {position === 1 && (
                      <Trophy size={22} />
                    )}

                    {position === 2 && (
                      <Medal size={22} />
                    )}

                    {position === 3 && (
                      <Medal size={22} />
                    )}

                    {position > 3 && (
                      <span>
                        {position}
                      </span>
                    )}

                  </div>

                  <div className="team-result">

                    <p>
                      TEAM
                    </p>

                    <h2>
                      {submission.team?.name ||
                        "Unknown Team"}
                    </h2>

                  </div>

                  <div className="score">

                    <strong>
                      {submission.score}
                    </strong>

                    <span>
                      / 100
                    </span>

                  </div>

                  

                </div>
              );
            })}

          </div>
        )}

      </div>
    </section>
  );
}