import { useEffect, useState } from "react";
import Header from "../components/Header";
import EventCard from "../components/EventCard";
import CalendarButton from "../components/CalendarButton";
import { getAllEvents } from "../api/events";
import "./Events.css";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [committee, setCommittee] = useState("all");
  const [timeFilter, setTimeFilter] = useState("upcoming");

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getAllEvents();
      setEvents(data);
      setFilteredEvents(data);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    let result = [...events];
    const now = new Date();

    if (timeFilter !== "all") {
      result = result.filter(e =>
        timeFilter === "upcoming"
          ? new Date(e.date) >= now
          : new Date(e.date) < now
      );
    }

    if (committee !== "all") {
      result = result.filter(e => e.committee === committee);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        e =>
          e.title.toLowerCase().includes(q) ||
          e.tags?.some(t => t.toLowerCase().includes(q))
      );
    }

    setFilteredEvents(result);
  }, [search, committee, timeFilter, events]);

  return (
    <div className="app-bg">
      <Header showSearch={false} rightAction="admin" />

      <div className="events-page">
        <div className="events-container">
          {/* FILTERS */}
          <div className="filters-row">
            <input
              className="search-pill"
              placeholder="Search events"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />

            <select
              className="filter-pill"
              value={committee}
              onChange={e => setCommittee(e.target.value)}
            >
              <option value="all">All committees</option>
              <option value="Technical">Technical</option>
              <option value="Cultural">Cultural</option>
              <option value="Sports">Sports</option>
              <option value="Literary">Literary</option>
              <option value="E-Cell">E-Cell</option>
            </select>

            <select
              className="filter-pill"
              value={timeFilter}
              onChange={e => setTimeFilter(e.target.value)}
            >
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
              <option value="all">All</option>
            </select>
          </div>

          {/* EVENTS */}
          {loading ? (
            <p className="muted">Loading events…</p>
          ) : (
            <div className="events-grid">
              {filteredEvents.map(event => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>

      <CalendarButton />
    </div>
  );
}
