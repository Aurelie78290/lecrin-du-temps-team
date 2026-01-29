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
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" });

  // Pour naviguer sur le carousel via des boutons

  // const [emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  // const goToPrev = () => emblaApi?.goToPrev(true);
  // const goToNext = () => emblaApi?.goToNext(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/AdminRecentOrders`)
      .then((response) => response.json())
      .then((data: RecentOrdersI[]) => {
        setRecentOrders(data);
      });
  }, []);
  console.log(recentOrders);
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
          <button className="embla__prev" type="button">
            Scroll to prev
          </button>
          <button className="embla__next" type="button">
            Scroll to next
          </button>
        </div>
      )}
    </article>
  );
}

export default DashboardRecentOrders;
