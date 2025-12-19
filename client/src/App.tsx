import "./App.css";
import { Outlet } from "react-router";
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
