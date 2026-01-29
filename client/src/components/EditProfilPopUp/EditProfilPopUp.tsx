import type React from "react";
import { useEffect, useState } from "react";
import "./EditProdilPopUp.css";

interface EditProfilePopUpProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: string;
  currentPhotoUrl: string;
  onPhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  onPhotoDelete: () => Promise<void>;
  onSave: (data: {
    firstname: string;
    lastname: string;
    email: string;
    birthdate: string;
    tel: string;
    user_describe: string;
    street_number: string;
    street: string;
    zip_code: string;
    city: string;
  }) => Promise<void>;
  initialData: {
    firstname: string;
    lastname: string;
    email: string;
    birthdate: string;
    tel: string;
    user_describe: string;
    street_number: string;
    street: string;
    zip_code: string;
    city: string;
  };
}

const EditProfilePopUp = ({
  isOpen,
  onClose,
  userRole,
  currentPhotoUrl,
  onPhotoUpload,
  onPhotoDelete,
  onSave,
  initialData,
}: EditProfilePopUpProps) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
  };

  const isAdmin = userRole === "admin";

  return (
    <div
      className="popup"
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      tabIndex={-1}
    >
      <div
        className="popup-content"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <h2>Modifier mes Informations Personnelle</h2>
        <div className="popup-photo-edit">
          <div className="preview-container">
            <img src={currentPhotoUrl} alt="apercu" className="small-preview" />
          </div>
          <div className="photo-actions-btns">
            <label htmlFor="photo-upload" className="upload-link">
              Changer la photo
              <input
                type="file"
                id="photo-upload"
                onChange={onPhotoUpload}
                hidden
              />
            </label>
            {currentPhotoUrl.includes("profilepictures") && (
              <button
                type="button"
                className="delete-pic-btn"
                onClick={onPhotoDelete}
              >
                Supprimer la photo
              </button>
            )}
          </div>
        </div>
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
            />
          </div>
          <div className="inputs">
            <label htmlFor="birthdate">Date de naissance</label>
            <input
              id="birthdate"
              type="date"
              value={formData.birthdate}
              onChange={(e) =>
                setFormData({ ...formData, birthdate: e.target.value })
              }
            />
          </div>
          <div className="inputs">
            <label htmlFor="tel">Téléphone</label>
            <input
              id="tel"
              type="text"
              value={formData.tel}
              onChange={(e) =>
                setFormData({ ...formData, tel: e.target.value })
              }
            />
          </div>
          {isAdmin ? (
            <div className="inputs">
              <label htmlFor="user_describe">Déscription</label>
              <textarea
                id="user_describe"
                rows={4}
                value={formData.user_describe || ""}
                onChange={(e) =>
                  setFormData({ ...formData, user_describe: e.target.value })
                }
              />
            </div>
          ) : (
            <div className="adress-section">
              <div className="inputs-row">
                <div className="small inputs">
                  <label htmlFor="street_number">N°</label>
                  <input
                    id="street_number"
                    type="text"
                    value={formData.street_number || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        street_number: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="inputs">
                  <label htmlFor="address_street">Rue</label>
                  <input
                    id="address_street"
                    type="text"
                    value={formData.street || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        street: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="inputs">
                  <label htmlFor="zip_code">Code Postal</label>
                  <input
                    id="zip_code"
                    type="text"
                    value={formData.zip_code || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, zip_code: e.target.value })
                    }
                  />
                </div>
                <div className="inputs">
                  <label htmlFor="city">Ville</label>
                  <input
                    id="city"
                    type="text"
                    value={formData.city || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          )}

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
