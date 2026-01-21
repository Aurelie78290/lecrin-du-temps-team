import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router";
import { useBasket } from "../../contexts/ShopContext";
import "./BasketIcon.css";

function BasketIcon() {
  const { basket } = useBasket();
  const navigate = useNavigate();

  const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <button
      type="button"
      onClick={() => navigate("/ShopBasket")}
      className="basket-icon-button"
      aria-label="Panier"
    >
      <ShoppingBag className="basket-icon" />
      {totalItems > 0 && <span className="basket-badge">{totalItems}</span>}
    </button>
  );
}

export default BasketIcon;
