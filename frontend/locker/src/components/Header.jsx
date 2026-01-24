import "./Header.css";

export default function Header({ showSearch = false }) {
  return (
    <header className="header">
      <img src="/locker.svg" alt="locker" className="header-logo" />

      {showSearch && (
        <input
          type="text"
          className="search-bar"
          placeholder="search events"
        />
      )}

      <button className="admin-btn">Admin</button>
    </header>
  );
}
