import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Teams.css";

import {
  getMyTeams,
  leaveTeam,
  deleteTeam,
} from "../../services/teamService";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  const fetchTeams = async () => {
    try {
      const data = await getMyTeams();

      setTeams(data.teams || data || []);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to load your teams."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleLeave = async (teamId) => {
    const confirmed = window.confirm(
      "Are you sure you want to leave this team?"
    );

    if (!confirmed) return;

    setActionLoading(teamId);

    try {
      await leaveTeam(teamId);

      setTeams((prev) =>
        prev.filter((team) => team._id !== teamId)
      );
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Could not leave team."
      );
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (teamId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this team?"
    );

    if (!confirmed) return;

    setActionLoading(teamId);

    try {
      await deleteTeam(teamId);

      setTeams((prev) =>
        prev.filter((team) => team._id !== teamId)
      );
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Could not delete team."
      );
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <section className="teams-page">
        <div className="container">
          <h2>Loading your teams...</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="teams-page">
      <div className="container">

        <div className="teams-header">
          <p className="teams-tag">
            YOUR TEAMS
          </p>

          <h1>
            My Teams
          </h1>

          <p>
            Teams you've created or joined for hackathons.
          </p>
        </div>

        {error && (
          <p className="teams-error">
            {error}
          </p>
        )}

        {!error && teams.length === 0 && (
          <div className="teams-empty">
            <h2>No teams yet</h2>

            <p>
              Create a team from a hackathon and start building.
            </p>

            <Link
              to="/hackathons"
              className="teams-browse-btn"
            >
              Browse Hackathons
            </Link>
          </div>
        )}

        <div className="teams-grid">

          {teams.map((team) => (
            <div
              className="team-card"
              key={team._id}
            >

              <div className="team-card-top">

                <div>
                  <h2>{team.name}</h2>

                  <p>
                    {team.hackathon?.title ||
                      "Hackathon"}
                  </p>
                </div>

                <span className="team-member-count">
                  {team.members?.length || 0} members
                </span>

              </div>

              <div className="team-members">

                <h3>Members</h3>

                {team.members?.map((member) => (
                  <div
                    className="team-member"
                    key={member._id}
                  >
                    <span>
                      {member.name}
                    </span>

                    {member._id ===
                      team.leader?._id && (
                      <span className="leader-badge">
                        Leader
                      </span>
                    )}
                  </div>
                ))}

              </div>

              <div className="team-actions">

                <Link
                  to={`/teams/${team._id}`}
                  className="team-view-btn"
                >
                  View Team
                </Link>


         

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}