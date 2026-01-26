import { useParams } from "react-router-dom";
import { mockEvents } from "../data/mockEvents";
import CalendarButton from "../components/CalendarButton";
import Header from "../components/Header";
import Gallery from "../components/Gallery";
import RSVP from "../components/RSVP";
import "./EventDetails.css";

export default function EventDetails() {
  const { id } = useParams();
  const event = mockEvents.find(e => e.id === id);

  if (!event) {
    return <div className="app-bg">Event not found</div>;
  }

  return (
    <div className="app-bg event-details-page">
      <Header />

      <div className="event-details">
        <h1 className="event-title">{event.title}</h1>

        <div className="event-meta">
          <span>{new Date(event.date).toDateString()}</span>
          <span>{event.venue}</span>
          <span>{event.committee}</span>
        </div>

        <p className="event-description">
          {event.description || "Event description will go here."}
        </p>

        <div className="event-tags">
          {event.tags.map((tag, i) => (
            <span key={i} className="tag">{tag}</span>
          ))}
        </div>

        <Gallery images={event.gallery} />
        <RSVP />
      </div>
      <CalendarButton />
    </div>
  );
}
