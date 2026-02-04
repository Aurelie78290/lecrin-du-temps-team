import { useEffect, useState } from "react";
import { Link } from "react-router";
import "./UserReview.css";

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

  const lastNews = news[0];

  if (!lastNews) return <p>Chargement...</p>;

  return (
    <Link
      to={`/NewsDetails/${lastNews.idarticles}`}
      className="userreview__main userreview__link"
    >
      <div>
        <h2 className="userreview-h2">{lastNews.article_title}</h2>
      </div>

      <div className="userreview__datebtn">
        <h3>{lastNews.release_date.split("T")[0]}</h3>
        <span className="userreview__chevron" aria-hidden="true">
          &gt;
        </span>
      </div>
    </Link>
  );
}

export default UserReview;
