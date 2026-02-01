import { useState } from "react";
import { submitRsvp } from "../api/rsvp";
import "./RSVP.css";

export default function RSVP({ eventId }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await submitRsvp(eventId, { name, email });
      setSuccess("RSVP submitted successfully!");
      setName("");
      setEmail("");
    } catch (err) {
      console.error(err);
      setError("Failed to submit RSVP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rsvp-section">
      <h2>RSVP</h2>

      <form className="rsvp-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit" className="primary-btn" disabled={loading}>
          {loading ? "Submitting..." : "RSVP"}
        </button>
      </form>

      {success && (
        <p style={{ color: "#84ACCE", marginTop: "12px" }}>{success}</p>
      )}
      {error && (
        <p style={{ color: "#FB8537", marginTop: "12px" }}>{error}</p>
      )}
    </div>
  );
}
