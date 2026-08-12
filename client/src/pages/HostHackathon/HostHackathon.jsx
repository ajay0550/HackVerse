import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HostHackathon.css";

import api from "../../services/api";

export default function HostHackathon() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    mode: "Online",
    location: "",
    startDate: "",
    endDate: "",
    registrationDeadline: "",
    prizePool: "",
    maxTeamSize: 4,
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
      !form.title.trim() ||
      !form.description.trim() ||
      !form.startDate ||
      !form.endDate ||
      !form.registrationDeadline
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/api/hackathons", {
        title: form.title.trim(),
        description: form.description.trim(),
        mode: form.mode,
        location: form.location.trim(),
        startDate: form.startDate,
        endDate: form.endDate,
        registrationDeadline: form.registrationDeadline,
        prizePool: Number(form.prizePool) || 0,
        maxTeamSize: Number(form.maxTeamSize),
      });

      navigate("/hackathons");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to create hackathon."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="host-page">
      <div className="container">

        <div className="host-header">
          <p className="host-tag">
            ORGANIZER
          </p>

          <h1>
            Host a Hackathon
          </h1>

          <p>
            Create a hackathon and bring developers together
            to build something amazing.
          </p>
        </div>

        <div className="host-card">

          <form onSubmit={handleSubmit}>

            <div className="form-section">
              <h2>Basic Information</h2>

              <div className="input-group">
                <label>
                  Hackathon Name *
                </label>

                <input
                  type="text"
                  name="title"
                  placeholder="e.g. HackVerse 2026"
                  value={form.title}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>
                  Description *
                </label>

                <textarea
                  name="description"
                  placeholder="Tell participants about your hackathon..."
                  value={form.description}
                  onChange={handleChange}
                  rows="5"
                />
              </div>
            </div>


            <div className="form-section">
              <h2>Event Details</h2>

              <div className="form-row">

                <div className="input-group">
                  <label>Mode *</label>

                  <select
                    name="mode"
                    value={form.mode}
                    onChange={handleChange}
                  >
                    <option value="Online">
                      Online
                    </option>

                    <option value="Offline">
                      Offline
                    </option>

                    <option value="Hybrid">
                      Hybrid
                    </option>
                  </select>
                </div>

                <div className="input-group">
                  <label>Location</label>

                  <input
                    type="text"
                    name="location"
                    placeholder="e.g. Bangalore / Online"
                    value={form.location}
                    onChange={handleChange}
                  />
                </div>

              </div>

              <div className="form-row">

                <div className="input-group">
                  <label>
                    Start Date *
                  </label>

                  <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group">
                  <label>
                    End Date *
                  </label>

                  <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                  />
                </div>

              </div>

              <div className="input-group">
                <label>
                  Registration Deadline *
                </label>

                <input
                  type="date"
                  name="registrationDeadline"
                  value={form.registrationDeadline}
                  onChange={handleChange}
                />
              </div>

            </div>


            <div className="form-section">
              <h2>Competition Details</h2>

              <div className="form-row">

                <div className="input-group">
                  <label>
                    Prize Pool (₹)
                  </label>

                  <input
                    type="number"
                    name="prizePool"
                    min="0"
                    placeholder="100000"
                    value={form.prizePool}
                    onChange={handleChange}
                  />
                </div>

                <div className="input-group">
                  <label>
                    Maximum Team Size
                  </label>

                  <input
                    type="number"
                    name="maxTeamSize"
                    min="1"
                    max="20"
                    value={form.maxTeamSize}
                    onChange={handleChange}
                  />
                </div>

              </div>
            </div>


            {error && (
              <p className="host-error">
                {error}
              </p>
            )}


            <button
              type="submit"
              className="host-submit-btn"
              disabled={loading}
            >
              {loading
                ? "Creating Hackathon..."
                : "Create Hackathon"}
            </button>

          </form>

        </div>

      </div>
    </section>
  );
}