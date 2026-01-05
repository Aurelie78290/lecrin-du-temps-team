import { Outlet, useLocation } from "react-router";

import "./App.css";
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import ThemeChange from "./components/ThemeChange/ThemeChange";

function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const location = useLocation();
  const pagesWithoutSidebar = ["/"];
  const showSidebar = !pagesWithoutSidebar.includes(location.pathname);
  return (
    <div
      className={`app-layout ${sidebarExpanded ? "sidebar-expanded" : ""} ${!showSidebar ? "no-sidebar" : ""}`}
    >
      {showSidebar && (
        <Navbar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />
      )}
      <main className="main-content">
        <Outlet />
        <ThemeChange />
      </main>
    </div>
  );
}

export default App;
