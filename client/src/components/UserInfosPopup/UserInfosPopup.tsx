import "./UserInfosPopup.css";
import { useState, useEffect } from "react";
import api from "../../services/api";

interface Watch {
  idwatch: number;
  brand: string;
  model: string;
  watch_price: number | null;
  watch_condition: string | null;
  photo_url: string | null;
  watch_sell_status: "personal" | "pending" | "active";
}

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  tel: string;
  role: string;
  birthdate: string;
  last_login?: string | null;
}

interface UserInfosPopupProps {
  user: User;
  onClose: () => void;
}

const UserInfosPopup = ({ user, onClose }: UserInfosPopupProps) => {
  const [view, setView] = useState<"infos" | "collection">("infos");
  const [watches, setWatches] = useState<Watch[]>([]);
  const [loading, setLoading] = useState(false);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" || e.key === "Enter") {
      onClose();
    }
  };

  useEffect(() => {
    if (view === "collection") {
      setLoading(true);
      api
        .get(`/api/admin/users/${user.id}/watches`)
        .then((res) => setWatches(res.data))
        .catch((err) =>
          console.error("Erreur lors du chargement de la collection:", err),
        )
        .finally(() => setLoading(false));
    }
  }, [view, user.id]);

  return (
    <div
      className="popup-overlay"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      aria-label="Fermer"
    >
      <div
        className="popup-content"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        aria-modal="true"
      >
        <button
          type="button"
          className="close-btn"
          onClick={onClose}
          onKeyDown={handleKeyDown}
          aria-label="Fermer"
        >
          X
        </button>
        <header className="infos-header">
          <h2>{view === "infos" ? "Détails Utilisateur" : "Collection"}</h2>
          <p>ID #{user.id}</p>
        </header>
        {view === "infos" ? (
          <>
            <div className="popup-body">
              <p className="infos">
                <span className="label">Dernière connexion:</span>
                <span className="value">
                  {user.last_login
                    ? new Date(user.last_login).toLocaleString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Jamais connecté"}
                </span>
              </p>
              <p className="infos">
                <span className="label">Prénom:</span>
                <span className="value">
                  {user.firstname || "Non renseigné"}
                </span>
              </p>
              <p className="infos">
                {" "}
                <span className="label">Nom:</span>
                <span className="value">
                  {user.lastname || "Non renseigné"}
                </span>
              </p>
              <p className="infos">
                {" "}
                <span className="label">Email:</span>
                <span className="value">{user.email}</span>
              </p>
              <p className="infos">
                {" "}
                <span className="label">Téléphone:</span>
                <span className="value">{user.tel || "Non renseigné"}</span>
              </p>
              <p className="infos">
                {" "}
                <span className="label">Rôle:</span>
                <span className="value">{user.role}</span>
              </p>
              <p className="infos">
                {" "}
                <span className="label">Date de Naissance:</span>
                <span className="value">
                  {user.birthdate
                    ? new Date(user.birthdate).toLocaleDateString("fr-FR")
                    : "Non renseignée"}
                </span>
              </p>
            </div>
            <button
              className="collection-btn"
              type="button"
              onClick={() => setView("collection")}
            >
              Voir la collection
            </button>
          </>
        ) : (
          <div className="popup-body">
            <button
              type="button"
              onClick={() => setView("infos")}
              className="back-btn"
            >
              Retour
            </button>
            {loading ? (
              <p>Chargement de la collection...</p>
            ) : (
              <div className="collection-container">
                <h3 className="collection-owner">
                  Collection de {user.firstname}
                </h3>
                <div className="collection-list">
                  {watches.length > 0 ? (
                    watches.map((w) => (
                      <div key={w.idwatch} className="watch-items">
                        <div className="watch-img">
                          <img
                            src={
                              w.photo_url
                                ? `${import.meta.env.VITE_API_URL}${w.photo_url}`
                                : "/placeholder-watch.png"
                            }
                            alt={w.model}
                          />
                          <span
                            className={`watch-status ${w.watch_sell_status}`}
                          >
                            {w.watch_sell_status === "active"
                              ? "En vente"
                              : w.watch_sell_status === "pending"
                                ? "En attente de validation"
                                : "Personnel"}
                          </span>
                        </div>
                        <div className="watch-details">
                          <span className="watch-brand">{w.brand}</span>
                          <span className="watch-model">{w.model}</span>
                          <span className="watch-price">
                            {w.watch_price ? `${w.watch_price}€` : "Prix "}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Cet utilisateur n'a pas encore de montre.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfosPopup;
