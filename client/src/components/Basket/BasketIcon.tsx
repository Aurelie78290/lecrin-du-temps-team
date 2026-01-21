import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useBasket } from "../../contexts/ShopContext";

import ShopBasket from "../ShopBasket/ShopBasket";

import "./BasketIcon.css";

function BasketIcon() {
  const { basket } = useBasket();
  const [basketOpen, setBasketOpen] = useState(false);

  const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <button
        type="button"
        onClick={() => setBasketOpen(true)}
        className="basket-icon-button"
        aria-label="Panier"
      >
        <ShoppingBag className="basket-icon" />
        {totalItems > 0 && <span className="basket-badge">{totalItems}</span>}
      </button>
      <ShopBasket isOpen={basketOpen} onClose={() => setBasketOpen(false)} />
    </>
  );
}

export default BasketIcon;
