import { Outlet } from "react-router";

import "./App.css";
import ThemeChange from "./components/ThemeChange/ThemeChange";
import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  return (
    <div className={`app-layout ${sidebarExpanded ? "sidebar-expanded" : ""}`}>
      <Navbar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />
      <main className="main-content">
        <Outlet />
        <ThemeChange />
      </main>
    </div>
  );
}

export default App;
