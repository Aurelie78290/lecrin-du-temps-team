import { Link } from "react-router";
import { useBasket } from "../../contexts/ShopContext";

function ShopBasket() {
  const { basket, removeFromBasket, clearBasket } = useBasket();

  const total = basket.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (basket.length === 0)
    return (
      <div>
        <h1>🛒 Panier</h1>
        <p>Votre panier est vide</p>
        <Link to="/Shop">← Retour boutique</Link>
      </div>
    );

  return (
    <div>
      <h1>🛒 Panier</h1>
      {basket.map((item) => (
        <div key={item.idwatch}>
          <strong>
            {item.brand} {item.model}
          </strong>
          <br />
          Prix : {item.price.toLocaleString("fr-FR")} €<br />
          Quantité : {item.quantity}
          <br />
          <button type="button" onClick={() => removeFromBasket(item.idwatch)}>
            Supprimer
          </button>
        </div>
      ))}

      <h2>Total : {total.toLocaleString("fr-FR")} €</h2>
      <button type="button" onClick={clearBasket}>
        Vider le panier
      </button>
      <Link to="/Shop">
        <button type="button">Continuer vos achats</button>
      </Link>
    </div>
  );
}

export default ShopBasket;
