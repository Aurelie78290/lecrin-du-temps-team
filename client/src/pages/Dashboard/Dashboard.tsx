import MonthlySales from "../../components/MonthlySales/MonthlySales";
import PendingTransactions from "../../components/PendingTransactions/PendingTransactions";

import "./Dashboard.css";

function Dashboard() {
  return (
    <>
      <h1> Bienvenue Admin, dans la page dashboard</h1>
      <MonthlySales />
      <PendingTransactions />
    </>
  );
}

export default Dashboard;
