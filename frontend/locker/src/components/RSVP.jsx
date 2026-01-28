import { useState } from "react";
import "./RSVP.css";

export default function RSVP() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("RSVP submitted!");
    setName("");
    setEmail("");
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

        <button type="submit" className="primary-btn">
          RSVP
        </button>
      </form>
    </div>
  );
}
