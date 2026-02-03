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
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("fr-FR");

  return (
    <article className={`breakingNews-section ${className ?? ""}`}>
      <div className="breakingNews-container">
        <img
          src={article.photo}
          alt={article.article_title}
          className="breakingNews-photo"
        />
        <Link to={`/NewsDetails/${article.idarticles}`}>Lire l’article</Link>
      </div>
      <div className="breakingNews-content">
        <h2>{article.article_title}</h2>
        <p className="breakingNews-subtitle">{article.subtitle}</p>
        <div className="breakingNews-references">
          <p className="breakingNews-references-content">
            <strong>Source :</strong> {article.reference_source}
          </p>
          <p className="breakingNews-references-content">
            {formatDate(article.release_date)}
          </p>
        </div>
      </div>
    </article>
  );
}

export default BreakingNewsCard;
