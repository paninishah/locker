import Header from "../components/Header";
import EventCard from "../components/EventCard";
import CalendarButton from "../components/CalendarButton";
import { mockEvents } from "../data/mockEvents";
import { useState } from "react";
import "./Events.css";

export default function Events() {
  const [committee, setCommittee] = useState("all");
  const [status, setStatus] = useState("all");

  const filteredEvents = mockEvents.filter(event => {
    if (committee !== "all" && event.committee !== committee) {
      return false;
    }

    if (status === "upcoming" && event.isCompleted) {
      return false;
    }

    if (status === "past" && !event.isCompleted) {
      return false;
    }

    return true;
  });

  return (
    <div className="app-bg events-page">
      <Header showSearch />

      {/* Filters row */}
      <div className="filters-row">
        <select
          value={committee}
          onChange={e => setCommittee(e.target.value)}
        >
          <option value="all">All Committees</option>
          <option value="Technical">Technical</option>
          <option value="Cultural">Cultural</option>
          <option value="Sports">Sports</option>
          <option value="Literary">Literary</option>
          <option value="E-Cell">E-Cell</option>
        </select>

        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="all">All Events</option>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </select>
      </div>

      {/* Events grid */}
      <div className="events-grid">
        {filteredEvents.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      <CalendarButton />
    </div>
  );
}
