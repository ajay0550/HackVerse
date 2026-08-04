import "./SectionTitle.css";

export default function SectionTitle({
  tag,
  title,
  subtitle,
}) {
  return (
    <div className="section-heading">

      <p className="section-tag">
        {tag}
      </p>

      <h2>
        {title}
      </h2>

      <p>
        {subtitle}
      </p>

    </div>
  );
}