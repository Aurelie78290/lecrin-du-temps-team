import "./UserInfosPopup.css";
import { useState } from "react";

interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  tel: string;
  role: string;
  birthdate: string;
}

interface UserInfosPopupProps {
  user: User;
  onClose: () => void;
}

const UserInfosPopup = ({ user, onClose }: UserInfosPopupProps) => {
  const [view, setView] = useState<"infos" | "collection">("infos");
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" || e.key === "Enter") {
      onClose();
    }
  };
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
            <div className="collection-content">
              <p>Collection de {user.firstname}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfosPopup;
