import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import {
    CalendarDays,
    Trophy,
    Users,
    ArrowLeft,
    ExternalLink,
} from "lucide-react";

import "./ManageHackathon.css";

import { getHackathonById } from "../../services/hackathonService";
import { getHackathonSubmissions } from "../../services/submissionService";

export default function ManageHackathon() {
    const { id } = useParams();

    const [hackathon, setHackathon] = useState(null);
    const [submissions, setSubmissions] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const hackathonData = await getHackathonById(id);

                const submissionData =
                    await getHackathonSubmissions(id);

                setHackathon(
                    hackathonData.hackathon || hackathonData
                );

                setSubmissions(submissionData);
            } catch (err) {
                console.error("MANAGE HACKATHON ERROR:", err);
                console.error("STATUS:", err.response?.status);
                console.error("DATA:", err.response?.data);
                console.error("URL:", err.config?.url);

                setError(
                    err.response?.data?.message ||
                    `Request failed (${err.response?.status || "unknown"})`
                );
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <section className="manage-page">
                <div className="container">
                    <p>Loading hackathon...</p>
                </div>
            </section>
        );
    }

    if (error || !hackathon) {
        return (
            <section className="manage-page">
                <div className="container">
                    <p className="manage-error">
                        {error || "Hackathon not found."}
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className="manage-page">
            <div className="container">

                <Link
                    to="/organizer"
                    className="manage-back"
                >
                    <ArrowLeft size={18} />
                    Back to Dashboard
                </Link>

                <div className="manage-header">

                    <div>
                        <p className="manage-tag">
                            MANAGE HACKATHON
                        </p>

                        <h1>{hackathon.title}</h1>

                        <p>
                            {hackathon.description}
                        </p>
                    </div>

                    <Link
                        to={`/hackathons/${hackathon._id}`}
                        className="view-hackathon-btn"
                    >
                        View Hackathon
                    </Link>

                </div>

                <div className="manage-stats">

                    <div className="manage-stat">
                        <CalendarDays size={22} />

                        <div>
                            <span>Start Date</span>

                            <strong>
                                {new Date(
                                    hackathon.startDate
                                ).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                })}
                            </strong>
                        </div>
                    </div>

                    <div className="manage-stat">
                        <Trophy size={22} />

                        <div>
                            <span>Prize Pool</span>

                            <strong>
                                ₹{hackathon.prizePool?.toLocaleString()}
                            </strong>
                        </div>
                    </div>

                    <div className="manage-stat">
                        <Users size={22} />

                        <div>
                            <span>Submissions</span>

                            <strong>
                                {submissions.length}
                            </strong>
                        </div>
                    </div>

                </div>

                <div className="submissions-section">

                    <div className="section-heading">

                        <div>
                            <p>PROJECTS</p>

                            <h2>
                                Submissions
                            </h2>
                        </div>

                        <span>
                            {submissions.length} submitted
                        </span>

                    </div>

                    {submissions.length === 0 ? (

                        <div className="empty-submissions">

                            <h3>
                                No submissions yet
                            </h3>

                            <p>
                                Teams haven't submitted their projects yet.
                            </p>

                        </div>

                    ) : (

                        <div className="submission-list">

                            {submissions.map((submission) => (

                                <div
                                    className="submission-card"
                                    key={submission._id}
                                >

                                    <div className="submission-main">

                                        <p className="submission-team">
                                            TEAM
                                        </p>

                                        <h3>
                                            {submission.team?.name ||
                                                "Unknown Team"}
                                        </h3>

                                        <p>
                                            {submission.description}
                                        </p>

                                    </div>

                                    <div className="submission-links">

                                        <a
                                            href={submission.githubRepo}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            GitHub
                                            <ExternalLink size={15} />
                                        </a>

                                        <a
                                            href={submission.demoVideo}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Demo
                                            <ExternalLink size={15} />
                                        </a>

                                        <a
                                            href={submission.presentation}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            Presentation
                                            <ExternalLink size={15} />
                                        </a>

                                        <Link
                                            to={`/organizer/submissions/${submission._id}`}
                                            className="judge-btn"
                                        >
                                            {submission.score !== null
                                                ? "Edit Score"
                                                : "Judge"}
                                        </Link>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </div>
        </section>
    );
}