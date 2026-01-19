import { useState } from "react";

import "./ToggleValidateAdd.css";

interface WatchDetailsProps {
  idwatch?: number | null | undefined;
  onSuccess: () => void;
}

function ToggleValidateAdd({ idwatch, onSuccess }: WatchDetailsProps) {
  const [isOpenValidate, setIsOpenValidate] = useState(false);
  const [isOpenRefuse, setIsOpenRefuse] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleConfirm = () => {
    const url = `${import.meta.env.VITE_API_URL}/api/pendingAddSell/${idwatch}`;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        watch_sell_status: "En vente",
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
        //On confirme via un toast la réussite de l'opération via un message temporaire
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
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
        watch_sell_status: "Refusée",
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
        //On confirme via un toast la réussite de l'opération via un message temporaire
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        // Une fois confirmé, on ferme la modale
        setIsOpenRefuse(false);
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

  return (
    <div>
      {/* Votre Toast en haut de l'écran par exemple */}
      {showToast && (
        <div className="toast-success">Le refus a bien été transmis !</div>
      )}
      <button type="button" onClick={() => setIsOpenValidate(true)}>
        Valider
      </button>
      {isOpenValidate && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Etes-vous sûr de vouloir valider et publier l'annonce?</p>
            <div className="modal-buttons">
              <button type="button" onClick={() => setIsOpenValidate(false)}>
                Annuler
              </button>
              <button type="button" onClick={() => handleConfirm()}>
                Valider
              </button>
            </div>
          </div>
        </div>
      )}
      <button type="button" onClick={() => setIsOpenRefuse(true)}>
        Refuser
      </button>
      {isOpenRefuse && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Expliquez les raisons du refus</p>
            <form>
              <label>
                Objet
                <input name="objet" />
              </label>
              <hr />
              <label>
                Message:
                <input name="message" />
              </label>
            </form>
            <div className="modal-buttons">
              <button type="button" onClick={() => setIsOpenRefuse(false)}>
                Annuler
              </button>
              <button type="button" onClick={() => handleRefuse()}>
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
