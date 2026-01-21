import { ShoppingBag, Trash2, X } from "lucide-react";
import { useBasket } from "../../contexts/ShopContext";
import "./ShopBasket.css";

interface ShopBasketProps {
  isOpen: boolean;
  onClose: () => void;
}

function ShopBasket({ isOpen, onClose }: ShopBasketProps) {
  const { basket, removeFromBasket, clearBasket } = useBasket();

  const total = basket.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="basket-overlay"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onClose();
          }
        }}
        tabIndex={0}
        role="button"
      />

      {/* Sidebar du panier */}
      <div className="basket-sidebar">
        {/* Header */}
        <div className="basket-header">
          <h2 className="basket-title">Votre Panier</h2>
          <button
            type="button"
            onClick={onClose}
            className="basket-close-button"
            aria-label="Fermer"
          >
            <X className="basket-close-icon" />
          </button>
        </div>

        {/* Contenu */}
        <div className="basket-content">
          {basket.length === 0 ? (
            <div className="basket-empty">
              <ShoppingBag className="basket-empty-icon" />
              <p className="basket-empty-text">Votre panier est vide</p>
            </div>
          ) : (
            <div className="basket-items">
              {basket.map((item) => (
                <div key={item.idwatch} className="basket-item">
                  <div className="basket-item-details">
                    <h3 className="basket-item-name">
                      <strong>
                        {item.brand} {item.model}
                      </strong>
                    </h3>
                    <p className="basket-item-price">
                      {item.price.toLocaleString("fr-FR")} €
                    </p>
                    <p className="basket-item-quantity">
                      Quantité : {item.quantity}
                    </p>

                    <button
                      type="button"
                      onClick={() => removeFromBasket(item.idwatch)}
                      className="basket-remove-button"
                    >
                      <Trash2 className="basket-remove-icon" />
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {basket.length > 0 && (
          <div className="basket-footer">
            <div className="basket-total">
              <span className="basket-total-label">Total</span>
              <span className="basket-total-amount">
                {total.toLocaleString("fr-FR")} €
              </span>
            </div>

            <button type="button" className="basket-checkout-button">
              Procéder au paiement
            </button>

            <button
              type="button"
              onClick={clearBasket}
              className="basket-clear-button"
            >
              Vider le panier
            </button>

            <button
              type="button"
              onClick={onClose}
              className="basket-continue-button"
            >
              Continuer mes achats
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default ShopBasket;
