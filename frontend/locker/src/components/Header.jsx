import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header({
  showLogo = true,
  showSearch = false,
  rightAction = "admin" // "admin" | "logout" | "none"
}) {
  const navigate = useNavigate();

  const handleRightAction = () => {
    if (rightAction === "admin") {
      navigate("/admin/auth");
    }

    if (rightAction === "logout") {
      // frontend-only logout for now
      navigate("/admin/auth");
    }
  };

  return (
    <header className="header">
      {/* LEFT */}
      {showLogo ? (
        <img
          src="/locker.svg"
          alt="locker"
          className="header-logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />
      ) : (
        <div />
      )}

      {/* CENTER */}
      {showSearch ? (
        <input
          type="text"
          className="search-bar"
          placeholder="search events"
        />
      ) : (
        <div className="header-center-placeholder" />
      )}

      {/* RIGHT */}
      {rightAction !== "none" ? (
        <button className="admin-btn" onClick={handleRightAction}>
          {rightAction === "admin" ? "Admin" : "Sign out"}
        </button>
      ) : (
        <div />
      )}
    </header>
  );
}
