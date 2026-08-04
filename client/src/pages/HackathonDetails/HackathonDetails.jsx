import "./HackathonDetails.css";
import {
  CalendarDays,
  Trophy,
  Users,
  Globe,
  Clock,
} from "lucide-react";

export default function HackathonDetails() {
  return (
    <section className="details-page">
      <div className="container">

        <div className="details-header">

          <span className="status-badge open">
            ● OPEN
          </span>

          <h1>HackVerse 2026</h1>

          <p>
            India's biggest national hackathon bringing together developers,
            designers and innovators to solve real-world problems.
          </p>

          <button className="join-btn">
            Join Hackathon
          </button>

        </div>

        <div className="details-grid">

          <div className="details-card">

            <h3>Event Details</h3>

            <div className="info-row">
              <CalendarDays size={18}/>
              <span>10 Aug 2026</span>
            </div>

            <div className="info-row">
              <Clock size={18}/>
              <span>Registration ends 5 Aug</span>
            </div>

            <div className="info-row">
              <Trophy size={18}/>
              <span>₹100,000 Prize Pool</span>
            </div>

            <div className="info-row">
              <Users size={18}/>
              <span>Max Team Size: 4</span>
            </div>

            <div className="info-row">
              <Globe size={18}/>
              <span>Online</span>
            </div>

          </div>

          <div className="details-card">

            <h3>About</h3>

            <p>
              Participants will work in teams to build innovative software
              solutions over 36 hours. Projects will be judged on creativity,
              impact, technical implementation and presentation.
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}