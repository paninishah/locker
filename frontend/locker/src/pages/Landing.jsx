import { useNavigate } from "react-router-dom";
import "./Landing.css";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="app-bg landing">
      {/* Admin button */}
      <button
        className="admin-btn landing-admin"
        onClick={() => navigate("/admin/auth")}
      >
        Admin
      </button>


      {/* Center content */}
      <div className="center-content">
        <img
          src="/locker.svg"
          alt="locker"
          className="landing-logo"
        />

        <p className="tagline">
          all your campus events, in one place.
        </p>
      </div>

      {/* Student CTA */}
      <button
        className="student-btn"
        onClick={() => navigate("/events")}
      >
        explore!
      </button>
    </div>
  );
}
