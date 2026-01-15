import { useEffect, useState } from "react";
import WatchCard, { type Watch } from "../WatchCard/WatchCard";
import "./WatchCardCollection.css";
import WatchCardAdd from "../WatchCardAdd/WatchCardAdd";

function WatchCardCollection() {
  const [watches, setWatches] = useState<Watch[]>([]);
  const [trigger, setTrigger] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const apiBaseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3310";
  const userId = 1; // TODO: remplacer par ton user connecté plus tard

  // biome-ignore lint/correctness/useExhaustiveDependencies: uses a trigger outside the useeffect, false error.
  useEffect(() => {
    fetch(`${apiBaseUrl}/api/collection/watches`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setWatches(data));
  }, [trigger, apiBaseUrl, userId]);

  const handleWatchAdded = () => {
    setTrigger((prev) => prev + 1);
  };

  return (
    <div className="watch-card-collection__main">
      {isPopupOpen && <div className="overlay" />}

      <div className={isPopupOpen ? "content content--dimmed" : "content"}>
        <h1>BIENVENUE DANS VOTRE COLLECTION, ROMAIN</h1>

        <div className="watches-grid">
          {watches.map((watch) => (
            <WatchCard
              key={watch.idwatch}
              watch={watch}
              apiBaseUrl={apiBaseUrl}
              context="collection"
              userId={userId} // ✅ IMPORTANT pour retirer de la collection
              onChange={() => setTrigger((prev) => prev + 1)} // ✅ refresh après delete
            />
          ))}
        </div>
      </div>

      <WatchCardAdd
        onWatchAdded={handleWatchAdded}
        onPopupToggle={setIsPopupOpen}
      />
    </div>
  );
}

export default WatchCardCollection;
