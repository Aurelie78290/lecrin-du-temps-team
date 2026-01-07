import { useEffect, useState } from "react";
import BreakingNewsCard from "../../components/BreakingNewsCard/BreakingNewsCard";

import "./News.css";

interface Article {
  idarticles: number;
  article_title: string;
  photo: string;
  subtitle: string;
  release_date: string;
  content: string;
  reference_source: string;
}

function News() {
  const [news, setNews] = useState<Article[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/articles`)
      .then((res) => res.json())
      .then((data: Article[]) => setNews(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <section className="News-section">
        <h1 className="news-title">Chroniques horlogères</h1>
        <div className="news-grid">
          {news.map((article, index) => (
            <BreakingNewsCard
              key={article.idarticles}
              article={article}
              className={index % 2 !== 0 ? "card--tall" : "card--short"}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default News;
