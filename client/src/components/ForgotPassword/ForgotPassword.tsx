import { useState } from "react";
import api from "../../services/api";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await api.post("/api/forgot-password", { e_mail: email });
      setMessage(
        "Si cet email existe, un lien sera envoyé pour réinitialiser le mot de passe.",
      );
    } catch (err) {
      setError("Problème lors de l'envoi de l'email");
    }
  };
  return (
    <div className="forgot-password-container">
      <h2>Mot de passe oublié</h2>
      <p>
        Merci d'entrer votre addresse e-mail afin de recevoir un lien de
        récuperation de votre mot de passe.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="votre@email.com"
          />
        </div>
        <button type="submit" className="send-btn">
          Envoyer le mail de récupération
        </button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ForgotPassword;
