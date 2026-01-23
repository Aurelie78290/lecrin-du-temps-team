import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Les mots de passe ne sont pas identiques");
      return;
    }
    try {
      await api.post("/api/reset-password", {
        token,
        password,
      });
      setMessage(
        "Votre mot de passe a été modifié avec succès ! Vous allez être rediriger...",
      );

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      setError(
        "Le lien est invalide ou a expiré. Veuillez renouveler votre demande",
      );
    }
  };

  if (!token) {
    return (
      <div className="auth-container">
        <p className="error-message">Token manquant</p>
      </div>
    );
  }

  return (
    <div className="reset-password-container">
      <h2>Nouveau mot de passe</h2>
      <p>Veuillez entrer votre nouveau mot de passe</p>

      <form onSubmit={handleSubmit}>
        <div className="from-group">
          <label htmlFor="password">Nouveau mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder=""
          />

          <div className="from-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="reset-password-btn">
            Valider
          </button>
        </div>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ResetPassword;
