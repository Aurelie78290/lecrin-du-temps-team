import DashboardNewMembers from "../../components/DashboardNewMembers/DashboardNewMembers";
import DashboardPendingAdd from "../../components/DashboardPendingAdd/DashboardPendingAdd";
import DashboardVolTran from "../../components/DashboardVolTran/DashboardVolTran";
import MonthlySales from "../../components/MonthlySales/MonthlySales";
import PendingTransactions from "../../components/PendingTransactions/PendingTransactions";

import "./Dashboard.css";

function Dashboard() {
  return (
    <>
      <h1> Bienvenue Admin, dans la page dashboard</h1>
      <section className="Dashboard_section_high">
        <MonthlySales />
        <PendingTransactions />
        <DashboardNewMembers />
        <DashboardVolTran />
        <DashboardPendingAdd />
      </section>
    </>
  );
}

export default Dashboard;
