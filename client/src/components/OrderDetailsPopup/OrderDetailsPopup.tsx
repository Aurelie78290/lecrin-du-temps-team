import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import "./OrderDetailsPopup.css";

interface Order {
  id: number;
  price: number;
  watch_id: number;
  watch_photo: string;
  brand: string;
  name: string;
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
      formData.append("brand_id", order.watch_id.toString());
      formData.append("watch_price", order.price.toString());
      formData.append("watch_condition", "Neuf");
      await api.post("/api/watches", FormData);
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
        />
        <h2>{order.brand}</h2>
        <h3>{order.name}</h3>
        <p className="order-price"> Valeur d'acquisition : {order.price}€</p>
        <button
          type="button"
          className="add-to-collection-btn"
          onClick={handleAddToCollection}
        >
          Ajouter à ma collection
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsPopup;
