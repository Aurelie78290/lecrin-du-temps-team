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

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/AdminRecentOrders`)
      .then((response) => response.json())
      .then((data: RecentOrdersI[]) => {
        setRecentOrders(data);
      });
  }, []);

  return (
    <section className="DashboardRecentOrders-section">
      <h2>Activité récente</h2>
      {recentOrders.length === 0 ? (
        <p>Pas d'activité récentes</p>
      ) : (
        <article className="DashboardRecentOrders-article">
          {recentOrders.map((e) => (
            <article className="DashboardRecentOrdersCard" key={e.idorder}>
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
        </article>
      )}
    </section>
  );
}

export default DashboardRecentOrders;
