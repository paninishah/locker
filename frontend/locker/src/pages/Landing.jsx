import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getAllEvents } from "../api/events";
import "./Landing.css";

export default function Landing() {
  const navigate = useNavigate();
  const isAdmin = Boolean(localStorage.getItem("adminToken"));
  const [events, setEvents] = useState([]);
  const anglesRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    getAllEvents().then((data) => {
      const posters = data.slice(0, 5);
      setEvents(posters);

      // evenly space angles
      anglesRef.current = posters.map(
        (_, i) => (i / posters.length) * Math.PI * 2
      );
    });
  }, []);

  useEffect(() => {
    const radius = 500;       // 🔧 change this to adjust circle size
    const speed = 0.003;    // 🔧 rotation speed

    const animate = () => {
      anglesRef.current = anglesRef.current.map(a => a + speed);

      const posters = document.querySelectorAll(".poster");
      posters.forEach((poster, i) => {
        const angle = anglesRef.current[i];

        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * 60; // vertical squash = perspective
        const rotate = angle * (180 / Math.PI);

        poster.style.transform = `
          translate(${x}px, ${y}px)
          rotate(${rotate}deg)
        `;

        // depth illusion
        const scale = 0.8 + 0.2 * (1 + Math.sin(angle)) / 2;
        poster.style.scale = scale;
        poster.style.opacity = 0.6 + 0.4 * (1 + Math.sin(angle)) / 2;
        poster.style.zIndex = Math.floor(scale * 100);
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafRef.current);
  }, [events]);

  return (
    <div className="app-bg landing">
      {/* Admin */}
      <button
        className="landing-admin"
        onClick={() =>
          navigate(isAdmin ? "/admin/dashboard" : "/admin/auth")
        }
      >
        {isAdmin ? "Dashboard" : "Admin"}
      </button>

      {/* Circular carousel */}
      <div className="poster-orbit">
        {events.map((e) => (
          <img
            key={e._id}
            src={e.coverImage || "/default-poster.jpg"}
            alt={e.title}
            className="poster"
            onClick={() => navigate(`/events/${e._id}`)}
          />
        ))}
      </div>

      {/* Content */}
      <div className="landing-content lowered">
        <img src="/locker.svg" alt="locker" className="landing-logo" />
        <p className="landing-tagline">
          all your campus events, in one place.
        </p>
        <button
          className="landing-cta"
          onClick={() => navigate("/events")}
        >
          explore
        </button>
      </div>
    </div>
  );
}
