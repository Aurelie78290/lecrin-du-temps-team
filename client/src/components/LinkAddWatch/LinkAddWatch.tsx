import { Link, useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";

import "./LinkAddWatch.css";

function LinkAddWatch() {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      {user?.role === "admin" ? (
        <div className="LinkAddWatch-container">
          <Link className="LinkAddWatch" to="/Hub">
            VENDRE UNE MONTRE
          </Link>
          <button
            type="button"
            className="manage-watch-btn"
            onClick={() => navigate("/admin/manage-watches")}
          >
            Gérer les annonces
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default LinkAddWatch;
