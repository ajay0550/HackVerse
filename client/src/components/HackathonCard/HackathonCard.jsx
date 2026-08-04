import "./HackathonCard.css";
import {
  CalendarDays,
  Trophy,
  Users,
  Globe,
  ArrowRight,
} from "lucide-react";

export default function HackathonCard({ hackathon }) {
  return (
    <div className="hackathon-card">

      <div className="card-top">
        <span className="status-badge open">
          ● OPEN
        </span>

        <span className="mode-chip">
          {hackathon.mode}
        </span>
      </div>

      <h2 className="hackathon-title">
        {hackathon.title}
      </h2>

      <p className="hackathon-description">
        {hackathon.description}
      </p>

      <div className="divider"></div>

      <div className="hackathon-info">

        <div>
          <CalendarDays size={18}/>
          <span>{hackathon.date}</span>
        </div>

        <div>
          <Trophy size={18}/>
          <span>{hackathon.prize}</span>
        </div>

        <div>
          <Users size={18}/>
          <span>{hackathon.teamSize}</span>
        </div>

        <div>
          <Globe size={18}/>
          <span>{hackathon.mode}</span>
        </div>

      </div>

      <button className="details-btn">
        View Details
        <ArrowRight size={18}/>
      </button>

    </div>
  );
}