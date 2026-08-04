import "./HowItWorks.css";
import {
  Search,
  Users,
  Code2,
  Trophy,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse",
    description: "Discover exciting hackathons from colleges and companies.",
  },
  {
    icon: Users,
    title: "Create Team",
    description: "Invite your friends or join existing teams.",
  },
  {
    icon: Code2,
    title: "Build",
    description: "Develop your project during the hackathon.",
  },
  {
    icon: Trophy,
    title: "Win",
    description: "Submit your project and compete for prizes.",
  },
];

export default function HowItWorks() {
  return (
    <section className="how-section">
      <div className="container">

        <div className="section-heading">

          <p className="section-tag">
            HOW IT WORKS
          </p>

          <h2>
            Everything in one place.
          </h2>

          <p>
            From discovering hackathons to submitting your final project,
            HackVerse handles the entire journey.
          </p>

        </div>

        <div className="steps-grid">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                className="step-card"
                key={index}
              >

                <div className="step-icon">
                  <Icon size={30}/>
                </div>

                <h3>{step.title}</h3>

                <p>{step.description}</p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}