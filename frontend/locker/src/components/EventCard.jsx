import { useNavigate } from "react-router-dom";
import "./EventCard.css";

export default function EventCard({ event }) {
  const navigate = useNavigate();

  return (
    <div className="event-card" onClick={() => navigate(`/events/${event._id}`)}>
      {event.coverImage && (
        <img src={event.coverImage} alt="event poster" className="event-card-image" />
      )}

      <div className="event-card-body">
        <h3>{event.title}</h3>
        <div className="event-meta">
          <span>{new Date(event.date).toDateString()}</span>
          <span>{event.committee}</span>
        </div>
      </div>
    </div>
  );
}
