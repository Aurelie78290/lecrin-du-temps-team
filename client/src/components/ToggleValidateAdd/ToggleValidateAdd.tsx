import emailjs from "emailjs-com";
import { useState } from "react";

import "./ToggleValidateAdd.css";

import type { PendingAddsI } from "../ClassifiedAdDetails/ClassifiedAdDetails";

interface WatchDetailsProps {
  idwatch?: number | null | undefined;
  pendingAdds: PendingAddsI[];
  onSuccess: () => void;
}

function ToggleValidateAdd({
  idwatch,
  pendingAdds,
  onSuccess,
}: WatchDetailsProps) {
  const [isOpenValidate, setIsOpenValidate] = useState(false);
  const [isOpenRefuse, setIsOpenRefuse] = useState(false);
  const [showToastValidate, setShowToastValidate] = useState(false);
  const [showToastRefuse, setShowToastRefuse] = useState(false);
  const [refusalReason, setRefusalReason] = useState<string>("");

  // Pour récupérer les données de l'utilisateur en fonction de la montre(de l'annonce)
  const currentUserAd = pendingAdds.find((ad) => ad.idwatch === idwatch);

  const sendNotificationEmail = (
    status: "validée" | "refusée",
    reason?: string,
  ) => {
    if (!currentUserAd) return;

    const templateParams = {
      email: currentUserAd.e_mail,
      name: currentUserAd.firstname,
      brand: currentUserAd.brand,
      model: currentUserAd.model,
      status: status,
      message:
        reason || "Votre annonce est désormais en ligne sur notre plateforme.",
    };
    emailjs
      .send(
        "service_i50evab",
        "template_ryqshxq",
        templateParams,
        "vnUWR6OlUDktC38KT",
      )
      .then((result) => {
        console.log("Email envoyé avec succès !", result.text);
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi de l'email :", error);
      });
  };

  //===================
  // Template du mail :
  //===================
  // Bonjour {{name}},

  // Votre annonce pour la mise en vente de la montre {{brand}} - {{model}} a été {{status}}
  // {{message}}

  // Bien cordialement
  // L'équipe de L'écrin du temps

  //Le {{message}} est a renseigné directement dnas l'interface admin

  const handleConfirm = () => {
    const url = `${import.meta.env.VITE_API_URL}/api/pendingAddSell/${idwatch}`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        watch_sell_status: "active",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur: ${response.status}`);
        }
        if (response.status === 204) {
          return null;
        }

        return response.json();
      })
      .then((data) => {
        //On confirme par mail la validation au vendeur
        sendNotificationEmail("validée");
        //On confirme via un toast la réussite de l'opération via un message temporaire
        setShowToastValidate(true);
        setTimeout(() => setShowToastValidate(false), 3000);
        // Une fois confirmé, on ferme la modale
        setIsOpenValidate(false);
        console.log("Voici le retour de la data :", data);

        // Appel de la fonction de rafraîchissement passée par le parent
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la requête PUT :", error);
        alert("Une erreur est survenue lors de la confirmation.");
      });
  };

  const handleRefuse = () => {
    const url = `${import.meta.env.VITE_API_URL}/api/pendingAddSell/${idwatch}`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        watch_sell_status: "personal",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erreur: ${response.status}`);
        }
        if (response.status === 204) {
          return null;
        }

        return response.json();
      })
      .then((data) => {
        //On confirme le refus au vendeur par l'envoi d'un mail
        sendNotificationEmail("refusée", refusalReason);
        //On confirme via un toast la réussite de l'opération via un message temporaire
        setShowToastRefuse(true);
        setTimeout(() => setShowToastRefuse(false), 3000);
        // Une fois confirmé, on ferme la modale
        setIsOpenRefuse(false);
        console.log("Voici le retour de la data :", data);

        setRefusalReason("");
        // Appel de la fonction de rafraîchissement passée par le parent
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la requête PUT :", error);
        alert("Une erreur est survenue lors de la confirmation.");
      });
  };

  return (
    <div className="ToggleValidateAdd">
      {/* Votre Toast en haut de l'écran par exemple */}
      {showToastValidate && (
        <div className="toast-success">
          L'annonce a été validée avec succès ! 🎉
        </div>
      )}
      <button
        type="button"
        className="ToggleValidateAdd-valider1"
        onClick={() => setIsOpenValidate(true)}
      >
        Valider
      </button>
      {isOpenValidate && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Etes-vous sûr de vouloir valider et publier l'annonce?</p>
            <div className="modal-buttons ToggleValidateAdd-ToggleConfirmeValidate">
              <button
                type="button"
                className="ToggleValidateAdd-annuler1"
                onClick={() => setIsOpenValidate(false)}
              >
                Annuler
              </button>
              <button
                type="button"
                className="ToggleValidateAdd-valider2"
                onClick={() => handleConfirm()}
              >
                Valider
              </button>
            </div>
          </div>
        </div>
      )}
      {showToastRefuse && (
        <div className="toast-success">Le refus a bien été transmis !</div>
      )}
      <button
        type="button"
        className="ToggleValidateAdd-Refuser"
        onClick={() => setIsOpenRefuse(true)}
      >
        Refuser
      </button>
      {isOpenRefuse && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p className="ToggleValidateAdd-TitrePRefus">
              Expliquez les raisons du refus
            </p>
            <form>
              <textarea
                className="ToggleValidateAdd-Textarea"
                aria-label="Raison du refus"
                name="message"
                placeholder="Ecrivez ici la raison du refus"
                value={refusalReason}
                onChange={(e) => setRefusalReason(e.target.value)}
              />
            </form>
            <div className="modal-buttons ToggleValidateAdd-ToggleForm">
              <button
                type="button"
                className="ToggleValidateAdd-annuler2"
                onClick={() => setIsOpenRefuse(false)}
              >
                Annuler
              </button>
              <button
                type="button"
                className="ToggleValidateAdd-envoyer"
                onClick={handleRefuse}
                disabled={!refusalReason}
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default ToggleValidateAdd;
