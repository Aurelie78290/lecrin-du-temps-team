import { Link } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

import "./LinkAddWatch.css";

function LinkAddWatch() {
  const { user } = useAuth();
  return (
    <>
      {user?.role === "admin" ? (
        <div className="LinkAddWatch-container">
          <Link className="LinkAddWatch" to="/Hub">
            VENDRE UNE MONTRE
          </Link>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default LinkAddWatch;
