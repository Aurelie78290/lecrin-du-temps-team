import { useContext } from "react";
import DashboardNewMembers from "../../components/DashboardNewMembers/DashboardNewMembers";
import DashboardPendingAdd from "../../components/DashboardPendingAdd/DashboardPendingAdd";
import DashboardRecentOrders from "../../components/DashboardRecentOrders/DashboardRecentOrders";
import DashboardVolTran from "../../components/DashboardVolTran/DashboardVolTran";
import EditUsersRoles from "../../components/EditUsersRoles/EditUsersRoles";
import MonthlySales from "../../components/MonthlySales/MonthlySales";
import PendingTransactions from "../../components/PendingTransactions/PendingTransactions";
import { AuthContext } from "../../contexts/AuthContext";

import "./Dashboard.css";

function Dashboard() {
  //Afficher le nom de l'utilisateur authentifié via le contexte
  const auth = useContext(AuthContext);
  const firstname = auth?.user?.firstname;

  return (
    <>
      <h1> Bienvenue {firstname || "Admin"}</h1>
      <section className="Dashboard_section_high">
        <MonthlySales />
        <PendingTransactions />
        <DashboardNewMembers />
        <DashboardVolTran />
        <DashboardPendingAdd />
        <DashboardRecentOrders />
        <EditUsersRoles />
      </section>
    </>
  );
}

export default Dashboard;
