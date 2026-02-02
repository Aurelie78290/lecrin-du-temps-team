import "./UserOderSummary.css";

interface Order {
  id: number;
  price: number;
  purchase_date: string;
  watch_id: number;
  watch_photo: string;
  brand: string;
  name: string;
}

interface OrderSummaryProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

const UserOrderSummary = ({ isOpen, onClose, orders }: OrderSummaryProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="orders-overlay"
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose}
    >
      <div
        className="orders-content"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <div className="orders-header">
          <h2> Historique de vos commandes</h2>
          <button type="button" className="close-btn" onClick={onClose}>
            Retour
          </button>
        </div>
        <div className="orders-scroll">
          {orders.map((order) => (
            <div key={order.id} className="order-row">
              <img
                src={`http://localhost:3310${order.watch_photo}`}
                alt="Montre"
                className="order-img"
              />
              <div className="order-info">
                <span className="order-brand">{order.brand}</span>
                <span className="order-name">{order.name}</span>
                <span className="order-date">
                  {" "}
                  Acquise le:
                  {new Date(order.purchase_date).toLocaleDateString("fr-FR")}
                </span>
              </div>
              <div className="order-price">{order.price.toLocaleString()}€</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserOrderSummary;
