"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      const data = await response.json();
      setStatus("error");
      setMessage(data.message ?? "Giriş başarısız.");
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <main className="admin-login-page">
      <form className="admin-login-card" onSubmit={submit}>
        <span className="admin-eyebrow">HANDE ÖNER CMS</span>
        <h1>Yönetim Paneli</h1>
        <p>Blog yazılarını ve SEO alanlarını buradan yönetebilirsiniz.</p>

        <label>
          <span>Parola</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </label>

        <button className="admin-primary-button" disabled={status === "loading"}>
          {status === "loading" ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>

        {message && <p className="admin-error">{message}</p>}
      </form>
    </main>
  );
}
