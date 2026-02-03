import React, { useMemo, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { useAuth } from "./auth/AuthContext";
import { TopNav } from "./components/TopNav";
import { SideDrawer } from "./components/SideDrawer";
import { ChatPopup } from "./components/ChatPopup";
import { AuthPage } from "./pages/AuthPage";
import { DashboardPage } from "./pages/DashboardPage";
import { MaterialsPage } from "./pages/MaterialsPage";
import { QuizzesPage } from "./pages/QuizzesPage";
import { ProgressPage } from "./pages/ProgressPage";
import { ForumPage } from "./pages/ForumPage";

/**
 * Study Hub app shell:
 * - Top navigation
 * - Side drawer
 * - Main content area with routes
 * - Right-side chat popup
 */
// PUBLIC_INTERFACE
function App() {
  const { isAuthed } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const shell = useMemo(() => {
    return (
      <div className="appShell">
        <TopNav
          onToggleDrawer={() => setDrawerOpen((v) => !v)}
          onToggleChat={() => setChatOpen((v) => !v)}
          chatOpen={chatOpen}
        />

        <div className="contentWrap">
          <SideDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

          <main className="main" role="main" aria-label="Main content">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/materials" element={<MaterialsPage />} />
              <Route path="/quizzes" element={<QuizzesPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/forum" element={<ForumPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>

        <ChatPopup isOpen={chatOpen} onClose={() => setChatOpen((v) => !v)} />
      </div>
    );
  }, [drawerOpen, chatOpen]);

  if (!isAuthed) {
    return <AuthPage />;
  }

  return shell;
}

export default App;
