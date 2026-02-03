import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";

// PUBLIC_INTERFACE
export function AuthPage() {
  const { login } = useAuth();

  const [tab, setTab] = useState("login");
  const [form, setForm] = useState({ username: "", password: "" });
  const [state, setState] = useState({ status: "idle", error: "" });

  async function onSubmit(e) {
    e.preventDefault();
    setState({ status: "loading", error: "" });
    try {
      if (!form.username.trim() || !form.password) {
        throw new Error("Please enter username and password.");
      }
      await login({ username: form.username.trim(), password: form.password });
      setState({ status: "success", error: "" });
    } catch (err) {
      setState({ status: "error", error: err.message || "Login failed" });
    }
  }

  return (
    <div className="authPanel card" role="region" aria-label="Authentication">
      <div className="authTabs">
        <button
          type="button"
          className={`tabBtn ${tab === "login" ? "tabBtnActive" : ""}`}
          onClick={() => setTab("login")}
        >
          Login
        </button>
        <button
          type="button"
          className={`tabBtn ${tab === "signup" ? "tabBtnActive" : ""}`}
          onClick={() => setTab("signup")}
        >
          Sign up
        </button>
      </div>

      <div className="cardBody">
        <div className="pageHeader" style={{ marginBottom: 10 }}>
          <h1 style={{ fontSize: 18, margin: 0 }}>{tab === "login" ? "Welcome back" : "Create account"}</h1>
          <p style={{ margin: 0 }}>
            {tab === "login"
              ? "This frontend currently authenticates using DRF Basic auth (per swagger.json)."
              : "Signup requires backend endpoint support."}
          </p>
        </div>

        {state.status === "error" ? <div className="alert">{state.error}</div> : null}

        <form onSubmit={onSubmit}>
          <div style={{ height: 10 }} />
          <label className="muted" htmlFor="username">
            Username
          </label>
          <div style={{ height: 6 }} />
          <input
            id="username"
            className="input"
            value={form.username}
            onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))}
            autoComplete="username"
          />

          <div style={{ height: 10 }} />
          <label className="muted" htmlFor="password">
            Password
          </label>
          <div style={{ height: 6 }} />
          <input
            id="password"
            className="input"
            type="password"
            value={form.password}
            onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
            autoComplete="current-password"
          />

          <div style={{ height: 12 }} />
          <button className="primaryBtn" type="submit" disabled={state.status === "loading" || tab !== "login"}>
            {state.status === "loading" ? "Signing in…" : "Sign in"}
          </button>

          {tab === "signup" ? (
            <p className="muted" style={{ marginTop: 10 }}>
              Signup UI is shown for completeness; enable it once backend adds a registration endpoint.
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}
