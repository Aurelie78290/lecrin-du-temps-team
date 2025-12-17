import "./ReviewCard.css";
import star from "../../assets/images/starReview.svg";

interface ReviewI {
  review: {
    idreviews: number;
    review_title: string;
    note: number;
    comment: string;
  };
}

// Pour tester l'affichage
// const review = {
//   idreviews: 1,
//   review_title: "un site exceptionnel",
//   note: 5,
//   comment:
//     "L'écrin du temps est LE site parfais pour trouver des montres d'exception tout en ayant sa collection à portée de vue.",
// };

function ReviewCard({ review }: ReviewI) {
  return (
    <div className="ReviewCard">
      <div className="ReviewCard-note">
        {Array.from({ length: review.note }, () => (
          <img
            key={review.idreviews}
            src={star}
            alt={`Note de ${review.note} sur 5`}
            className="ReviewCard-star"
          />
        ))}
      </div>
      <h2>{review.review_title}</h2>
      <p>{review.comment}</p>
    </div>
  );
}

export default ReviewCard;
