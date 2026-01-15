import Navbar from "./components/Navbar/Navbar";
import { Outlet, useLocation } from "react-router";

import "./App.css";
import { useState } from "react";
import "./App.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const location = useLocation();
  const pagesWithoutSidebar = ["/"];
  const showSidebar = !pagesWithoutSidebar.includes(location.pathname);
  return (
    // On englobe tout dans AuthProvider pour tout protéger //
    <AuthProvider>
      <ThemeProvider>
        <div
          className={`app-layout ${sidebarExpanded ? "sidebar-expanded" : ""} ${!showSidebar ? "no-sidebar" : ""}`}
        >
          {showSidebar && (
            <Navbar
              expanded={sidebarExpanded}
              setExpanded={setSidebarExpanded}
            />
          )}
          <main className="main-content">
            <Outlet />
          </main>
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
