import { useEffect, useState } from "react";

import "./UserReview.css";
import { Link } from "react-router";

interface Article {
  idarticles: number;
  article_title: string;
  photo: string;
  subtitle: string;
  release_date: string;
  content: string;
  reference_source: string;
}

function UserReview() {
  const [news, setNews] = useState<Article[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/articles`)
      .then((res) => res.json())
      .then((data: Article[]) => setNews(data))
      .catch((err) => console.error(err));
  }, []);

  const lastIdNews = 0;
  const lastNews = news[lastIdNews];

  if (!lastNews) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="userreview__main">
      <div>
        <h2>{lastNews.article_title}</h2>
      </div>
      <div className="userreview__datebtn">
        <h3>{lastNews.release_date.split("T")[0]}</h3>
        <Link to="/NewsDetails/6">
          <button type="button">&gt;</button>
        </Link>
      </div>
    </div>
  );
}

export default UserReview;
