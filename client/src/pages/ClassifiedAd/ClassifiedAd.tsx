import ClassifiedAdDetails from "../../components/ClassifiedAdDetails/ClassifiedAdDetails";
import ClassifiedAdStatus from "../../components/ClassifiedAdStatus/ClassifiedAdStatus";

function ClassifiedAd() {
  return (
    <section>
      <h1> Validation des annonces</h1>
      <ClassifiedAdStatus />
      <ClassifiedAdDetails />
    </section>
  );
}

export default ClassifiedAd;
