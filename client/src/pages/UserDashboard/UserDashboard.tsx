import UserFavoritePick from "../../components/UserFavoritePick/UserFavoritePick";
import UserGraph from "../../components/UserGraph/UserGraph";
import UserLastAdd from "../../components/UserLastAdd/UserLastAdd";
import UserReview from "../../components/UserReview/UserReview";
import "./UserDashboard.css";

function UserDashboard() {
  return (
    <>
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
