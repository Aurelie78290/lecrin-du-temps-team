// import { useEffect, useState } from "react";
// import "./UserLastAdd.css";
// import type { Watch } from "../WatchCard/WatchCard";

// function UserLastAdd() {
//   const [watch, setWatch] = useState<Watch[]>();

//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_API_URL}/api/collection/watches`, {
//       credentials: "include",
//     })
//       .then((res) => res.json())
//       .then((data: Watch[]) => setWatch(data))
//       .catch((err) => console.error(err));
//   }, []);

//   const lastWatch = watch[0];

//   return <div></div>;
// }

// export default UserLastAdd;
