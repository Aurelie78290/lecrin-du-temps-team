import { useEffect, useState } from "react";
import { useParams } from "react-router";

import "./NewsDetails.css";

interface Article {
  idarticles: number;
  article_title: string;
  photo: string;
  subtitle: string;
  release_date: string;
  content: string;
  reference_source: string;
}

function NewsDetails() {
  const [article, setArticle] = useState<Article | null>(null);
  const { id } = useParams<{ id: string }>();
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("fr-FR");

  useEffect(() => {
    if (!id) return;
    const fetchArticle = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/articles/${id}`,
        );
        if (!res.ok) throw new Error("Article non trouvé");
        const data: Article = await res.json();
        setArticle(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) return <p>Chargement...</p>;

  return (
    <section className="NewsDetails-section">
      <h1 className="NewsDetails-title">{article.article_title}</h1>
      <div className="NewsDetails-references">
        <p className="NewsDetails-references-content">
          <strong>Source : </strong>
          {article.reference_source}
        </p>
        <p className="NewsDetail-references-content">
          <strong>Date : </strong>
          {formatDate(article.release_date)}
        </p>
      </div>
      <p className="NewsDetails-subtitle">{article.subtitle}</p>
      <div className="NewsDetails-container">
        <img
          src={article.photo}
          alt={article.article_title}
          className="NewsDetails-photo"
        />
        <p className="NewsDetails-content">{article.content}</p>
      </div>
    </section>
  );
}

export default NewsDetails;
