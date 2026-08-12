import "./FilterBar.css";

export default function FilterBar({
  status,
  setStatus,
  mode,
  setMode,
  sort,
  setSort,
}) {
  return (
    <div className="filter-bar">

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="All">
          All Status
        </option>

        <option value="Open">
          Open
        </option>

        <option value="Live">
          Live
        </option>

        <option value="Closed">
          Closed
        </option>
      </select>


      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
      >
        <option value="All">
          All Modes
        </option>

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


      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="newest">
          Newest First
        </option>

        <option value="prize-high">
          Prize High → Low
        </option>

        <option value="date">
          Date
        </option>
      </select>

    </div>
  );
}