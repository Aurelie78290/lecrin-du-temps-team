import { Outlet } from "react-router";

import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import ThemeChange from "./components/ThemeChange/ThemeChange";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
        <ThemeChange />
      </main>
    </>
  );
}

export default App;
