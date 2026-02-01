import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import CalendarButton from "../../components/CalendarButton";
import { createEvent, updateEvent, deleteEvent } from "../../api/adminEvents";
import { getEventById } from "../../api/events";
import "./EventForm.css";

export default function EventForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    venue: "",
    tags: "",
    coverImage: "",
    gallery: "",
  });

  const [updateText, setUpdateText] = useState("");
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/admin/auth");
      return;
    }

    if (isEdit) {
      getEventById(id).then((e) => {
        setForm({
          title: e.title,
          description: e.description,
          date: e.date.split("T")[0],
          venue: e.venue,
          tags: e.tags.join(", "),
          coverImage: e.coverImage || "",
          gallery: (e.gallery || []).join(", "),
        });
        setUpdates(e.updates || []);
      });
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: form.title,
      description: form.description,
      date: form.date,
      venue: form.venue,
      coverImage: form.coverImage,
      tags: form.tags.split(",").map((t) => t.trim()),
      gallery: form.gallery
        ? form.gallery.split(",").map((g) => g.trim())
        : [],
    };

    if (isEdit) {
      await updateEvent(id, payload);
    } else {
      await createEvent(payload);
    }

    navigate("/admin/dashboard");
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event? This cannot be undone."
    );
    if (!confirmDelete) return;

    await deleteEvent(id);
    navigate("/admin/dashboard");
  };

  const handlePostUpdate = async () => {
    if (!updateText.trim()) return;

    const updated = await updateEvent(id, {
      updates: [...updates, { text: updateText }],
    });

    setUpdates(updated.updates);
    setUpdateText("");
  };

  return (
    <div className="app-bg">
      <Header showSearch={false} rightAction="logout" />
      <main className="admin-page">
        <div className="event-form-container">
          <h1>{isEdit ? "Edit Event" : "Create Event"}</h1>

          <form onSubmit={handleSubmit} className="event-form">
            <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required />
            <input type="date" name="date" value={form.date} onChange={handleChange} required />
            <input name="venue" value={form.venue} onChange={handleChange} placeholder="Venue" required />
            <input name="coverImage" value={form.coverImage} onChange={handleChange} placeholder="Poster image URL" />
            <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma separated)" />

            <textarea
              name="gallery"
              value={form.gallery}
              onChange={handleChange}
              placeholder="Gallery image URLs (comma separated)"
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
            />

            <div className="form-actions">
              <button type="submit" className="primary-btn">
                {isEdit ? "Save Changes" : "Create Event"}
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

          {/* DELETE EVENT */}
          {isEdit && (
            <button
              onClick={handleDelete}
              style={{
                marginTop: "24px",
                background: "transparent",
                color: "#FB8537",
                border: "1px solid #FB8537",
                borderRadius: "999px",
                padding: "10px 20px",
                cursor: "pointer",
              }}
            >
              Delete Event
            </button>
          )}

          {/* UPDATES */}
          {isEdit && (
            <div className="rsvp-section" style={{ marginTop: "48px" }}>
              <h2>Post Update / Announcement</h2>

              <textarea
                value={updateText}
                onChange={(e) => setUpdateText(e.target.value)}
                placeholder="e.g. Event postponed to 5pm"
              />

              <button
                className="primary-btn"
                style={{ marginTop: "12px" }}
                onClick={handlePostUpdate}
              >
                Post Update
              </button>

              {updates.length > 0 && (
                <ul style={{ marginTop: "16px" }}>
                  {updates.map((u, i) => (
                    <li key={i}>{u.text}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </main>

      <CalendarButton />
    </div>
  );
}
