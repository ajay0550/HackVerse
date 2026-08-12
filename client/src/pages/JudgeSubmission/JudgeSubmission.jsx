import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ExternalLink,
  Trophy,
} from "lucide-react";

import "./JudgeSubmission.css";

import {
  getSubmissionById,
  judgeSubmission,
} from "../../services/submissionService";

export default function JudgeSubmission() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [submission, setSubmission] = useState(null);

  const [score, setScore] = useState("");
  const [feedback, setFeedback] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const data = await getSubmissionById(id);

        const result = data.submission || data;

        setSubmission(result);

        if (result.score !== null && result.score !== undefined) {
          setScore(result.score);
        }

        setFeedback(result.feedback || "");
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message ||
            "Failed to load submission."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSubmission();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (score === "") {
      setError("Please enter a score.");
      return;
    }

    const numericScore = Number(score);

    if (
      Number.isNaN(numericScore) ||
      numericScore < 0 ||
      numericScore > 100
    ) {
      setError("Score must be between 0 and 100.");
      return;
    }

    setSaving(true);

    try {
      await judgeSubmission(id, {
        score: numericScore,
        feedback,
      });

      navigate(-1);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to save evaluation."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <section className="judge-page">
        <div className="container">
          <p>Loading submission...</p>
        </div>
      </section>
    );
  }

  if (error && !submission) {
    return (
      <section className="judge-page">
        <div className="container">
          <p className="judge-error">
            {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="judge-page">
      <div className="container">

        <Link
          to="/organizer"
          className="judge-back"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        <div className="judge-header">
          <p className="judge-tag">
            JUDGING
          </p>

          <h1>
            {submission.team?.name || "Team Submission"}
          </h1>

          <p>
            {submission.hackathon?.title || "Hackathon"}
          </p>
        </div>

        <div className="judge-grid">

          <div className="judge-project-card">

            <div className="project-heading">
              <Trophy size={22} />

              <div>
                <span>PROJECT</span>
                <h2>Submission Details</h2>
              </div>
            </div>

            <div className="project-description">
              <h3>Description</h3>

              <p>
                {submission.description}
              </p>
            </div>

            <div className="project-links">

              <a
                href={submission.githubRepo}
                target="_blank"
                rel="noreferrer"
              >
                GitHub Repository
                <ExternalLink size={16} />
              </a>

              <a
                href={submission.demoVideo}
                target="_blank"
                rel="noreferrer"
              >
                Demo Video
                <ExternalLink size={16} />
              </a>

              <a
                href={submission.presentation}
                target="_blank"
                rel="noreferrer"
              >
                Presentation
                <ExternalLink size={16} />
              </a>

            </div>

          </div>

          <div className="judge-form-card">

            <h2>
              Evaluation
            </h2>

            <p>
              Give this project a score out of 100
              and provide feedback.
            </p>

            <form onSubmit={handleSubmit}>

              <div className="score-input">

                <label>
                  Score
                </label>

                <div className="score-wrapper">

                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={score}
                    onChange={(e) =>
                      setScore(e.target.value)
                    }
                    placeholder="85"
                  />

                  <span>
                    / 100
                  </span>

                </div>

              </div>

              <div className="feedback-input">

                <label>
                  Feedback
                </label>

                <textarea
                  value={feedback}
                  onChange={(e) =>
                    setFeedback(e.target.value)
                  }
                  placeholder="Write your feedback for the team..."
                  rows="7"
                />

              </div>

              {error && (
                <p className="judge-error">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="save-evaluation-btn"
                disabled={saving}
              >
                {saving
                  ? "Saving..."
                  : "Save Evaluation"}
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}