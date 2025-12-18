import "./App.css";
import { Outlet } from "react-router";
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
