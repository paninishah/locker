import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import EventCard from "../../components/EventCard";
import CalendarButton from "../../components/CalendarButton";
import { getAdminEvents } from "../../api/adminEvents";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const committee = localStorage.getItem("adminCommittee");

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/admin/auth");
      return;
    }

    const fetchEvents = async () => {
      const data = await getAdminEvents();
      const ownEvents = data.filter(e => e.committee === committee);
      setEvents(ownEvents);
      setFilteredEvents(ownEvents);
      setLoading(false);
    };

    fetchEvents();
  }, [committee, navigate]);

  useEffect(() => {
    const q = search.toLowerCase();

    const result = events.filter(
      e =>
        e.title.toLowerCase().includes(q) ||
        e.tags?.some(t => t.toLowerCase().includes(q))
    );

    setFilteredEvents(result);
  }, [search, events]);

  return (
    <div className="app-bg">
      {/* pass search handler */}
      <Header
        showSearch={true}
        rightAction="logout"
        onSearchChange={setSearch}
      />

      <main className="admin-page">
        <div className="admin-container">
          <div className="admin-header-row">
            <h1>Your Events</h1>
            <button
              className="primary-btn"
              onClick={() => navigate("/admin/events/new")}
            >
              + Create Event
            </button>
          </div>

          {loading ? (
            <p className="muted">Loading events…</p>
          ) : filteredEvents.length === 0 ? (
            <p className="muted">No matching events.</p>
          ) : (
            <div className="events-grid">
              {filteredEvents.map(event => (
                <div key={event._id} className="admin-event-card">
                  <EventCard event={event} />
                  <button
                    className="edit-btn"
                    onClick={() =>
                      navigate(`/admin/events/${event._id}/edit`)
                    }
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <CalendarButton />
    </div>
  );
}
