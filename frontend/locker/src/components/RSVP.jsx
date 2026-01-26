import { useState } from "react";
import { submitRsvp } from "../api/rsvp";

export default function RSVP({ eventId }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      setStatus("loading");
      await submitRsvp(eventId, { name, email });
      setStatus("success");
      setName("");
      setEmail("");
    } catch (err) {
      console.error("RSVP failed", err);
      setStatus("error");
    }
  };

  return (
    <div className="rsvp-box">
      <h2>RSVP</h2>

      {status === "success" ? (
        <p className="rsvp-success">You’re registered 🎉</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Submitting…" : "RSVP"}
          </button>

          {status === "error" && (
            <p className="rsvp-error">Something went wrong.</p>
          )}
        </form>
      )}
    </div>
  );
}
