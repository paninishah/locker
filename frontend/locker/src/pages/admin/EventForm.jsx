import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import CalendarButton from "../../components/CalendarButton";
import { createEvent, updateEvent } from "../../api/adminEvents";
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
  });

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/admin/auth");
      return;
    }

    if (isEdit) {
      getEventById(id).then(e =>
        setForm({
          title: e.title,
          description: e.description,
          date: e.date.split("T")[0],
          venue: e.venue,
          tags: e.tags.join(", "),
        })
      );
    }
  }, [id, isEdit, navigate]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const payload = {
      ...form,
      tags: form.tags.split(",").map(t => t.trim()),
    };

    if (isEdit) {
      await updateEvent(id, payload);
    } else {
      await createEvent(payload);
    }

    navigate("/admin/dashboard");
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
            <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma separated)" />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />

            <div className="form-actions">
              <button type="submit" className="primary-btn">
                {isEdit ? "Save Changes" : "Create Event"}
              </button>
              <button type="button" className="secondary-btn" onClick={() => navigate("/admin/dashboard")}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>

      <CalendarButton />
    </div>
  );
}
