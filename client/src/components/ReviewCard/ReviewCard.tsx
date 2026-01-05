import { useEffect, useState } from "react";

import "./ReviewCard.css";
import starDark from "../../assets/images/starReviewDark.svg";
import starLight from "../../assets/images/starReviewLight.svg";

interface ReviewI {
  idreviews: number;
  review_title: string;
  note: number;
  comment: string;
}
interface ReviewCardProps {
  review: ReviewI;
}

// Pour tester l'affichage
// const review = {
//   idreviews: 1,
//   review_title: "un site exceptionnel",
//   note: 5,
//   comment:
//     "L'écrin du temps est LE site parfais pour trouver des montres d'exception tout en ayant sa collection à portée de vue.",
// };

function ReviewCard({ review }: ReviewCardProps) {
  const [isLight, setIsLight] = useState(
    localStorage.getItem("theme") === "light",
  );

  useEffect(() => {
    const checkTheme = () => {
      const currentTheme = localStorage.getItem("theme");
      setIsLight(currentTheme === "light");
    };
    window.addEventListener("storage", checkTheme);
    return () => window.removeEventListener("storage", checkTheme);
  }, []);

  const starIcon = isLight ? starLight : starDark;

  return (
    <div className="ReviewCard">
      <div className="ReviewCard-note">
        {Array.from({ length: review.note }, (_, index) => (
          <img
            key={`${review.idreviews}-${index}`}
            src={starIcon}
            alt={`Étoile ${index + 1} sur 5`}
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
