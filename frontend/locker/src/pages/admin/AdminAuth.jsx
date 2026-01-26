import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminAuth.css";
import Header from "../../components/Header";
import { adminLogin } from "../../api/adminAuth";

export default function AdminAuth() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await adminLogin(email, password);

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminCommittee", data.committee);

      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="app-bg admin-auth-page">
      <Header showLogo={true} showSearch={false} rightAction="none" />

      <div className="auth-card">
        <div className="auth-tabs">
          <button
            type="button"
            className={mode === "login" ? "active" : ""}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={mode === "signup" ? "active" : ""}
            onClick={() => setMode("signup")}
          >
            Sign up
          </button>
        </div>

        {mode === "login" && (
          <form className="auth-form" onSubmit={handleLogin}>
            <h1>Admin Login</h1>

            <input
              type="email"
              placeholder="committee email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" className="primary-btn">
              Log in
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
