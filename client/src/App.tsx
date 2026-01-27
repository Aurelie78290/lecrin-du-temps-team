import { Outlet, useLocation } from "react-router";
import Navbar from "./components/Navbar/Navbar";

import "./App.css";
import { useState } from "react";
import "./App.css";
import BasketIcon from "./components/Basket/BasketIcon";
import { AuthProvider } from "./contexts/AuthContext";
import { FavoriteProvider } from "./contexts/FavoriteContext";
import { BasketProvider } from "./contexts/ShopContext";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const location = useLocation();
  const pagesWithoutSidebar = ["/"];
  const showSidebar = !pagesWithoutSidebar.includes(location.pathname);

  const pagesWithoutBasket = ["/"];
  const showBasket = !pagesWithoutBasket.includes(location.pathname);

  return (
    // On englobe tout dans AuthProvider pour tout protéger //
    <AuthProvider>
      <ThemeProvider>
        <FavoriteProvider>
          <BasketProvider>
            {showBasket && (
              <div className="basket-icon-container">
                <BasketIcon />
              </div>
            )}
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
          </BasketProvider>
        </FavoriteProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
