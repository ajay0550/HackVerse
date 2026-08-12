import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SubmitProject.css";

import { createSubmission } from "../../services/submissionService";

export default function SubmitProject() {
  const { teamId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    githubRepo: "",
    demoVideo: "",
    presentation: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !form.githubRepo.trim() ||
      !form.demoVideo.trim() ||
      !form.presentation.trim() ||
      !form.description.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      await createSubmission({
        team: teamId,
        githubRepo: form.githubRepo.trim(),
        demoVideo: form.demoVideo.trim(),
        presentation: form.presentation.trim(),
        description: form.description.trim(),
      });

      navigate(`/teams/${teamId}`);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to submit project."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="submit-page">
      <div className="container">

        <div className="submit-header">
          <p className="submit-tag">
            PROJECT SUBMISSION
          </p>

          <h1>
            Submit Your Project
          </h1>

          <p>
            Submit your team's project for evaluation.
            Make sure all links are accessible.
          </p>
        </div>

        <div className="submit-card">

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <label>Project Description</label>

              <textarea
                name="description"
                placeholder="Describe your project, what it does, and the problem it solves..."
                value={form.description}
                onChange={handleChange}
                rows="6"
              />
            </div>

            <div className="input-group">
              <label>GitHub Repository</label>

              <input
                type="url"
                name="githubRepo"
                placeholder="https://github.com/username/project"
                value={form.githubRepo}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Demo Video</label>

              <input
                type="url"
                name="demoVideo"
                placeholder="https://youtube.com/..."
                value={form.demoVideo}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Presentation</label>

              <input
                type="url"
                name="presentation"
                placeholder="https://drive.google.com/..."
                value={form.presentation}
                onChange={handleChange}
              />
            </div>

            {error && (
              <p className="submit-error">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : "Submit Project"}
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}