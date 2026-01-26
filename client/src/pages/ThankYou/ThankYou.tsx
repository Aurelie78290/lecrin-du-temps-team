import { CheckCircle, Home, Package } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useBasket } from "../../contexts/ShopContext";

import "./ThankYou.css";

type PaymentInfo = {
  customerEmail: string;
  amountTotal?: number;
  delivery?: unknown;
  paid: boolean;
};

function ThankYou() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { clearBasket } = useBasket();

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo | null>(null);

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get("session_id");

      if (!sessionId) {
        setStatus("error");
        return;
      }

      //vérification du paiement aurpès du backend
      try {
        const res = await fetch(
          `http://localhost:3310/api/stripe/verify-payment/${sessionId}`,
          {
            credentials: "include",
          },
        );
        const data = await res.json();

        if (!data.paid) {
          setStatus("error");
          return;
        }
        setPaymentInfo(data);

        // 2. Créer la commande dans order_archive
        try {
          const orderRes = await fetch(
            "http://localhost:3310/api/orders/create-from-stripe",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({
                sessionId,
                delivery: data.delivery || {}, // Récupéré depuis la session Stripe
              }),
            },
          );

          if (!orderRes.ok) {
            console.error("Erreur création commande");
          }
        } catch (err) {
          console.error("Erreur:", err);
        }

        // vider le panier
        await clearBasket();

        setStatus("success");
      } catch (err) {
        console.error("Erreur vérification paiement:", err);
        setStatus("error");
      }
    };
    verifyPayment();
  }, [searchParams, clearBasket]);

  if (status === "loading") {
    return (
      <div>
        <p>Vérification du paiement...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div>
        <p>
          Une erreur est survenue lors de la vérification de votre paiement.
        </p>
        <button type="button" onClick={() => navigate("/ShopPayment")}>
          Réessayer
        </button>
      </div>
    );
  }

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
                <li>La livraison sera effectuée dans les meilleurs délais</li>
              </ul>
              {paymentInfo && (
                <div className="thankYou-confirmation">
                  <p>
                    <strong>Email de confirmation :</strong>{" "}
                    {paymentInfo.customerEmail}
                  </p>
                  <p>
                    <strong>Montant payé :</strong>{" "}
                    {paymentInfo.amountTotal?.toLocaleString("fr-FR")} €
                  </p>
                </div>
              )}
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
