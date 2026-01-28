import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import CalendarButton from "../components/CalendarButton";
import Gallery from "../components/Gallery";
import RSVP from "../components/RSVP";
import { getEventById } from "../api/events";
import "./EventDetails.css";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (err) {
        console.error("Failed to fetch event", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return <div className="app-bg page-content">Loading event…</div>;
  }

  if (!event) {
    return <div className="app-bg page-content">Event not found</div>;
  }

  return (
    <div className="app-bg page-content">
      <Header />

      <div className="event-details-wrapper">
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
            {event.tags?.map((tag, i) => (
              <span key={i} className="tag">{tag}</span>
            ))}
          </div>

          {event.gallery && <Gallery images={event.gallery} />}

          <RSVP eventId={event._id} />
        </div>
      </div>

      <CalendarButton />
    </div>
  );
}
