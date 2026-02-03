import React, { useMemo, useState } from "react";

// PUBLIC_INTERFACE
export function QuizzesPage() {
  const quizzes = useMemo(
    () => [
      { id: "q1", title: "Eigenvalues basics", questions: 8, difficulty: "Medium" },
      { id: "q2", title: "Cell structure", questions: 10, difficulty: "Easy" },
      { id: "q3", title: "Time complexity", questions: 12, difficulty: "Hard" },
    ],
    []
  );

  const [active, setActive] = useState(null);

  return (
    <>
      <div className="pageHeader">
        <h1>Quizzes</h1>
        <p>Quick checks to cement concepts. Retro points, real progress.</p>
      </div>

      <div className="grid">
        <section className="card col-6">
          <div className="cardHeader">
            <h3>Available quizzes</h3>
            <span className="badge">{quizzes.length}</span>
          </div>
          <div className="cardBody">
            <table className="table" aria-label="Quiz list">
              <thead>
                <tr>
                  <th>Quiz</th>
                  <th>Questions</th>
                  <th>Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {quizzes.map((q) => (
                  <tr
                    key={q.id}
                    onClick={() => setActive(q)}
                    style={{ cursor: "pointer" }}
                    aria-label={`Select quiz ${q.title}`}
                  >
                    <td style={{ color: "rgba(234,240,255,0.9)" }}>{q.title}</td>
                    <td>{q.questions}</td>
                    <td>{q.difficulty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="muted" style={{ marginTop: 10 }}>
              Backend integration: load quizzes and questions via REST, submit attempts, and store results.
            </p>
          </div>
        </section>

        <section className="card col-6">
          <div className="cardHeader">
            <h3>Selected</h3>
            <span className="badge">Preview</span>
          </div>
          <div className="cardBody">
            {active ? (
              <>
                <div className="kpi" style={{ marginBottom: 10 }}>
                  <strong style={{ fontSize: 18 }}>{active.title}</strong>
                  <span>{active.questions} questions</span>
                </div>
                <p className="muted">
                  Difficulty: <strong style={{ color: "rgba(234,240,255,0.9)" }}>{active.difficulty}</strong>
                </p>
                <button className="primaryBtn" type="button">
                  Start quiz
                </button>
              </>
            ) : (
              <p className="muted">Select a quiz to preview it.</p>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
