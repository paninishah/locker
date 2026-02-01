import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import CalendarButton from "../components/CalendarButton";
import Gallery from "../components/Gallery";
import RSVP from "../components/RSVP";
import { getEventById } from "../api/events";
import { getRsvpsForEvent } from "../api/rsvp";
import { updateEvent } from "../api/adminEvents";
import "./EventDetails.css";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = Boolean(localStorage.getItem("adminToken"));

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEventById(id);
      setEvent(data);

      if (isAdmin) {
        const r = await getRsvpsForEvent(id);
        setRsvps(r);
      }

      setLoading(false);
    };

    fetchData();
  }, [id, isAdmin]);

  const handleToggleComplete = async () => {
    const updated = await updateEvent(event._id, {
      isCompleted: !event.isCompleted,
    });
    setEvent(updated);
  };

  if (loading) return <div className="app-bg page-content">Loading…</div>;
  if (!event) return <div className="app-bg page-content">Event not found</div>;

  return (
    <div className="app-bg page-content">
      <Header rightAction={isAdmin ? "logout" : "admin"} />

      <div className="event-details-wrapper">
        <div className="event-details">
          {event.coverImage && (
            <img
              src={event.coverImage}
              alt="poster"
              style={{
                width: "100%",
                height: "320px",        
                objectFit: "cover",
                objectPosition: "center",
                borderRadius: "16px",
                backgroundColor: "#111",
              }}
            />

          )}

          <h1 className="event-title">{event.title}</h1>

          <div className="event-meta">
            <span>{new Date(event.date).toDateString()}</span>
            <span>{event.venue}</span>
            <span>{event.committee}</span>
          </div>

          <p className="event-description">{event.description}</p>

          <div className="event-tags">
            {event.tags?.map((tag, i) => (
              <span key={i} className="tag">{tag}</span>
            ))}
          </div>

          {event.updates?.length > 0 && (
            <div className="rsvp-section">
              <h2>Updates & Announcements</h2>
              <ul>
                {[...event.updates].reverse().map((u, i) => (
                  <li key={i}>
                    {u.text}
                    <br />
                    <small className="muted">
                      {new Date(u.createdAt).toLocaleString()}
                    </small>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {event.gallery?.length > 0 && <Gallery images={event.gallery} />}

          {isAdmin && (
            <>
              <div className="rsvp-section">
                <h2>RSVP List</h2>
                {rsvps.length === 0 ? (
                  <p className="muted">No RSVPs yet.</p>
                ) : (
                  <ul>
                    {rsvps.map((r) => (
                      <li key={r._id}>
                        {r.name}
                        {r.email && ` — ${r.email}`}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <label style={{ marginTop: "24px", display: "block" }}>
                <input
                  type="checkbox"
                  checked={event.isCompleted}
                  onChange={handleToggleComplete}
                />{" "}
                Mark event as completed
              </label>
            </>
          )}

          {!isAdmin && !event.isCompleted && <RSVP eventId={event._id} />}

          {!isAdmin && event.isCompleted && (
            <p className="muted" style={{ textAlign: "center" }}>
              This event is completed. RSVPs are closed.
            </p>
          )}
        </div>
      </div>

      <CalendarButton />
    </div>
  );
}
