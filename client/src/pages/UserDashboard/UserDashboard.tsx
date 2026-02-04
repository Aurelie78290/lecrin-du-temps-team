import { useContext } from "react";
import UserFavoritePick from "../../components/UserFavoritePick/UserFavoritePick";
import UserGraph from "../../components/UserGraph/UserGraph";
import UserLastAdd from "../../components/UserLastAdd/UserLastAdd";
import UserReview from "../../components/UserReview/UserReview";
import { AuthContext } from "../../contexts/AuthContext";
import "./UserDashboard.css";

function UserDashboard() {
  //Afficher le nom de l'utilisateur authentifié via le contexte
  const auth = useContext(AuthContext);
  const firstname = auth?.user?.firstname;
  return (
    <>
      <h1> Bienvenue {firstname || "Admin"}</h1>
      <UserLastAdd />
      <div className="dashboard__position">
        <UserFavoritePick />
        <UserGraph />
      </div>
      <UserReview />
    </>
  );
}

export default UserDashboard;
