import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./OrderDetailsPopup.css";

interface Order {
  id: number;
  price: number;
  watch_id: number;
  brand_id: number;
  model_id: number;
  watch_photo: string;
  brand: string;
  name: string;
  is_already_added?: number;
}

interface Props {
  order: Order | null;
  onClose: () => void;
}

const OrderDetailsPopup = ({ order, onClose }: Props) => {
  const navigate = useNavigate();

  if (!order) return null;

  const handleAddToCollection = async () => {
    try {
      const formData = new FormData();
      const brandId = order.brand_id || order.watch_id;
      const modelId = order.model_id;
      if (!brandId || !modelId) {
        console.error("Données manquantes :", { brandId, modelId });
        alert("Erreur : les infos de marque ou de model sont manquantes");
        return;
      }
      formData.append("brand_id", brandId.toString());
      formData.append("model_id", modelId.toString());
      formData.append("watch_price", order.price.toString());
      formData.append("watch_condition", "Neuf");
      formData.append("watch_photo", order.watch_photo);
      await api.post("/api/watches", formData);
      onClose();
      navigate("/Collection");
    } catch (err) {
      console.error("Erreur lors de l'ajout :", err);
      alert("Erreur lors de l'ajout à votre collection");
    }
  };

  return (
    <div
      className="order-details-overlay"
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose}
    >
      <div
        className="order-details-content"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <button type="button" className="close-btn" onClick={onClose}>
          X
        </button>
        <img
          src={`http://localhost:3310${order.watch_photo}`}
          alt={order.name}
          className="order-details-img"
        />
        <h2>{order.brand}</h2>
        <h3>{order.name}</h3>
        <p className="order-price"> Valeur d'acquisition : {order.price}€</p>
        <button
          type="button"
          className={`add-to-collection-btn ${order.is_already_added ? "disabled" : ""}`}
          onClick={handleAddToCollection}
          disabled={!!order.is_already_added}
        >
          {" "}
          {order.is_already_added
            ? "Déjà dans ma collection"
            : "Ajouter à ma collection"}
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsPopup;
