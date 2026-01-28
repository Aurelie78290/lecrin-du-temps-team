import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useEffect, useState } from "react";

import "./DashboardRecentOrders.css";
import "@splidejs/react-splide/css";

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

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/AdminRecentOrders`)
      .then((response) => response.json())
      .then((data: RecentOrdersI[]) => {
        setRecentOrders(data);
      });
  }, []);
  console.log(recentOrders);
  return (
    <article>
      {/* https://splidejs.com/ */}
      <p>Activité récente</p>
      {recentOrders.length === 0 ? (
        <p>Pas d'activité récentes</p>
      ) : (
        <Splide
          options={{
            rewind: true,
            perPage: 4,
            perMove: 1,
            gap: "1rem",

            breakpoints: {
              1600: {
                perPage: 3, // Tablettes
              },
              992: {
                perPage: 2, // Petites tablettes / Grands smartphones
              },
              768: {
                perPage: 1, // Smartphones (1 seul élément pour une lecture claire)
                gap: "0.5rem",
              },
            },
          }}
          aria-label="transactions récentes"
        >
          {recentOrders.map((e) => (
            <SplideSlide className="dashboardRecentOrdersCard" key={e.idorder}>
              <p>
                {new Date(e.purchase_date).toLocaleDateString("fr-FR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
              <p>Prix: {e.price} €</p>
              <p>Marque: {e.brand}</p>
              <p>Model: {e.model}</p>
            </SplideSlide>
          ))}
        </Splide>
      )}
    </article>
  );
}

export default DashboardRecentOrders;
