import { useCallback, useState } from "react";
import ClassifiedAdDetails from "../../components/ClassifiedAdDetails/ClassifiedAdDetails";
import ClassifiedAdStatus from "../../components/ClassifiedAdStatus/ClassifiedAdStatus";
import "./ClassifiedAd.css";

function ClassifiedAd() {
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const triggerRefresh = useCallback(() => {
    setUpdateTrigger((prev) => prev + 1);
  }, []); // [] garantit que la fonction ne change jamais de référence

  return (
    <section>
      <h1 className="ClassifiedAd-h1"> Validation des annonces</h1>
      <ClassifiedAdStatus updateTrigger={updateTrigger} />
      <ClassifiedAdDetails onActionSuccess={triggerRefresh} />
    </section>
  );
}

export default ClassifiedAd;
