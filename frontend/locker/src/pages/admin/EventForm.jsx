import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../../components/Header";
import CalendarButton from "../../components/CalendarButton";
import { mockEvents } from "../../data/mockEvents";
import "./EventForm.css";

export default function EventForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);
  const existingEvent = mockEvents.find(e => e.id === id);

  /* BASIC STATE */
  const [title, setTitle] = useState(existingEvent?.title || "");
  const [date, setDate] = useState(existingEvent?.date || "");
  const [venue, setVenue] = useState(existingEvent?.venue || "");
  const [committee, setCommittee] = useState(existingEvent?.committee || "");
  const [tags, setTags] = useState(existingEvent?.tags?.join(", ") || "");
  const [description, setDescription] = useState(existingEvent?.description || "");

  const [gallery, setGallery] = useState(existingEvent?.gallery || []);
  const [updates, setUpdates] = useState([]);

  /* RSVP DATA — EDIT MODE ONLY */
  const mockRsvps = isEditMode
    ? [
        { name: "Aditi Shah", email: "aditi@gmail.com" },
        { name: "Rohan Mehta", email: "" }
      ]
    : [];

  /* HANDLERS */
  const handleAddImage = () => {
    setGallery([...gallery, "/placeholder.jpg"]);
  };

  const handleAddUpdate = () => {
    setUpdates([...updates, "New update"]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/admin/dashboard");
  };

  return (
    <div className="app-bg event-form-page">
      <Header showSearch={true} rightAction="logout" />

      <div className="event-form-container">
        <h1>{isEditMode ? "Edit Event" : "Create New Event"}</h1>

        <form className="event-form" onSubmit={handleSubmit}>
          {/* BASIC INFO */}
          <section>
            <label>Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} />

            <label>Date</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />

            <label>Venue</label>
            <input value={venue} onChange={e => setVenue(e.target.value)} />

            <label>Committee</label>
            <input value={committee} disabled />

            <label>Tags (comma separated)</label>
            <input value={tags} onChange={e => setTags(e.target.value)} />
          </section>

          {/* DESCRIPTION */}
          <section>
            <label>Description</label>
            <textarea
              rows="4"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </section>

          {/* GALLERY */}
          <section>
            <div className="section-header">
              <h2>Gallery</h2>
              <button type="button" onClick={handleAddImage}>
                + Add Image
              </button>
            </div>

            <div className="gallery-preview">
              {gallery.map((img, i) => (
                <img key={i} src={img} alt="gallery" />
              ))}
            </div>
          </section>

          {/* UPDATES */}
          <section>
            <div className="section-header">
              <h2>Updates</h2>
              <button type="button" onClick={handleAddUpdate}>
                + Add Update
              </button>
            </div>

            {updates.map((u, i) => (
              <textarea key={i} rows="2" defaultValue={u} />
            ))}
          </section>

          {/* RSVP VIEWER — EDIT MODE ONLY */}
          {isEditMode && (
            <section>
              <h2>RSVPs</h2>

              {mockRsvps.length === 0 ? (
                <p className="empty-state">No RSVPs yet.</p>
              ) : (
                <div className="rsvp-list">
                  {mockRsvps.map((rsvp, i) => (
                    <div key={i} className="rsvp-item">
                      <span>{rsvp.name}</span>
                      {rsvp.email && <span>{rsvp.email}</span>}
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* ACTIONS */}
          <div className="form-actions">
            <button type="submit" className="primary-btn">
              {isEditMode ? "Save Changes" : "Create Event"}
            </button>

            <button
              type="button"
              className="secondary-btn"
              onClick={() => navigate("/admin/dashboard")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <CalendarButton />
    </div>
  );
}
