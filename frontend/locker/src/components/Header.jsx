import "./Header.css";

export default function Header({ showSearch = false }) {
  return (
    <header className="header">
      {/* Left: Logo */}
      <img src="/locker.svg" alt="locker" className="header-logo" />

      {/* Center: Search OR placeholder */}
      {showSearch ? (
        <input
          type="text"
          className="search-bar"
          placeholder="search events"
        />
      ) : (
        <div className="header-center-placeholder" />
      )}

      {/* Right: Admin */}
      <button className="admin-btn">Admin</button>
    </header>
  );
}
