import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./TeamDetails.css";

import {
  Users,
  Crown,
  CalendarDays,
  ArrowLeft,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

import {
  getTeamById,
  getJoinRequests,
  acceptJoinRequest,
  rejectJoinRequest,
  leaveTeam,
  deleteTeam,
} from "../../services/teamService";

export default function TeamDetails() {
  const { id } = useParams();

  const { user } = useAuth();

  const [team, setTeam] = useState(null);
  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(true);
  const [requestsLoading, setRequestsLoading] = useState(false);

  const [error, setError] = useState("");
  const [requestError, setRequestError] = useState("");

  const [actionLoading, setActionLoading] = useState(false);
  const [requestActionLoading, setRequestActionLoading] =
    useState(null);


  const currentUserId =
    user?._id || user?.id;

  const leaderId =
    team?.leader?._id || team?.leader;

  const isOrganizer =
    user?.role === "organiser";

  const isLeader =
    currentUserId &&
    leaderId &&
    currentUserId.toString() ===
      leaderId.toString();

  const isMember =
    team?.members?.some(
      (member) =>
        (member?._id || member)?.toString() ===
        currentUserId?.toString()
    );


  const fetchTeam = async () => {
    try {
      const data = await getTeamById(id);

      setTeam(data.team || data);

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to load team."
      );
    } finally {
      setLoading(false);
    }
  };


  const fetchJoinRequests = async () => {
    /*
      Only the team leader needs join requests.
      This also prevents unnecessary 403 requests
      for normal members and organizers.
    */

    if (!isLeader) {
      setRequests([]);
      return;
    }

    setRequestsLoading(true);
    setRequestError("");

    try {
      const data = await getJoinRequests(id);

      setRequests(data.requests || []);

    } catch (err) {
      console.error(err);

      setRequestError(
        err.response?.data?.message ||
          "Failed to load join requests."
      );

      setRequests([]);

    } finally {
      setRequestsLoading(false);
    }
  };


  useEffect(() => {
    fetchTeam();
  }, [id]);


  useEffect(() => {
    if (team) {
      fetchJoinRequests();
    }
  }, [team, id]);


  const handleAccept = async (requestId) => {
    setRequestActionLoading(requestId);

    try {
      await acceptJoinRequest(
        id,
        requestId
      );

      await fetchTeam();
      await fetchJoinRequests();

    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Could not accept request."
      );

    } finally {
      setRequestActionLoading(null);
    }
  };


  const handleReject = async (requestId) => {
    setRequestActionLoading(requestId);

    try {
      await rejectJoinRequest(
        id,
        requestId
      );

      await fetchJoinRequests();

    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Could not reject request."
      );

    } finally {
      setRequestActionLoading(null);
    }
  };


  const handleLeave = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to leave this team?"
    );

    if (!confirmed) return;

    setActionLoading(true);

    try {
      await leaveTeam(id);

      window.location.href = "/teams";

    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Could not leave team."
      );

    } finally {
      setActionLoading(false);
    }
  };


  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this team?"
    );

    if (!confirmed) return;

    setActionLoading(true);

    try {
      await deleteTeam(id);

      window.location.href = "/teams";

    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Could not delete team."
      );

    } finally {
      setActionLoading(false);
    }
  };


  if (loading) {
    return (
      <section className="team-details-page">
        <div className="container">
          <h2>Loading team...</h2>
        </div>
      </section>
    );
  }


  if (error || !team) {
    return (
      <section className="team-details-page">
        <div className="container">

          <p className="team-error">
            {error || "Team not found."}
          </p>

          <Link
            to="/teams"
            className="back-link"
          >
            <ArrowLeft size={18} />
            Back to Teams
          </Link>

        </div>
      </section>
    );
  }


  return (
    <section className="team-details-page">
      <div className="container">

        <Link
          to="/teams"
          className="back-link"
        >
          <ArrowLeft size={18} />
          Back to Teams
        </Link>


        <div className="team-details-header">

          <p className="team-details-tag">
            TEAM
          </p>

          <h1>{team.name}</h1>

          <p className="team-hackathon">
            {team.hackathon?.title ||
              "Hackathon"}
          </p>

        </div>


        <div className="team-details-grid">

          {/* TEAM INFORMATION */}

          <div className="team-details-card">

            <h2>Team Information</h2>

            <div className="detail-row">

              <CalendarDays size={20} />

              <div>
                <span>Hackathon</span>

                <strong>
                  {team.hackathon?.title ||
                    "—"}
                </strong>
              </div>

            </div>


            <div className="detail-row">

              <Users size={20} />

              <div>
                <span>Team Members</span>

                <strong>
                  {team.members?.length || 0}
                </strong>
              </div>

            </div>

          </div>


          {/* MEMBERS */}

          <div className="team-details-card">

            <h2>Members</h2>

            <div className="members-list">

              {team.members?.map((member) => (

                <div
                  className="member-row"
                  key={member._id}
                >

                  <div className="member-info">

                    <div className="member-avatar">
                      {member.name
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>

                      <strong>
                        {member.name}
                      </strong>

                      <span>
                        {member.email}
                      </span>

                    </div>

                  </div>


                  {member._id ===
                    team.leader?._id && (

                    <span className="leader-badge">

                      <Crown size={14} />

                      Leader

                    </span>

                  )}

                </div>

              ))}

            </div>

          </div>

        </div>


        {/* JOIN REQUESTS — LEADER ONLY */}

        {isLeader && (
          !requestsLoading &&
          requests.length > 0 && (

            <div className="team-details-card join-requests-card">

              <div className="join-requests-header">

                <div>

                  <p className="team-details-tag">
                    TEAM MANAGEMENT
                  </p>

                  <h2>
                    Join Requests
                  </h2>

                </div>

                <span className="request-count">
                  {requests.length}
                </span>

              </div>


              {requestError && (
                <p className="team-error">
                  {requestError}
                </p>
              )}


              <div className="join-requests-list">

                {requests.map((request) => (

                  <div
                    className="join-request-row"
                    key={request._id}
                  >

                    <div className="member-info">

                      <div className="member-avatar">

                        {request.user?.name
                          ?.charAt(0)
                          .toUpperCase()}

                      </div>

                      <div>

                        <strong>
                          {request.user?.name}
                        </strong>

                        <span>
                          {request.user?.email}
                        </span>

                      </div>

                    </div>


                    <div className="request-actions">

                      <button
                        className="accept-btn"
                        onClick={() =>
                          handleAccept(
                            request._id
                          )
                        }
                        disabled={
                          requestActionLoading ===
                          request._id
                        }
                      >
                        {requestActionLoading ===
                        request._id
                          ? "..."
                          : "Accept"}
                      </button>


                      <button
                        className="reject-btn"
                        onClick={() =>
                          handleReject(
                            request._id
                          )
                        }
                        disabled={
                          requestActionLoading ===
                          request._id
                        }
                      >
                        Reject
                      </button>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          )
        )}


        {/* ACTIONS */}

        {isLeader && (
          <div className="team-actions">

            <Link
              to={`/teams/${team._id}/submit`}
              className="submit-project-btn"
            >
              Submit Project
            </Link>


            <button
              className="team-delete-btn"
              onClick={handleDelete}
              disabled={actionLoading}
            >
              Delete Team
            </button>

          </div>
        )}


        {/* NORMAL MEMBER ACTIONS */}

        {isMember && !isLeader && (
          <div className="team-actions">

            <button
              className="team-leave-btn"
              onClick={handleLeave}
              disabled={actionLoading}
            >
              Leave Team
            </button>

          </div>
        )}


      </div>
    </section>
  );
}