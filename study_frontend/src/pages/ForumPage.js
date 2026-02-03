import React, { useMemo, useState } from "react";

// PUBLIC_INTERFACE
export function ForumPage() {
  const threads = useMemo(
    () => [
      { id: "t1", title: "Best way to memorize formulas?", replies: 12, tag: "Study Tips" },
      { id: "t2", title: "Help with eigenvectors intuition", replies: 7, tag: "Math" },
      { id: "t3", title: "Share your favorite spaced repetition tool", replies: 5, tag: "Tools" },
    ],
    []
  );

  const [draft, setDraft] = useState("");

  return (
    <>
      <div className="pageHeader">
        <h1>Forum</h1>
        <p>Ask, share, and build momentum with the community.</p>
      </div>

      <div className="grid">
        <section className="card col-8">
          <div className="cardHeader">
            <h3>Threads</h3>
            <span className="badge">{threads.length}</span>
          </div>
          <div className="cardBody">
            <table className="table" aria-label="Forum threads">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Tag</th>
                  <th>Replies</th>
                </tr>
              </thead>
              <tbody>
                {threads.map((t) => (
                  <tr key={t.id}>
                    <td style={{ color: "rgba(234,240,255,0.9)" }}>{t.title}</td>
                    <td>{t.tag}</td>
                    <td>{t.replies}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="muted" style={{ marginTop: 10 }}>
              Backend integration: add forum endpoints (threads + posts) and wire this table to API data.
            </p>
          </div>
        </section>

        <section className="card col-4">
          <div className="cardHeader">
            <h3>New post</h3>
            <span className="badge">Draft</span>
          </div>
          <div className="cardBody">
            <label className="sr-only" htmlFor="forumDraft">
              Post content
            </label>
            <textarea
              id="forumDraft"
              className="input"
              rows={8}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Write a quick question or share a tip…"
            />
            <div style={{ height: 10 }} />
            <button className="primaryBtn" type="button" disabled={!draft.trim()}>
              Post
            </button>
            <p className="muted" style={{ marginTop: 10 }}>
              Posting will be enabled after backend endpoints are available.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
