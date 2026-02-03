import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";

// PUBLIC_INTERFACE
export function DashboardPage() {
  const { api } = useAuth();
  const [health, setHealth] = useState({ status: "idle", data: null, error: "" });

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setHealth({ status: "loading", data: null, error: "" });
      try {
        const data = await api.health();
        if (!cancelled) setHealth({ status: "success", data, error: "" });
      } catch (e) {
        if (!cancelled) setHealth({ status: "error", data: null, error: e.message || "Failed" });
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [api]);

  return (
    <>
      <div className="pageHeader">
        <h1>Dashboard</h1>
        <p>Your study cockpit: materials, quizzes, progress, and community—wired together.</p>
      </div>

      <div className="grid">
        <section className="card col-4">
          <div className="cardHeader">
            <h3>Study Streak</h3>
            <span className="badge">Weekly</span>
          </div>
          <div className="cardBody">
            <div className="kpi">
              <strong>4 days</strong>
              <span>Keep it rolling</span>
            </div>
            <div className="progressBar" aria-label="Streak progress">
              <div className="progressFill" style={{ width: "62%" }} />
            </div>
          </div>
        </section>

        <section className="card col-4">
          <div className="cardHeader">
            <h3>Quizzes Completed</h3>
            <span className="badge">This month</span>
          </div>
          <div className="cardBody">
            <div className="kpi">
              <strong>7</strong>
              <span>+2 vs last</span>
            </div>
            <div className="progressBar" aria-label="Quizzes progress">
              <div className="progressFill" style={{ width: "44%" }} />
            </div>
          </div>
        </section>

        <section className="card col-4">
          <div className="cardHeader">
            <h3>Backend Status</h3>
            <span className="badge">/api/health/</span>
          </div>
          <div className="cardBody">
            {health.status === "loading" ? (
              <div>Checking…</div>
            ) : health.status === "error" ? (
              <div className="alert">API error: {health.error}</div>
            ) : (
              <div className="muted">
                OK. (Response: {health.data ? JSON.stringify(health.data) : "200"})
              </div>
            )}
          </div>
        </section>

        <section className="card col-8">
          <div className="cardHeader">
            <h3>Next Up</h3>
            <span className="badge">Today</span>
          </div>
          <div className="cardBody">
            <table className="table" aria-label="Next study tasks">
              <thead>
                <tr>
                  <th>Task</th>
                  <th>Topic</th>
                  <th>ETA</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Review</td>
                  <td>Linear Algebra: eigenvectors</td>
                  <td>25 min</td>
                </tr>
                <tr>
                  <td>Quiz</td>
                  <td>History: WW2 timeline</td>
                  <td>10 min</td>
                </tr>
                <tr>
                  <td>Forum</td>
                  <td>Ask for practice problem set</td>
                  <td>5 min</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="card col-4">
          <div className="cardHeader">
            <h3>Quick Actions</h3>
            <span className="badge">Pro</span>
          </div>
          <div className="cardBody">
            <div className="rowWrap">
              <button className="smallBtn" type="button">
                + New material
              </button>
              <button className="smallBtn" type="button">
                Start quiz
              </button>
              <button className="smallBtn" type="button">
                Log session
              </button>
            </div>
            <p className="muted" style={{ marginTop: 10 }}>
              These buttons become fully functional once the backend endpoints are added beyond /health/.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
