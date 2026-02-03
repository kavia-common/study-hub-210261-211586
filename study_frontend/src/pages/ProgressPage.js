import React from "react";

// PUBLIC_INTERFACE
export function ProgressPage() {
  return (
    <>
      <div className="pageHeader">
        <h1>Progress</h1>
        <p>Track sessions, quiz results, and topic mastery.</p>
      </div>

      <div className="grid">
        <section className="card col-4">
          <div className="cardHeader">
            <h3>Mastery</h3>
            <span className="badge">Overall</span>
          </div>
          <div className="cardBody">
            <div className="kpi">
              <strong>68%</strong>
              <span>+6 this week</span>
            </div>
            <div className="progressBar" aria-label="Overall mastery progress">
              <div className="progressFill" style={{ width: "68%" }} />
            </div>
          </div>
        </section>

        <section className="card col-8">
          <div className="cardHeader">
            <h3>Recent sessions</h3>
            <span className="badge">7 days</span>
          </div>
          <div className="cardBody">
            <table className="table" aria-label="Recent study sessions">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Topic</th>
                  <th>Minutes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mon</td>
                  <td>Linear Algebra</td>
                  <td>35</td>
                </tr>
                <tr>
                  <td>Wed</td>
                  <td>Biology</td>
                  <td>25</td>
                </tr>
                <tr>
                  <td>Fri</td>
                  <td>Algorithms</td>
                  <td>40</td>
                </tr>
              </tbody>
            </table>
            <p className="muted" style={{ marginTop: 10 }}>
              Backend integration: replace with progress logs endpoint and quiz attempt history.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
