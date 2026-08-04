import "./WhyHackVerse.css";
import {
  ShieldCheck,
  Users,
  Rocket,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Rocket,
    title: "Modern Platform",
    description: "Everything from registrations to submissions in one seamless experience.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Create teams, invite members and manage requests effortlessly.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Reliable",
    description: "Authentication, protected routes and organized hackathon management.",
  },
  {
    icon: Sparkles,
    title: "Built for Students",
    description: "Simple, clean and designed specifically for hackathons.",
  },
];

export default function WhyHackVerse() {
  return (
    <section className="why-section">
      <div className="container why-grid">

        <div className="why-left">

          <p className="section-tag">
            WHY HACKVERSE
          </p>

          <h2>
            Everything you need to manage hackathons.
          </h2>

          <p>
            Whether you're participating or organizing, HackVerse provides
            all the tools required for a smooth hackathon experience.
          </p>

        </div>

        <div className="why-right">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                className="feature-card"
                key={index}
              >
                <Icon size={24} />

                <div>
                  <h3>{feature.title}</h3>

                  <p>{feature.description}</p>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}