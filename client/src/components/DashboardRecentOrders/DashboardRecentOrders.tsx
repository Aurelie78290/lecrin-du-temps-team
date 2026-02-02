import "./DashboardRecentOrders.css";

export type RecentOrdersI = {
  idorder: number;
  purchase_date: string;
  price: number;
  user_role: string;
  brand: string;
  model: string;
};

function DashboardRecentOrders({ orders }: { orders: RecentOrdersI[] }) {
  return (
    <section className="DashboardRecentOrders-section">
      {orders.length === 0 ? (
        <p>Aucun résultat pour ces critères</p>
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
            {orders.map((e) => (
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
