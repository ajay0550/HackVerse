import { Link } from "react-router-dom";
import "./HackathonCard.css";

import {
  CalendarDays,
  Trophy,
  Users,
  Globe,
  ArrowRight,
} from "lucide-react";

export default function HackathonCard({ hackathon }) {

  const formattedDate =
    new Date(
      hackathon.startDate
    ).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });


  

  const now = new Date();

  const startDate =
    new Date(hackathon.startDate);

  const endDate =
    new Date(hackathon.endDate);

  let hackathonStatus = "OPEN";

  if (
    now >= startDate &&
    now <= endDate
  ) {
    hackathonStatus = "LIVE";
  } else if (
    now > endDate
  ) {
    hackathonStatus = "CLOSED";
  }


  return (
    <div className="hackathon-card">

      <div className="card-top">

        <span
          className={`status-badge ${hackathonStatus.toLowerCase()}`}
        >
          ● {hackathonStatus}
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
          <CalendarDays size={18} />
          <span>
            {formattedDate}
          </span>
        </div>


        <div>
          <Trophy size={18} />
          <span>
            ₹
            {hackathon.prizePool?.toLocaleString()}
          </span>
        </div>


        <div>
          <Users size={18} />
          <span>
            {hackathon.maxTeamSize} Members
          </span>
        </div>


        <div>
          <Globe size={18} />
          <span>
            {hackathon.mode}
          </span>
        </div>

      </div>


      <Link
        to={`/hackathons/${hackathon._id}`}
        className="details-btn"
      >
        View Details

        <ArrowRight size={18} />

      </Link>

    </div>
  );
}