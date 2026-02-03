import React, { useMemo, useState } from "react";

// PUBLIC_INTERFACE
export function MaterialsPage() {
  const [query, setQuery] = useState("");

  const materials = useMemo(
    () => [
      { id: "m1", title: "Calculus: Derivatives cheat-sheet", tag: "Math", minutes: 12 },
      { id: "m2", title: "Biology: Cell organelles map", tag: "Science", minutes: 18 },
      { id: "m3", title: "Literature: Theme vs motif notes", tag: "English", minutes: 9 },
      { id: "m4", title: "CS: Big-O quick reference", tag: "Computer Science", minutes: 15 },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return materials;
    return materials.filter((m) => m.title.toLowerCase().includes(q) || m.tag.toLowerCase().includes(q));
  }, [materials, query]);

  return (
    <>
      <div className="pageHeader">
        <h1>Materials</h1>
        <p>Save and revisit notes, PDFs, and links. Keep it crisp.</p>
      </div>

      <div className="grid">
        <section className="card col-12">
          <div className="cardHeader">
            <h3>Your library</h3>
            <span className="badge">{filtered.length}</span>
          </div>
          <div className="cardBody">
            <div className="row">
              <label className="sr-only" htmlFor="materialsSearch">
                Search
              </label>
              <input
                id="materialsSearch"
                className="input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by title or tag…"
              />
              <button className="primaryBtn" type="button">
                + Add
              </button>
            </div>

            <div style={{ height: 10 }} />

            <table className="table" aria-label="Study materials">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Tag</th>
                  <th>Read time</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((m) => (
                  <tr key={m.id}>
                    <td style={{ color: "rgba(234,240,255,0.9)" }}>{m.title}</td>
                    <td>{m.tag}</td>
                    <td>{m.minutes} min</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="muted" style={{ marginTop: 10 }}>
              Backend integration: add GET/POST materials endpoints; then replace this in-memory list with API data.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
