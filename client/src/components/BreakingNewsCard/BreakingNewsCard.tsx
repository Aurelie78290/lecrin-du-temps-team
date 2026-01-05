import { Link } from "react-router";

import "./BreakingNewsCard.css";

interface Article {
  idarticles: number;
  article_title: string;
  photo: string;
  subtitle: string;
  release_date: string;
  content: string;
  reference_source: string;
}

interface BreakingNewsCardProps {
  article: Article;
  className?: string;
}

function BreakingNewsCard({ article, className }: BreakingNewsCardProps) {
  const formatDate = (dateString: string) => {
    return dateString.split("T")[0];
  };

  return (
    <article className={`breakingNews-section ${className ?? ""}`}>
      <h2>{article.article_title}</h2>
      <div className="breakingNews-references">
        <p className="breakingNews-references-content">
          {article.reference_source}
        </p>
        <p className="breakingNews-references-content">
          {formatDate(article.release_date)}
        </p>
      </div>
      <div className="breakingNews-container">
        <img
          src={article.photo}
          alt={article.article_title}
          className="breakingNews-photo"
        />
      </div>
      <p className="breakingNews-subtitle">{article.subtitle}</p>
      <Link to={`/NewsDetails/${article.idarticles}`}>Lire l’article</Link>
    </article>
  );
}

export default BreakingNewsCard;
