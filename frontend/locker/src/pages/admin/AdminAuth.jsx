import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminAuth.css";
import Header from "../../components/Header";


export default function AdminAuth() {
  const [mode, setMode] = useState("login"); // login | signup
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/admin/dashboard");
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // ignore for now
    alert("Signup will be enabled later.");
  };

  return (
    <div className="app-bg admin-auth-page">
      <Header showLogo={true} showSearch={false} rightAction="none" />

      <div className="auth-card">
        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={mode === "login" ? "active" : ""}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={mode === "signup" ? "active" : ""}
            onClick={() => setMode("signup")}
          >
            Sign up
          </button>
        </div>

        {/* Forms */}
        {mode === "login" ? (
          <form className="auth-form" onSubmit={handleLogin}>
            <h1>Admin Login</h1>

            <input
              type="email"
              placeholder="committee email"
              required
            />

            <input
              type="password"
              placeholder="password"
              required
            />

            <button type="submit" className="primary-btn">
              Log in
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleSignup}>
            <h1>Committee Sign Up</h1>

            <input
              type="text"
              placeholder="committee name"
              required
            />

            <input
              type="email"
              placeholder="committee email"
              required
            />

            <input
              type="password"
              placeholder="password"
              required
            />

            <button type="submit" className="primary-btn">
              Sign up
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
