import UserGraph from "../../components/UserGraph/UserGraph";
import UserLastAdd from "../../components/UserLastAdd/UserLastAdd";
import UserReview from "../../components/UserReview/UserReview";
import "./UserDashboard.css";

function UserDashboard() {
  return (
    <>
      <UserLastAdd />
      <UserGraph />
      <UserReview />
    </>
  );
}

export default UserDashboard;
