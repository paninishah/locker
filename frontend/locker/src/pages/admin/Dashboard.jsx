import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import EventCard from "../../components/EventCard";
import CalendarButton from "../../components/CalendarButton";
import { mockEvents } from "../../data/mockEvents";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  // FRONTEND-ONLY: mock logged-in admin committee
  const adminCommittee = "Technical";

  const adminEvents = mockEvents.filter(
    (event) => event.committee === adminCommittee
  );

  return (
    <div className="app-bg dashboard-page">
      {/* Header */}
      <Header showSearch={true} rightAction="logout" />

      {/* Main content */}
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Your Events</h1>

          <button
            className="primary-btn"
            onClick={() => navigate("/admin/events/new")}
          >
            + Create New Event
          </button>
        </div>

        {adminEvents.length === 0 ? (
          <p className="empty-state">
            No events created for your committee yet.
          </p>
        ) : (
          <div className="events-grid">
            {adminEvents.map((event) => (
              <div key={event.id} className="admin-event-card">
                <EventCard event={event} />

                <button
                  className="edit-btn"
                  onClick={() =>
                    navigate(`/admin/events/${event.id}/edit`)
                  }
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating calendar */}
      <CalendarButton />
    </div>
  );
}
