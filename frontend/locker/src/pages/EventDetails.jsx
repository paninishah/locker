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

  useEffect(() => {
    getEventById(id).then(setEvent);
  }, [id]);

  if (!event) return <div className="app-bg">Loading…</div>;

  return (
    <div className="app-bg">
      <Header rightAction="admin" />

      <div className="event-details-wrapper">
        <h1>{event.title}</h1>

        <div className="event-meta">
          <span>{new Date(event.date).toDateString()}</span>
          <span>{event.venue}</span>
          <span>{event.committee}</span>
        </div>

        <p>{event.description}</p>

        <Gallery images={event.gallery || []} />
        <RSVP eventId={event._id} />
      </div>

      <CalendarButton />
    </div>
  );
}
