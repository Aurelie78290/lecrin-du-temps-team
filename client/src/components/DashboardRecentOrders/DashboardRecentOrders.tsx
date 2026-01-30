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
        <table className="DashboardRecentOrders-table">
          <thead className="DashboardRecentOrders-tableEntete">
            <tr>
              <th>Date</th>
              <th>Vendeur</th>
              <th>Prix (€)</th>
              <th>Marque</th>
              <th>Model</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((e) => (
              <tr className="DashboardRecentOrders-row" key={e.idorder}>
                <td>
                  {new Date(e.purchase_date).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                {e.user_role === "admin" ? (
                  <td> L'écrin du temps</td>
                ) : (
                  <td>Client</td>
                )}
                <td>{e.price}</td>
                <td>{e.brand}</td>
                <td>{e.model}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default DashboardRecentOrders;
