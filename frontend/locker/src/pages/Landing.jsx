import "./Landing.css";

export default function Landing() {
  return (
    <div className="landing">
      {/* Admin button */}
      <button className="admin-btn">Admin</button>

      {/* Center content */}
      <div className="center-content">
        <img
          src="/locker.svg"
          alt="Locker"
          className="locker-logo"
        />

        <p className="tagline">
          all your campus events, in one place.
        </p>
      </div>

      {/* Student CTA */}
      <button className="student-btn">
        explore!
      </button>
    </div>
  );
}