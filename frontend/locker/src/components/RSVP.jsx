import { useState } from "react";
import "./RSVP.css";

export default function RSVP() {
  const [rsvped, setRsvped] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (rsvped) {
    return (
      <div className="rsvp-confirmed">
        <p>✅ You’re RSVP’d for this event.</p>
      </div>
    );
  }

  return (
    <div className="rsvp-box">
      <h2>RSVP</h2>

      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email (optional)"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <button
        disabled={!name}
        onClick={() => setRsvped(true)}
      >
        RSVP to this event
      </button>
    </div>
  );
}
