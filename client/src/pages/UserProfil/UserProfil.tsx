import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";
import "./UserProfil.css";

const UserProfil = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Ici on gère le logout //
  const handleLogout = async () => {
    try {
      // On appel le server pour supprimer le cookie //
      await api.get("/api/logout");
      // on remet le setUser a null //
      logout();
      // On renvoi a l apage d'accueil du site //
      navigate("/");
    } catch (err) {
      console.error("Erreur lors de la déconnexion", err);
    }
  };

  if (!user) return <div className="loading">Chargement de votre écrin...</div>;

  return (
    <div className="profil-container">
      <h1>
        Bienvenue
        <br />
        {user.firstname.toUpperCase()} {user.lastname.toUpperCase()}
      </h1>
      <button type="button" onClick={handleLogout} className="logout-btn">
        Se déconnecter
      </button>
      <div className="cards-infos-container">
        <div className="profil-infos-card">
          <h3>Données personnelles</h3>
          <div className="profil-infos-content">
            <p>
              <span className="label">Prénom:</span>
              {user.firstname}
            </p>
            <p>
              <span className="label">Nom:</span>
              {user.lastname}
            </p>
          </div>
        </div>
        <div className="profil-infos-card">
          <h3>Identifiants</h3>
          <div className="profil-infos-content">
            <p>
              <span className="label">Adresse e-mail:</span>
              {user.email}
            </p>
            <p>
              <span className="label">Password:</span>
              ************
            </p>
          </div>
        </div>
        <div className="profil-infos-card">
          <h3>Adresse de facturation</h3>
          <div className="profil-infos-content">
            <p>N° de rue</p>
            <p>Rue</p>
            <p>Code postal</p>
            <p>Ville</p>
          </div>
        </div>

        <div className="profil-infos-card">
          <h3>Mes commandes</h3>
          <div className="profil-infos-content">
            <p>Aucune commande</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfil;
