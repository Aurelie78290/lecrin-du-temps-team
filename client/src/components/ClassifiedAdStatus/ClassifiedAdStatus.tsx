import { useEffect, useState } from "react";

import "./ClassifiedAdStatus.css";

type adStatusI = {
  total: number;
  watch_sell_status: string;
};

function ClassifiedAdStatus() {
  const [adStatus, setAdStatus] = useState<adStatusI[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/nbpendingAdd`)
      .then((response) => response.json())
      .then((data: adStatusI[]) => {
        setAdStatus(data);
      });
  }, []);

  return (
    <article className="ClassifiedAdStatus-article">
      {adStatus.map((e) => (
        <div key={e.watch_sell_status} className="ClassifiedAdStatus-card">
          <p>{e.watch_sell_status}</p>
          <p>{e.total}</p>
        </div>
      ))}
    </article>
  );
}

export default ClassifiedAdStatus;
