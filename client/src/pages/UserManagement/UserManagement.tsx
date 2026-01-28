import { useContext } from "react";
import EditUsersRoles from "../../components/EditUsersRoles/EditUsersRoles";
import { AuthContext } from "../../contexts/AuthContext";
import "./UserMaganement.css";

function UserManagement() {
  const auth = useContext(AuthContext);
  const firstname = auth?.user?.firstname;
  return (
    <div className="user-management">
      <h1>Tableau de Gestion des Utilisateurs</h1>
      <p>Bienvenue, {firstname}!</p>
      <EditUsersRoles />
    </div>
  );
}
export default UserManagement;
