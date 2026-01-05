import { useEffect, useState } from "react";
import WatchCard, { type Watch } from "../WatchCard/WatchCard";
import "./WatchCardCollection.css";
import WatchCardAdd from "../WatchCardAdd/WatchCardAdd";

function WatchCardCollection() {
  const [watches, setWatches] = useState<Watch[]>([]);
  const apiBaseUrl = "http://localhost:3310";

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/watches`)
      .then((res) => res.json())
      .then((data) => setWatches(data));
  }, []);

  return (
    <div className="watch-card-collection__main">
      <h1>BIENVENUE DANS VOTRE COLLECTION, ROMAIN</h1>
      <div className="watches-grid">
        {" "}
        {watches.map((watch) => (
          <WatchCard
            key={watch.idwatch}
            watch={watch}
            apiBaseUrl={apiBaseUrl}
          />
        ))}
      </div>
      <WatchCardAdd />
    </div>
  );
}

export default WatchCardCollection;
