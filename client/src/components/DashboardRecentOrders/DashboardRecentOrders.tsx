import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";

import "./DashboardRecentOrders.css";

type RecentOrdersI = {
  idorder: number;
  purchase_date: string;
  price: number;
  user_role: string;
  brand: string;
  model: string;
};

function DashboardRecentOrders() {
  const [recentOrders, setRecentOrders] = useState<RecentOrdersI[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  // Pour naviguer sur le carousel via des boutons

  // 2. Fonctions de navigation avec "useCallback" pour la performance (optionnel mais propre)
  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/AdminRecentOrders`)
      .then((response) => response.json())
      .then((data: RecentOrdersI[]) => {
        setRecentOrders(data);
      });
  }, []);

  return (
    <article className="DashboardRecentOrders-article">
      <h2>Activité récente</h2>
      {/* https://www.embla-carousel.com/get-started/react/ */}
      {recentOrders.length === 0 ? (
        <p>Pas d'activité récentes</p>
      ) : (
        <div className="embla">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container">
              {recentOrders.map((e) => (
                <article
                  className="embla__slide dashboardRecentOrdersCard"
                  key={e.idorder}
                >
                  <p>
                    {new Date(e.purchase_date).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                  {e.user_role === "admin" ? (
                    <p> Vendu par l'écrin du temps</p>
                  ) : (
                    <p>Vendu par un particulier</p>
                  )}
                  <p>Prix: {e.price} €</p>
                  <p>Marque: {e.brand}</p>
                  <p>Model: {e.model}</p>
                </article>
              ))}
            </div>
          </div>
          <button className="embla__prev" onClick={scrollPrev} type="button">
            Précédent
          </button>
          <button className="embla__next" onClick={scrollNext} type="button">
            Suivant
          </button>
        </div>
      )}
    </article>
  );
}

export default DashboardRecentOrders;
