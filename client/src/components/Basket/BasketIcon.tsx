import { ShoppingBag } from "lucide-react";

import { useBasket } from "../../contexts/ShopContext";

import ShopBasket from "../ShopBasket/ShopBasket";

import "./BasketIcon.css";

interface BasketIconProps {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

function BasketIcon({ isOpen, setIsOpen }: BasketIconProps) {
  const { basket } = useBasket();
  // const [basketOpen, setBasketOpen] = useState(false);

  const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="basket-icon-button"
        aria-label="Panier"
      >
        <ShoppingBag className="basket-icon" />
        {totalItems > 0 && <span className="basket-badge">{totalItems}</span>}
      </button>
      <ShopBasket isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export default BasketIcon;
