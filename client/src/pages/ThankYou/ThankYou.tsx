import { CheckCircle, Home, Package } from "lucide-react";
import { useNavigate } from "react-router";
import "./ThankYou.css";

function ThankYou() {
  const navigate = useNavigate();

  return (
    <div className="thankyou-page">
      <div className="thankyou-container">
        <div className="thankyou-card">
          <div className="thankyou-icon-wrapper">
            <CheckCircle className="thankyou-icon" />
          </div>

          <h1 className="thankyou-title">Commande validée !</h1>

          <p className="thankyou-message">
            Merci pour votre confiance. Votre commande a été enregistrée avec
            succès.
          </p>

          <div className="thankyou-info-box">
            <Package className="thankyou-info-icon" />
            <div className="thankyou-info-text">
              <h3>Que se passe-t-il maintenant ?</h3>
              <ul>
                <li>
                  Vous recevrez un email de confirmation sous quelques instants
                </li>
                <li>Votre montre sera préparée avec le plus grand soin</li>
                <li>
                  La livraison assurée sera effectuée dans les meilleurs délais
                </li>
                <li>
                  Vous recevrez un numéro de suivi pour suivre votre colis
                </li>
              </ul>
            </div>
          </div>

          <div className="thankyou-actions">
            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="thankyou-button thankyou-button-primary"
            >
              <Home className="thankyou-button-icon" />
              Retour à la boutique
            </button>

            <button
              type="button"
              onClick={() => navigate("/collection")}
              className="thankyou-button thankyou-button-secondary"
            >
              Voir ma collection
            </button>
          </div>

          <p className="thankyou-footer">
            Une question ? Contactez notre service client à{" "}
            <a href="mailto:contact@ecrindutemps.fr">contact@ecrindutemps.fr</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
