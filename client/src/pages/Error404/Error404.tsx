import { Link, isRouteErrorResponse, useRouteError } from "react-router";
import "../Error404/Error404.css";
import "../../components/ThemeChange/ThemeChange.css";

export default function Error404() {
  const error = useRouteError();

  let message = "Page Not Found";
  let message1 = "Were're sorry, the page you requested could not be found, Please go back to the Homepage";
  if (isRouteErrorResponse(error)) {
    message = error.statusText;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <main className="error404All">
      <h1>404</h1>
      <p className="notFound">{message}</p>
      <p className="sorry">{message1}</p>

      <Link to="/" className="theme-change">
        Homepage
      </Link>
    </main>
  );
}
