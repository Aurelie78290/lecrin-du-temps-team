import { useState } from "react";
import "./WatchCardAdd.css";

function WatchCardAdd() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [openPopup, setOpenPopup] = useState(false);

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
    <div>
      <div className="watch-card-add__button">
        <button type="button" onClick={() => setOpenPopup(!openPopup)}>
          Ajouter une montre
        </button>
      </div>
      {openPopup && (
        <div className="watch-card-add__main">
          <div className="watch-card-add__content">
            <h2>Ajouter votre montre</h2>
            <form onSubmit={handleSubmit} id="watch-adder">
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
            </form>{" "}
            <button
              type="submit"
              form="watch-adder"
              // onClick={() => {
              //   setOpenPopup(!openPopup);
              // }}
            >
              Ajouter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default WatchCardAdd;
