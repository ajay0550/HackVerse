import "./FilterBar.css";

export default function FilterBar() {
  return (
    <div className="filter-bar">

      <select>
        <option>All Status</option>
        <option>Open</option>
        <option>Live</option>
        <option>Closed</option>
      </select>

      <select>
        <option>All Modes</option>
        <option>Online</option>
        <option>Offline</option>
        <option>Hybrid</option>
      </select>

      <select>
        <option>Newest First</option>
        <option>Prize High → Low</option>
        <option>Date</option>
      </select>

    </div>
  );
}