import { useState } from "react";
import "./WatchCardAdd.css";

function WatchCardAdd() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");

  const apiBaseUrl = "http://localhost:3310";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newWatch = {
      brand,
      model,
      watch_price: price ? Number(price) : null,
      watch_condition: condition || null,
    };

    try {
      const response = await fetch(`${apiBaseUrl}/api/watches`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWatch),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création");
      }

      const data = await response.json();
      console.log("Montre créée avec l'id:", data.insertId);

      //form reset
      setBrand("");
      setModel("");
      setPrice("");
      setCondition("");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="watch-card-add__main">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Marque"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Modèle"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Prix d'achat"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="État"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        />

        <button type="submit">Ajouter la montre</button>
      </form>
    </div>
  );
}

export default WatchCardAdd;
