import { useContext } from "react";
import DashboardNewMembers from "../../components/DashboardNewMembers/DashboardNewMembers";
import DashboardPendingAdd from "../../components/DashboardPendingAdd/DashboardPendingAdd";
import DashboardRecentOrders from "../../components/DashboardRecentOrders/DashboardRecentOrders";
import DashboardVolTran from "../../components/DashboardVolTran/DashboardVolTran";

import MonthlySales from "../../components/MonthlySales/MonthlySales";
import PendingTransactions from "../../components/PendingTransactions/PendingTransactions";
import { AuthContext } from "../../contexts/AuthContext";

import "./Dashboard.css";

function Dashboard() {
  //Afficher le nom de l'utilisateur authentifié via le contexte
  const auth = useContext(AuthContext);
  const firstname = auth?.user?.firstname;

  return (
    <main className="Dashboard-main">
      <h1> Bienvenue {firstname || "Admin"}</h1>
      <section className="Dashboard_section_high">
        <MonthlySales />
        <PendingTransactions />
        <DashboardNewMembers />
        <DashboardVolTran />
        <DashboardPendingAdd />
      </section>
      <article className="Dashboard_section_low">
        <DashboardRecentOrders />
      </article>
    </main>
  );
}

export default Dashboard;
