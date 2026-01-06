import { useTheme } from "../../contexts/ThemeContext";

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

function ReviewCard({ review }: ReviewCardProps) {
  const { theme } = useTheme();
  const starIcon = theme === "light" ? starLight : starDark;

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
