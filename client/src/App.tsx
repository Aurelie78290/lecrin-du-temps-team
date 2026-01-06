import { Outlet } from "react-router";
import "./App.css";
import ThemeChange from "./components/ThemeChange/ThemeChange";
import Home from "./pages/Home/Home";

function App() {
  return (
    <>
      <main>
        <Home />
        <ThemeChange />
        <Outlet />
      </main>
    </>
  );
}

export default App;
