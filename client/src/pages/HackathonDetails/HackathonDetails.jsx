import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./HackathonDetails.css";

import {
  CalendarDays,
  Trophy,
  Users,
  Globe,
  Clock,
} from "lucide-react";

import { getHackathonById } from "../../services/hackathonService";
import {
  createTeam,
  getHackathonTeams,
  sendJoinRequest,
} from "../../services/teamService";

export default function HackathonDetails() {
  const { id } = useParams();

  const [hackathon, setHackathon] = useState(null);
  const [teams, setTeams] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showTeamForm, setShowTeamForm] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [creatingTeam, setCreatingTeam] = useState(false);
  const [teamError, setTeamError] = useState("");

  const [requestingId, setRequestingId] = useState(null);
  const [requestedTeams, setRequestedTeams] = useState([]);

  const fetchData = async () => {
    try {
      const [hackathonData, teamsData] = await Promise.all([
        getHackathonById(id),
        getHackathonTeams(id),
      ]);

      setHackathon(hackathonData.hackathon || hackathonData);
      setTeams(teamsData.teams || teamsData || []);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Failed to load hackathon."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleCreateTeam = async (e) => {
    e.preventDefault();

    setTeamError("");

    if (!teamName.trim()) {
      setTeamError("Team name is required.");
      return;
    }

    setCreatingTeam(true);

    try {
      await createTeam({
        name: teamName.trim(),
        hackathon: id,
      });

      setTeamName("");
      setShowTeamForm(false);

      await fetchData();
    } catch (err) {
      setTeamError(
        err.response?.data?.message ||
          "Could not create team."
      );
    } finally {
      setCreatingTeam(false);
    }
  };

  const handleJoinRequest = async (teamId) => {
    setRequestingId(teamId);

    try {
      await sendJoinRequest(teamId);

      setRequestedTeams((prev) => [
        ...prev,
        teamId,
      ]);
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Could not send join request."
      );
    } finally {
      setRequestingId(null);
    }
  };

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
          <h2>
            {error || "Hackathon not found."}
          </h2>
        </div>
      </section>
    );
  }

  const startDate = new Date(
    hackathon.startDate
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

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

          <button
            className="join-btn"
            onClick={() =>
              setShowTeamForm(true)
            }
          >
            Create a Team
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
                Max Team Size:{" "}
                {hackathon.maxTeamSize}
              </span>
            </div>

            <div className="info-row">
              <Globe size={18} />
              <span>{hackathon.mode}</span>
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

        {showTeamForm && (
          <div className="details-card team-form-card">

            <h3>Create a Team</h3>

            <form onSubmit={handleCreateTeam}>

              <div className="input-group">
                <label>Team Name</label>

                <input
                  type="text"
                  placeholder="Enter team name"
                  value={teamName}
                  onChange={(e) =>
                    setTeamName(e.target.value)
                  }
                />
              </div>

              {teamError && (
                <p className="team-error">
                  {teamError}
                </p>
              )}

              <div className="team-form-actions">

                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() =>
                    setShowTeamForm(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="join-btn"
                  disabled={creatingTeam}
                >
                  {creatingTeam
                    ? "Creating..."
                    : "Create Team"}
                </button>

              </div>

            </form>

          </div>
        )}

        <div className="hackathon-teams">

          <div className="teams-section-header">
            <div>
              <p className="details-tag">
                TEAMS
              </p>

              <h2>
                Registered Teams
              </h2>
            </div>
          </div>

          {teams.length === 0 ? (
            <p className="no-teams">
              No teams have registered yet.
            </p>
          ) : (
            <div className="hackathon-team-list">

              {teams.map((team) => {

                const requested =
                  requestedTeams.includes(
                    team._id
                  );

                return (
                  <div
                    className="hackathon-team-card"
                    key={team._id}
                  >

                    <div>
                      <h3>
                        {team.name}
                      </h3>

                      <p>
                        {team.members?.length || 0}{" "}
                        member(s)
                      </p>
                    </div>

                    <div className="hackathon-team-actions">

                      <Link
                        to={`/teams/${team._id}`}
                        className="team-view-btn"
                      >
                        View Team
                      </Link>

                      <button
                        className="join-team-btn"
                        disabled={
                          requested ||
                          requestingId === team._id
                        }
                        onClick={() =>
                          handleJoinRequest(
                            team._id
                          )
                        }
                      >
                        {requestingId === team._id
                          ? "Sending..."
                          : requested
                          ? "Request Sent"
                          : "Request to Join"}
                      </button>

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </div>

      </div>
    </section>
  );
}