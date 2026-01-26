import { useNavigate } from "react-router-dom";
import "./EventCard.css";

export default function EventCard({ event }) {
  const navigate = useNavigate();

  return (
    <div
      className="event-card"
      onClick={() => navigate(`/events/${event.id}`)}
    >
      <img
        src={event.coverImage}
        alt={event.title}
        className="event-image"
      />

      <div className="event-body">
        <p className="event-date">
          {new Date(event.date).toDateString()}
        </p>

        <h3 className="event-title">{event.title}</h3>

        <p className="event-committee">{event.committee}</p>

        <div className="event-tags">
          {event.tags.map((tag, i) => (
            <span key={i} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
