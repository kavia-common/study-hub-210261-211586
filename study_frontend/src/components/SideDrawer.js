import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Dashboard", icon: "⌂" },
  { to: "/materials", label: "Materials", icon: "📚" },
  { to: "/quizzes", label: "Quizzes", icon: "🧠" },
  { to: "/progress", label: "Progress", icon: "📈" },
  { to: "/forum", label: "Forum", icon: "💬" },
];

// PUBLIC_INTERFACE
export function SideDrawer({ isOpen, onClose }) {
  return (
    <aside className={`drawer ${isOpen ? "drawerOpen" : ""}`} aria-label="Primary navigation">
      <div className="drawerHeader">
        <h2>Navigate</h2>
        <button className="iconBtn" onClick={onClose} aria-label="Close navigation menu">
          ✕
        </button>
      </div>

      <nav className="navList">
        {navItems.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            className={({ isActive }) => `navItem ${isActive ? "navItemActive" : ""}`}
            onClick={onClose}
          >
            <span aria-hidden="true">{it.icon}</span>
            <span>{it.label}</span>
          </NavLink>
        ))}
      </nav>

      <div style={{ height: 14 }} />

      <div className="card">
        <div className="cardHeader">
          <h3>Tip</h3>
          <span className="badge">Retro</span>
        </div>
        <div className="cardBody">
          Use Materials to save focus notes, then run a Quiz to lock it in.
        </div>
      </div>
    </aside>
  );
}
