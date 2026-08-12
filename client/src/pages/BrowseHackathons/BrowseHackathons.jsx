import { useEffect, useState } from "react";
import "./BrowseHackathons.css";

import HackathonCard from "../../components/HackathonCard/HackathonCard";
import FilterBar from "../../components/FilterBar/FilterBar";

import { getHackathons } from "../../services/hackathonService";

export default function BrowseHackathons() {
  const [hackathons, setHackathons] = useState([]);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("All");
  const [mode, setMode] = useState("All");
  const [sort, setSort] = useState("newest");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchHackathons() {
      try {
        const data = await getHackathons();

        setHackathons(data);
      } catch (err) {
        console.error(err);

        setError(
          "Failed to load hackathons."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchHackathons();
  }, []);


  // Get current status of a hackathon
  const getHackathonStatus = (hackathon) => {
    const now = new Date();

    const startDate =
      new Date(hackathon.startDate);

    const endDate =
      new Date(hackathon.endDate);

    if (now > endDate) {
      return "Closed";
    }

    if (
      now >= startDate &&
      now <= endDate
    ) {
      return "Live";
    }

    return "Open";
  };


  const filteredHackathons = hackathons

    // SEARCH
    .filter((hackathon) => {
      const query =
        search.toLowerCase().trim();

      if (!query) {
        return true;
      }

      return (
        hackathon.title
          ?.toLowerCase()
          .includes(query) ||

        hackathon.description
          ?.toLowerCase()
          .includes(query) ||

        hackathon.location
          ?.toLowerCase()
          .includes(query)
      );
    })


    // MODE
    .filter((hackathon) => {
      if (mode === "All") {
        return true;
      }

      return hackathon.mode === mode;
    })


    // STATUS
    .filter((hackathon) => {
      if (status === "All") {
        return true;
      }

      return (
        getHackathonStatus(hackathon) ===
        status
      );
    })


    // SORT
    .sort((a, b) => {

      if (sort === "newest") {
        return (
          new Date(b.createdAt) -
          new Date(a.createdAt)
        );
      }

      if (sort === "prize-high") {
        return (
          (b.prizePool || 0) -
          (a.prizePool || 0)
        );
      }

      if (sort === "date") {
        return (
          new Date(a.startDate) -
          new Date(b.startDate)
        );
      }

      return 0;
    });


  return (
    <section className="browse-page">

      <div className="container">

        <div className="browse-header">

          <div>

            <p className="browse-tag">
              DISCOVER EVENTS
            </p>

            <h1>
              Browse Hackathons
            </h1>

            <p className="browse-subtitle">
              Find competitions, build amazing
              projects and collaborate with
              developers.
            </p>

          </div>


          <div className="browse-search">

            <input
              type="text"
              placeholder="Search hackathons..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        </div>


        <FilterBar
          status={status}
          setStatus={setStatus}
          mode={mode}
          setMode={setMode}
          sort={sort}
          setSort={setSort}
        />


        {loading ? (

          <h2
            style={{
              textAlign: "center",
              marginTop: "50px",
            }}
          >
            Loading Hackathons...
          </h2>

        ) : error ? (

          <h2
            style={{
              textAlign: "center",
              color: "red",
              marginTop: "50px",
            }}
          >
            {error}
          </h2>

        ) : filteredHackathons.length === 0 ? (

          <div className="no-results">

            <h2>
              No hackathons found.
            </h2>

            <p>
              Try changing your search
              or filters.
            </p>

          </div>

        ) : (

          <div className="hackathon-grid">

            {filteredHackathons.map(
              (hackathon) => (

                <HackathonCard
                  key={hackathon._id}
                  hackathon={hackathon}
                />

              )
            )}

          </div>

        )}

      </div>

    </section>
  );
}