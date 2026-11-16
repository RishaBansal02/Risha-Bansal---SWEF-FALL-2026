import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const controller = new AbortController();
    const token = localStorage.getItem("access_token");

    async function loadWelcome() {
      try {
        const response = await fetch("/api/auth/me", {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          signal: controller.signal,
        });

        if (response.status === 401) {
          localStorage.removeItem("access_token");
          navigate("/login", { replace: true });
          return;
        }

        if (!response.ok) throw new Error("Could not load landing page");

        const data = await response.json();
        setMessage(data.message);
      } catch {
        if (!controller.signal.aborted) {
          setError("Could not load the page. Check that Flask is running on port 8000.");
        }
      }
    }

    loadWelcome();
    return () => controller.abort();
  }, [navigate]);

  return (
    <main>
      {error && <p role="alert">{error}</p>}
      {message && <h1>{message}</h1>}
      {!error && !message && <p>Checking your login…</p>}
    </main>
  );
}
