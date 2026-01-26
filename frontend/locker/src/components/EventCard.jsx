import { useNavigate } from "react-router-dom";
import "./EventCard.css";

export default function EventCard({ event }) {
  const navigate = useNavigate();
  const eventId = event._id;

  return (
    <div
      className="event-card"
      onClick={() => navigate(`/events/${eventId}`)}
    >
      <div className="event-card-image" />

      <div className="event-card-body">
        <h3>{event.title}</h3>
        <p>{new Date(event.date).toDateString()}</p>
        <span>{event.committee}</span>
      </div>
    </div>
  );
}
