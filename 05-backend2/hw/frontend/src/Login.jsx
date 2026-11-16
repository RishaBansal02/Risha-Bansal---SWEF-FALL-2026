import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.get("username"),
          password: form.get("password"),
        }),
      });

      if (response.status === 401) {
        setError("Incorrect username or password.");
        return;
      }

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);
      navigate("/landing", { replace: true });
    } catch {
      setError("Could not log in. Check that Flask is running on port 8000.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="username">Username</label><br />
          <input id="username" name="username" autoComplete="username" required />
        </p>
        <p>
          <label htmlFor="password">Password</label><br />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </p>
        {error && <p role="alert">{error}</p>}
        <button type="submit" disabled={submitting}>
          {submitting ? "Logging in…" : "Log in"}
        </button>
      </form>
    </main>
  );
}
