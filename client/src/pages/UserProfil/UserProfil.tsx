import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditProfilPopUp from "../../components/EditProfilPopUp/EditProfilPopUp";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";
import "./UserProfil.css";
import UserOrderSummary from "../../components/UserOrderHistory/UserOrderSummary";

interface Order {
  id: number;
  price: number;
  purchase_date: string;
  watch_id: number;
  watch_photo: string;
  brand: string;
  name: string;
}

const UserProfil = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isUserOderSummaryOpen, setIsUserOrderSummaryOpen] = useState(false);

  const handleUpdate = async (updatedData: {
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
  }) => {
    if (!user) return;
    try {
      const dataTosave = {
        ...updatedData,
        id: user.id,
        user_photo: user.user_photo,
      };
      await api.put("/api/users/me", dataTosave);
      login({ ...user, ...updatedData });
      setIsPopupOpen(false);
      alert("Informations mises à jour");
    } catch (err) {
      alert("erreur lors de la mise à jour");
    }
  };

  if (!user) return <p>Chargement...</p>;

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

  const isAdmin = user?.role === "admin";

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const res = await api.post("/api/users/me/photo", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      login({ ...user, user_photo: res.data.photo_url });
      alert("Photo mise à jour");
    } catch (err) {
      alert("Erreur lors de la mise à jour de la photo");
    }
  };

  const handlePhotoDelete = async () => {
    if (!window.confirm("voulez-vous vraiment supprimer votre photo?")) return;
    try {
      await api.delete("/api/users/me/photo");
      login({ ...user, user_photo: null });
      alert("Photo supprimée");
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  useEffect(() => {
    if (user && user.role !== "admin") {
      api
        .get("/api/users/me/orders")
        .then((res) => setOrders(res.data))
        .catch((err) => console.error("Erreur commandes:", err));
    }
  }, [user]);

  const avatarFallback = user
    ? `https://ui-avatars.com/api/?name=${user.firstname}+${user.lastname}&background=1a1a1a&color=d4af37&size=128`
    : "";

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => setIsReady(true), 100);
      return () => clearTimeout(timer);
    }
  }, [user]);

  if (!user) return <div className="loading">Chargement de votre écrin...</div>;

  return (
    <div className={`profil-container ${isReady ? "is-ready" : ""}`}>
      <div
        className="profil-header"
        style={{ "--i": 0 } as React.CSSProperties}
      >
        <div
          className="profil-actions"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          <div className="photo-section">
            <div className="image-container">
              <img
                src={
                  user.user_photo
                    ? `http://localhost:3310${user.user_photo}`
                    : avatarFallback
                }
                alt="Profil-pic"
                className="profil-photo"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = avatarFallback;
                }}
              />
            </div>
          </div>
          <h1>
            {/* Bienvenue
            <br /> */}
            {user.firstname.toUpperCase()} {user.lastname.toUpperCase()}
          </h1>
        </div>
        <div className="header-btns">
          <button
            type="button"
            className="popup-btn"
            onClick={() => setIsPopupOpen(true)}
          >
            Modifier mes informations
          </button>
          <button type="button" onClick={handleLogout} className="logout-btn">
            Se déconnecter
          </button>
        </div>
      </div>
      <div className="cards-infos-container">
        <div
          className="profil-infos-card"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          <h3>Informations personnelles</h3>
          <div className="profil-infos-content">
            <p>
              <span className="label">Prénom:</span>
              {user.firstname}
            </p>
            <p>
              <span className="label">Nom:</span>
              {user.lastname}
            </p>
            <p>
              <span className="label">Date de naissance:</span>
              {user.birthdate
                ? new Date(user.birthdate).toLocaleDateString("fr-FR")
                : "Non renseignée"}
            </p>
            <p>
              <span className="label">Téléphone:</span>
              {user.tel}
            </p>
            {isAdmin && (
              <div className="bio-section">
                <p>
                  <span className="label">Déscription:</span>
                  {user.user_describe || "Aucune description fournie."}
                </p>
              </div>
            )}
          </div>
        </div>
        <div
          className="profil-infos-card"
          style={{ "--i": 3 } as React.CSSProperties}
        >
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
        {!isAdmin && (
          <>
            <div
              className="profil-infos-card"
              style={{ "--i": 4 } as React.CSSProperties}
            >
              <h3>Adresse de Livraison</h3>
              <div className="profil-infos-content">
                <p>
                  <span className="label">N° de rue :</span>
                  {user.street_number || "Non renseigné"}
                </p>
                <p>
                  <span className="label">Nom de la voie :</span>
                  {user.street || "Non renseigné"}
                </p>
                <p>
                  <span className="label">Code postal:</span>
                  {user.zip_code || "Non renseigné"}
                </p>
                <p>
                  <span className="label">Ville :</span>
                  {user.city || "Non renseigné"}
                </p>
              </div>
            </div>
            <div
              className="profil-infos-card"
              style={{ "--i": 5 } as React.CSSProperties}
            >
              <h3>Mes commandes</h3>
              <div className="profil-infos-content">
                {orders.length > 0 ? (
                  <>
                    {orders.slice(0, 3).map((order) => (
                      <button
                        key={order.id}
                        className="order-line"
                        type="button"
                        onClick={() =>
                          navigate("/Collection", {
                            state: {
                              addItem: {
                                brand: order.brand,
                                name: order.name,
                                photo: order.watch_photo,
                                id: order.watch_id,
                              },
                            },
                          })
                        }
                      >
                        <img
                          src={`http://localhost:3310${order.watch_photo}`}
                          alt="Montre"
                          className="orders-watch"
                        />
                        <span className="order-brand">{order.brand}</span>
                        <span className="order-model">{order.name}</span>
                        <span className="order-date">
                          {new Date(order.purchase_date).toLocaleDateString(
                            "fr-FR",
                          )}
                        </span>
                        <span className="order-price">{order.price}€</span>
                      </button>
                    ))}
                    {orders.length > 3 && (
                      <button
                        type="button"
                        onClick={() => setIsUserOrderSummaryOpen(true)}
                        className="view-more"
                      >
                        Voir toute les commandes ({orders.length})
                      </button>
                    )}
                  </>
                ) : (
                  <p>Aucune commande</p>
                )}
              </div>
            </div>
            <UserOrderSummary
              isOpen={isUserOderSummaryOpen}
              onClose={() => setIsUserOrderSummaryOpen(false)}
              orders={orders}
            />
          </>
        )}
      </div>
      <EditProfilPopUp
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        userRole={user.role}
        onSave={handleUpdate}
        initialData={{
          firstname: user.firstname || "",
          lastname: user.lastname || "",
          email: user.email || "",
          birthdate: user.birthdate ? user.birthdate.split("T")[0] : "",
          tel: user.tel || "",
          user_describe: user.user_describe || "",
          street_number: user.street_number?.toString() || "",
          street: user.street || "",
          zip_code: user.zip_code?.toString() || "",
          city: user.city || "",
        }}
        currentPhotoUrl={
          user.user_photo
            ? `http://localhost:3310${user.user_photo}`
            : avatarFallback
        }
        onPhotoUpload={handlePhotoUpload}
        onPhotoDelete={handlePhotoDelete}
      />
    </div>
  );
};

export default UserProfil;
