import { Link, isRouteErrorResponse, useRouteError } from "react-router";
import "../Error404/Error404.css";
import "../../components/ThemeChange/ThemeChange.css";

export default function Error404() {
  const error = useRouteError();

  let message = "Une erreur inattendue est survenue.";

  if (isRouteErrorResponse(error)) {
    message = error.statusText;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <main className="error404All">
      <h1>404</h1>
      <p>{message}</p>

      <Link to="/" className="theme-change">
        Retour à l’accueil
      </Link>
    </main>
  );
}
