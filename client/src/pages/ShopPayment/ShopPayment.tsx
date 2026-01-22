import { useState } from "react";
import { useNavigate } from "react-router";
import { useBasket } from "../../contexts/ShopContext";

function ShopPayment() {
  const { basket, clearBasket } = useBasket();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [street, setStreet] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = basket.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !street || !zip || !city) {
      setError("Merci de remplir tous les champs");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await fetch("http://localhost:3310/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          delivery: { name, number, street, zip, city },
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        throw new Error(body || "Erreur lors du paiement");
      }

      // Vider le panier côté front-end
      clearBasket();
      navigate("/thank-you");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  if (basket.length === 0) return <p>Votre panier est vide</p>;

  return (
    <div className="checkout-page">
      <h1>Paiement</h1>

      <ul>
        {basket.map((item) => (
          <li key={item.idwatch}>
            {item.brand} {item.model} x {item.quantity} ={" "}
            {item.price * item.quantity} €
          </li>
        ))}
      </ul>
      <p>Total : {total} €</p>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="N°"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
        <input
          placeholder="Rue"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <input
          placeholder="Code postal"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
        <input
          placeholder="Ville"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Paiement..." : "Valider le paiement"}
        </button>
      </form>
    </div>
  );
}

export default ShopPayment;
