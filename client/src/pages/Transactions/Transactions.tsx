import { useEffect, useState } from "react";
import DashboardRecentOrders from "../../components/DashboardRecentOrders/DashboardRecentOrders";
import SearchRecentOrders from "../../components/SearchRecentOrders/SearchRecentOrders";
import "./Transaction.css";

import type { RecentOrdersI } from "../../components/DashboardRecentOrders/DashboardRecentOrders";

function Transactions() {
  const [allOrders, setAllOrders] = useState<RecentOrdersI[]>([]); // Données brutes
  const [filteredOrders, setFilteredOrders] = useState<RecentOrdersI[]>([]); // Données filtrées
  const [filters, setFilters] = useState({
    sellerType: "all",
    startDate: "",
    endDate: "",
  });

  // Chargement initial des données
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/AdminRecentOrders`)
      .then((res) => res.json())
      .then((data) => {
        setAllOrders(data);
        setFilteredOrders(data);
      });
  }, []);

  // Logique de filtrage déclenchée à chaque changement de filtres ou de données
  useEffect(() => {
    let result = [...allOrders];

    // Filtre par type de vendeur
    if (filters.sellerType !== "all") {
      result = result.filter((order) => order.user_role === filters.sellerType);
    }

    // Filtre par période
    if (filters.startDate) {
      result = result.filter(
        (order) => new Date(order.purchase_date) >= new Date(filters.startDate),
      );
    }
    if (filters.endDate) {
      const end = new Date(filters.endDate);
      end.setHours(23, 59, 59); // Pour inclure toute la journée de fin
      result = result.filter((order) => new Date(order.purchase_date) <= end);
    }

    setFilteredOrders(result);
  }, [filters, allOrders]);
  return (
    <main>
      <h1 className="Transactions-h1">Transactions réalisées</h1>
      <SearchRecentOrders filters={filters} onSearchChange={setFilters} />
      <DashboardRecentOrders orders={filteredOrders} />
    </main>
  );
}

export default Transactions;
