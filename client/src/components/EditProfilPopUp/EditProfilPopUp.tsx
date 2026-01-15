import type React from "react";
import { useState } from "react";
import "./EditProdilPopUp.css";

interface EditProfilePopUpProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    firstname: string;
    lastname: string;
    email: string;
  }) => Promise<void>;
  initialData: { firstname: string; lastname: string; email: string };
}

const EditProfilePopUp = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}: EditProfilePopUpProps) => {
  const [formData, setFormData] = useState(initialData);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  return (
    <div
      className="popup"
      onClick={onClose}
      onKeyDown={(e) => e.key === "Echap" && onClose()}
      tabIndex={-1}
    >
      <div
        className="popup-content"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <h2>Modifier mes Informations Personnelle</h2>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <label htmlFor="firstname">Prénom</label>
            <input
              id="firstname"
              type="text"
              value={formData.firstname}
              onChange={(e) =>
                setFormData({ ...formData, firstname: e.target.value })
              }
              required
            />
          </div>
          <div className="inputs">
            <label htmlFor="lastname">Nom</label>
            <input
              id="lastname"
              type="text"
              value={formData.lastname}
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
              required
            />
          </div>
          <div className="inputs">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div className="popup-btns">
            <button type="submit">Enregistrer</button>
            <button type="button" onClick={onClose}>
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePopUp;
