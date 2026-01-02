import { useEffect, useState } from "react";
import ReviewCard from "../ReviewCard/ReviewCard";

type ReviewI = {
  idreviews: number;
  review_title: string;
  note: number;
  comment: string;
};

function DisplayAllReviews() {
  const [reviews, setReviews] = useState<ReviewI[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/reviews`)
      .then((response) => response.json())
      .then((data: ReviewI[]) => {
        setReviews(data);
      });
  }, []);

  return (
    <>
      <ul>
        {reviews.map((review) => (
          <li key={review.idreviews}>
            <ReviewCard review={review} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default DisplayAllReviews;
