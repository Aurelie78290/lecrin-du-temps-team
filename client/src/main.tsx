// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router";

/* ************************************************************************* */

// Import the main app component
import App from "./App";
import About from "./pages/About/About";
import Cgu from "./pages/CGU/Cgu";
import CollectionWatchIndex from "./pages/CollectionWatchIndex/CollectionWatchIndex";
import Contact from "./pages/Contact/Contact";
import Dashboard from "./pages/Dashboard/Dashboard";
import Error404 from "./pages/Error404/Error404";
import Faq from "./pages/Faq/Faq";
import Home from "./pages/Home/Home";
import Hub from "./pages/Hub/Hub";
import LegalNotices from "./pages/LegalNotices/LegalNotices";
import News from "./pages/News/News";
import NewsDetails from "./pages/NewsDetails/NewsDetails";
import Shop from "./pages/Shop/Shop";
import ShopBasket from "./pages/ShopBasket/ShopBasket";
import ShopPayment from "./pages/ShopPayment/ShopPayment";
import ShopWatchIndex from "./pages/ShopWatchIndex/ShopWatchIndex";
import UserProfil from "./pages/UserProfil/UserProfil";
import WatchDetails from "./pages/WatchDetails/WatchDetails";

// Import additional components for new routes
// Try creating these components in the "pages" folder

// import About from "./pages/About";
// import Contact from "./pages/Contact";

/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!
const router = createBrowserRouter([
  {
    element: <App />, // Renders the App component for the home page
    errorElement: <Error404 />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/Hub",
        element: <Hub />,
      },
      {
        path: "/Collection",
        element: <CollectionWatchIndex />,
      },
      {
        path: "/CollectionWathIndex/:id",
        element: <CollectionWatchIndex />,
      },
      {
        path: "/Shop",
        element: <Shop />,
      },
      {
        path: "/ShopWatchIndex/:id",
        element: <ShopWatchIndex />,
      },
      {
        path: "/ShopBasket",
        element: <ShopBasket />,
      },
      {
        path: "/ShopPayment",
        element: <ShopPayment />,
      },
      {
        path: "/News",
        element: <News />,
      },
      {
        path: "/NewsDetails/:id",
        element: <NewsDetails />,
      },
      {
        path: "/Contact",
        element: <Contact />,
      },
      {
        path: "/About",
        element: <About />,
      },
      {
        path: "/Faq",
        element: <Faq />,
      },
      {
        path: "/UserProfil",
        element: <UserProfil />,
      },
      {
        path: "*",
        element: <Error404 />,
      },
      {
        path: "/Shop/:id",
        element: <WatchDetails />,
      },
      {
        path: "/Collection/:id",
        element: <WatchDetails />,
      },
      {
        path: "/Dashboard",
        element: <Dashboard />,
      },
      {
        path: "/LegalNotices",
        element: <LegalNotices />,
      },
      {
        path: "/Cgu",
        element: <Cgu />,
      },
    ],
  },

  // Try adding a new route! For example, "/about" with an About component
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
