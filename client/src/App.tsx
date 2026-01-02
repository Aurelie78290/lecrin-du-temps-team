import { Outlet } from "react-router";

import "./App.css";
import ThemeChange from "./components/ThemeChange/ThemeChange";

function App() {
  return (
    <>
      <main>
        <Outlet />
        <ThemeChange />
      </main>
    </>
  );
}

export default App;
