import React from "react";
import { useAuth } from "../auth/AuthContext";

// PUBLIC_INTERFACE
export function TopNav({ onToggleDrawer, onToggleChat, chatOpen }) {
  const { isAuthed, user, logout } = useAuth();

  return (
    <header className="topNav" role="banner">
      <div className="brand">
        <div className="brandMark" aria-hidden="true" />
        <div className="brandTitle">
          <strong>Study Hub</strong>
          <span>Retro focus. Modern flow.</span>
        </div>
      </div>

      <div className="navActions">
        <button className="iconBtn" onClick={onToggleDrawer} aria-label="Toggle navigation menu">
          ☰
        </button>

        {isAuthed ? (
          <>
            <span className="pill" aria-label="Signed in user">
              {user?.username ? `@${user.username}` : "Signed in"}
            </span>
            <button className="smallBtn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <span className="pill">Not signed in</span>
        )}

        <button
          className="primaryBtn"
          onClick={onToggleChat}
          aria-label={chatOpen ? "Close chat" : "Open chat"}
        >
          {chatOpen ? "Close Chat" : "Chat"}
        </button>
      </div>
    </header>
  );
}
