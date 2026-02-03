import React, { useMemo, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useChatSocket } from "../hooks/useChatSocket";

// PUBLIC_INTERFACE
export function ChatPopup({ isOpen, onClose }) {
  const { token, user, isAuthed } = useAuth();
  const [draft, setDraft] = useState("");

  const { status, messages, sendMessage, setMessages } = useChatSocket({
    isEnabled: isOpen && isAuthed,
    token,
  });

  const displayMessages = useMemo(() => {
    return messages.map((m, idx) => {
      const text = m.text || m.message || m.content || JSON.stringify(m);
      const author = m.user || m.username || m.author || "";
      const isSelf = author && user?.username && author === user.username;
      return { id: `${idx}`, text, author, isSelf };
    });
  }, [messages, user?.username]);

  if (!isOpen) {
    return (
      <button className="chatFab" onClick={onClose} aria-label="Open chat">
        💬
      </button>
    );
  }

  return (
    <>
      <button className="chatFab" onClick={onClose} aria-label="Close chat">
        ✕
      </button>

      <section className="chatPopup" aria-label="Chat popup">
        <div className="chatHeader">
          <strong>Live Chat</strong>
          <span className="pill">{isAuthed ? status : "Sign in to chat"}</span>
        </div>

        <div className="chatBody" role="log" aria-live="polite">
          {!isAuthed ? (
            <div className="chatMsg">Please sign in to connect.</div>
          ) : displayMessages.length === 0 ? (
            <div className="chatMsg">No messages yet. Say hello.</div>
          ) : (
            displayMessages.map((m) => (
              <div key={m.id} className={`chatMsg ${m.isSelf ? "chatMsgSelf" : ""}`}>
                {m.author ? <div className="muted" style={{ fontSize: 11 }}>{m.author}</div> : null}
                <div>{m.text}</div>
              </div>
            ))
          )}
        </div>

        <form
          className="chatFooter"
          onSubmit={(e) => {
            e.preventDefault();
            if (!draft.trim() || !isAuthed) return;

            const payload = { text: draft.trim(), user: user?.username || "me" };
            const ok = sendMessage(payload);
            if (!ok) {
              // optimistic local append if socket not connected (still useful UX)
              setMessages((prev) => [...prev, payload]);
            }
            setDraft("");
          }}
        >
          <label className="sr-only" htmlFor="chatDraft">
            Message
          </label>
          <input
            id="chatDraft"
            className="input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={isAuthed ? "Type a message…" : "Sign in to chat…"}
            disabled={!isAuthed}
          />
          <button className="primaryBtn" type="submit" disabled={!isAuthed}>
            Send
          </button>
        </form>
      </section>
    </>
  );
}
